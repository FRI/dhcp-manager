let express = require('express'),
    session = require('express-session'),
    path = require('path');

let app = express();

app.set('view engine', 'pug');

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || 'I am bad at security...'
}));

app.use('/assets', express.static(path.join(__dirname, '..', 'node_modules/bootstrap/dist')))
app.use('/assets', express.static(path.join(__dirname, '..', 'node_modules/jquery/dist')))
app.use('/assets', express.static(path.join(__dirname, '..', 'node_modules/popper.js/dist/umd')))
app.use('/assets', express.static(path.join(__dirname, '..', 'static')))

app.use((req, res, next) => {
    res.locals.url = req.path;
    if (req.session.user) res.locals.user = req.session.user;
    next();
})

app.use(require('../routes'))

let port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on', port))