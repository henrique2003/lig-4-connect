const fs = require('fs');
const path = require('path');

// eslint-disable-next-line no-undef
const filePath = path.join(__dirname, '../app.json');
const appJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const currentBuild = parseInt(appJson.expo.ios.buildNumber || '1', 10);
const newBuild = currentBuild + 1;

appJson.expo.ios.buildNumber = newBuild.toString();

fs.writeFileSync(filePath, JSON.stringify(appJson, null, 2));
console.log(`✅ Updated buildNumber iOS: ${newBuild}`);
