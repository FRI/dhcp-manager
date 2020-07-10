let express = require('express'),
    fs = require('fs'),
    path = require('path');

let config = JSON.parse(fs.readFileSync(path.join(__dirname, 'settings.json')));

global.settings = config;

let app = express();

app.set('view engine', 'pug');

app.use(require('./routes'))

let port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on', port))