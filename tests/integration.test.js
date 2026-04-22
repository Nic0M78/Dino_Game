const http = require('http');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

const root = path.resolve(__dirname, '..');

function createStaticServer(rootDir, port = 8000) {
  const server = http.createServer((req, res) => {
    // map URL to filesystem
    let reqPath = decodeURIComponent(req.url.split('?')[0]);
    if (reqPath === '/') reqPath = '/tests/fixture/index.html';
    const fsPath = path.join(rootDir, reqPath);
    fs.readFile(fsPath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('Not found');
        return;
      }
      // simple content types
      if (fsPath.endsWith('.html')) res.setHeader('Content-Type', 'text/html');
      else if (fsPath.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript');
      else if (fsPath.endsWith('.png')) res.setHeader('Content-Type', 'image/png');
      else if (fsPath.endsWith('.jpg') || fsPath.endsWith('.jpeg')) res.setHeader('Content-Type', 'image/jpeg');
      res.end(data);
    });
  });
  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

jest.setTimeout(30000);

describe('Browser integration tests (Puppeteer)', () => {
  let server;
  let browser;
  let page;

  beforeAll(async () => {
    server = await createStaticServer(root, 8000);
    browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    page = await browser.newPage();
    await page.goto('http://localhost:8000/tests/fixture/index.html', { waitUntil: 'networkidle2' });
    // wait for p5 sketch to initialize
    await page.waitForFunction(() => typeof window.score !== 'undefined');
  });

  afterAll(async () => {
    if (browser) await browser.close();
    if (server) server.close();
  });

  test('initial game state loads and speed is 3', async () => {
    const speed = await page.evaluate(() => window.speed);
    expect(speed).toBe(3);
  });

  test('keyboard controls: jump (W/Up) sets isJumping', async () => {
    // ensure not jumping
    await page.evaluate(() => { window.player.reset(); window.player.isJumping = false; });
    await page.keyboard.press('ArrowUp');
    // small delay for key handling
    await page.waitForTimeout(100);
    const isJumping = await page.evaluate(() => !!window.player.isJumping);
    expect(isJumping).toBe(true);
  });

  test('keyboard controls: duck (S/Down) sets isDucking', async () => {
    await page.evaluate(() => { window.player.stand(); });
    await page.keyboard.down('s');
    await page.waitForTimeout(50);
    const isDucking = await page.evaluate(() => !!window.player.isDucking);
    expect(isDucking).toBe(true);
    await page.keyboard.up('s');
  });

  test('speed up/down via keys (D/A) adjust speed respecting cap', async () => {
    // set speed to baseline
    await page.evaluate(() => { window.speed = 3; });
    await page.keyboard.press('d');
    await page.waitForTimeout(50);
    let speed = await page.evaluate(() => window.speed);
    expect(speed).toBeGreaterThanOrEqual(3.5);
    // attempt to exceed cap
    await page.evaluate(() => { window.speed = window.maxSpeed; });
    await page.keyboard.press('d');
    await page.waitForTimeout(50);
    speed = await page.evaluate(() => window.speed);
    expect(speed).toBeLessThanOrEqual(window.maxSpeed);
    // slow down
    await page.keyboard.press('a');
    await page.waitForTimeout(50);
    speed = await page.evaluate(() => window.speed);
    expect(speed).toBeLessThanOrEqual(window.maxSpeed);
  });

  test('startPlatformEvent works and duration is within 180-300 frames', async () => {
    await page.evaluate(() => { window.platformEventActive = false; });
    await page.evaluate(() => window.startPlatformEvent());
    await page.waitForTimeout(50);
    const active = await page.evaluate(() => window.platformEventActive);
    const dur = await page.evaluate(() => window.platformEventDuration);
    expect(active).toBe(true);
    expect(dur).toBeGreaterThanOrEqual(180);
    expect(dur).toBeLessThanOrEqual(300);
  });

  test('restart (R) resets score and speed', async () => {
    await page.evaluate(() => { window.gameState = 'gameOver'; window.score = 42; window.speed = 5.5; });
    await page.keyboard.press('r');
    await page.waitForTimeout(100);
    const gs = await page.evaluate(() => window.gameState);
    const score = await page.evaluate(() => window.score);
    const speed = await page.evaluate(() => window.speed);
    expect(gs).toBe('playing');
    expect(score).toBe(0);
    expect(speed).toBe(3);
  });
});
