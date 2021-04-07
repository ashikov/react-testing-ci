const fs = require('fs');
const path = require('path');
const { upVersion } = require('../src/index.js');

// BEGIN
const fixturePath = path.resolve(path.join(path.dirname(__filename), '..', '__fixtures__', 'package.json'));

const setInitialPackageData = () => {
  const initialData = { version: '1.3.2' };

  fs.writeFileSync(fixturePath, JSON.stringify(initialData), 'utf-8');
};

describe('upVersion', () => {
  test('without patch param', () => {
    // 1.3.3
    // По умолчанию 'patch'
    upVersion(fixturePath);
    const fileContent = fs.readFileSync(fixturePath, 'utf-8');
    const { version } = JSON.parse(fileContent);
    expect(version).toBe('1.3.3');
  });

  test('patch version param', () => {
    // 1.3.3
    upVersion(fixturePath, 'patch');
    const fileContent = fs.readFileSync(fixturePath, 'utf-8');
    const { version } = JSON.parse(fileContent);
    expect(version).toBe('1.3.3');
  });

  test('minor version param', () => {
    // 1.4.0
    upVersion(fixturePath, 'minor');
    const fileContent = fs.readFileSync(fixturePath, 'utf-8');
    const { version } = JSON.parse(fileContent);
    expect(version).toBe('1.4.0');
  });

  test('major version param', () => {
    // 2.0.0
    upVersion(fixturePath, 'major');
    const fileContent = fs.readFileSync(fixturePath, 'utf-8');
    const { version } = JSON.parse(fileContent);
    expect(version).toBe('2.0.0');
  });

  afterEach(() => {
    setInitialPackageData();
  });
});
// END
