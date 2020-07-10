let express = require('express'),
    session = require('express-session'),
    sass = require('node-sass-middleware'),
    path = require('path'),
    compression = require('compression'),
    helmet = require('helmet'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    flash = require('req-flash');

let router = new express.Router();

if (process.env.NODE_ENV != 'production') {
    router.use(require('morgan')('dev'))
}

router.use(compression());
router.use(helmet());

router.use(session({
    resave: true,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || 'I am bad at security...'
}));

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
router.use(passport.initialize())
router.use(passport.session())

let root = path.join(__dirname, '..');

router.use('/js/bootstrap.min.js', express.static(path.join(root, 'node_modules/bootstrap/dist/js/bootstrap.min.js')))
router.use('/js/jquery.min.js', express.static(path.join(root, 'node_modules/jquery/dist/jquery.min.js')))
router.use('/js/popper.min.js', express.static(path.join(root, 'node_modules/popper.js/dist/umd/popper.min.js')))
router.use('/assets', express.static(path.join(root, 'public')))
router.use('/css', express.static(path.join(root, 'styles')))

router.use(sass({
    src: path.join(root, 'styles'),
    debug: process.env.NODE_ENV != 'production',
    outputStyle: 'compressed',
    prefix:  '/css'
}));

router.use(flash({locals: 'flash'}))

router.use((req, res, next) => {
    res.locals.url = req.path;
    if (req.user) res.locals.user = req.user;
    next();
})

module.exports = router;