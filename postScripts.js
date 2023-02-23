const fs = require('fs');

fs.unlinkSync('./dist/favicon.ico')
fs.unlinkSync('./dist/index.html')
fs.unlinkSync('./dist/manifest.json')
fs.unlinkSync('./dist/robots.txt')