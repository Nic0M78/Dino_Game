const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

jest.setTimeout(30000);

describe('Dino Run integration', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    page = await browser.newPage();
  });

  afterAll(async () => {
    if (browser) await browser.close();
  });

  test('loads sketch and creates canvas without console errors', async () => {
    const fixture = path.resolve(__dirname, 'fixture', 'index.html');
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto('file://' + fixture);

    // Wait for canvas element created by p5
    await page.waitForSelector('canvas', { timeout: 10000 });

    // Let sketch run a few frames
    await page.waitForTimeout(2000);

    expect(errors).toEqual([]);
    const canvasCount = await page.$$eval('canvas', c => c.length);
    expect(canvasCount).toBeGreaterThanOrEqual(1);
  });
});
