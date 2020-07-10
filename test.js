let kea = require('./lib/kea_api');
let fs = require('fs');
let path = require('path');
const util = require('util')
let config = JSON.parse(fs.readFileSync(path.join(__dirname, 'settings.json')));

global.settings = config;

kea.call_kea_api('list-commands', 'dhcp4').then(data => console.log(util.inspect(data, {depth: null, colors: true})), console.error);