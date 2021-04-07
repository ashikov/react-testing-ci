const fs = require('fs');

// BEGIN
const upVersion = (filePath, versionType = 'patch') => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const packageData = JSON.parse(fileContent);
  const { version } = packageData;
  const [major, minor, patch] = version.split('.').map((v) => Number(v));

  let newVersionParts = [];
  switch (versionType) {
    case 'major':
      newVersionParts = [major + 1, '0', '0'];
      break;
    case 'minor':
      newVersionParts = [major, minor + 1, '0'];
      break;
    case 'patch':
      newVersionParts = [major, minor, patch + 1];
      break;
    default:
      throw new Error(`Unknown version param. ${versionType} given`);
  }

  packageData.version = newVersionParts.join('.');
  const stringifyData = JSON.stringify(packageData);

  fs.writeFileSync(filePath, stringifyData, 'utf-8');
};
// END

module.exports = { upVersion };
