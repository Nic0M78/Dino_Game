const fs = require('fs');
const { spawnSync } = require('child_process');
const path = require('path');

describe('sketch.js basic checks', () => {
  const sketchPath = path.resolve(__dirname, '..', 'sketch.js');
  let sketchText;

  beforeAll(() => {
    sketchText = fs.readFileSync(sketchPath, 'utf8');
  });

  test('node --check passes (syntax)', () => {
    const res = spawnSync('node', ['--check', sketchPath]);
    expect(res.status).toBe(0);
  });

  test('asset paths used in loadImage() exist', () => {
    const regex = /loadImage\(['"]([^'"]+)['"]\)/g;
    let m;
    const missing = [];
    while ((m = regex.exec(sketchText)) !== null) {
      const assetRel = m[1];
      const assetPath = path.resolve(__dirname, '..', assetRel);
      if (!fs.existsSync(assetPath)) missing.push(assetRel);
    }
    expect(missing).toEqual([]);
  });

  test('speed system constants follow PRD', () => {
    const speedMatch = sketchText.match(/let\s+speed\s*=\s*([0-9.]+)/);
    const intervalMatch = sketchText.match(/let\s+speedIncreaseInterval\s*=\s*([0-9.]+)/);
    const maxMatch = sketchText.match(/let\s+maxSpeed\s*=\s*([0-9.]+)/);
    expect(speedMatch).not.toBeNull();
    expect(intervalMatch).not.toBeNull();
    expect(maxMatch).not.toBeNull();
    expect(parseFloat(speedMatch[1])).toBe(3);
    expect(parseFloat(intervalMatch[1])).toBe(15);
    expect(parseFloat(maxMatch[1])).toBe(6.5);
  });
});
