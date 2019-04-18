const fs = require('fs');

const checker = require('license-checker');

const packageInfo = fs.readFileSync('./package.json', { encoding: 'UTF-8' });

// Licenses were taken from here:
// https://tldrlegal.com/licenses/tags/open%20source
const allowedLicenses = JSON.parse(fs.readFileSync(`${__dirname}/allowedLicenses.json`, { encoding: 'UTF-8' }));
const dependencies = Object.keys(JSON.parse(packageInfo).dependencies);

const acknowledgements = [];

const isLicenseAllowed = (libInfo = {}) => {
  const { licenses } = libInfo;

  if (licenses instanceof Array) {
    return licenses.every(license => allowedLicenses.indexOf(license) >= 0);
  }

  return allowedLicenses.indexOf(licenses) >= 0;
};

checker.init({
  start: './',
  unknown: true,
}, (err, json) => {
  if (err) {
    console.error(err);
  } else {
    const strippedVersions = Object.keys(json).reduce((acc, curr) => ({
      ...acc,
      [curr.replace(/@\d.*$/gi, '')]: json[curr],
    }), {});
    dependencies.forEach((lib) => {
      const libData = strippedVersions[lib];
      if (!libData) {
        throw new Error(`No data for library ${lib}`);
      }
      delete libData.publisher;
      delete libData.email;
      delete libData.url;
      delete libData.path;
      delete libData.dependencyPath;
      const libInfo = {
        ...libData,
        license: fs.readFileSync(strippedVersions[lib].licenseFile, { encoding: 'UTF-8' }),
        name: lib,
      };

      if (!isLicenseAllowed(libInfo)) {
        throw new Error(`Library ${lib} is not licensed appropriately with ${libInfo.licenses} license`);
      }

      delete libInfo.licenseFile;

      if (!libInfo) {
        console.error('not found');
      } else {
        acknowledgements.push(libInfo);
      }
    });

    if (acknowledgements.length) {
      fs.writeFileSync('./acknowledgements.json', JSON.stringify(acknowledgements, null, 2));
    }
  }
});
