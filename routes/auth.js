const { Router } = require("express");
const { loggedIn, loggedOut } = require('./middleware');
let passport = require('passport');
let LdapStrategy = require('passport-ldapauth');

passport.use(new LdapStrategy({
    server: global.settings.ldap
}));

passport.serializeUser(function(user, cb) {
    cb(null, JSON.stringify(user));
});
  
passport.deserializeUser(function(json, cb) {
    cb(null, JSON.parse(json))
});

let router = new Router();

router.get('/', loggedIn, (_, res) => {
    res.redirect('/app');
})

router.get('/login', loggedOut, (_, res) => {
    res.render('login');
})

router.post('/login', loggedOut, passport.authenticate('ldapauth', {
    successRedirect: '/app',
    failureRedirect: '/login',
    failureFlash: true
}))

router.get('/whoami', loggedIn, (req, res) => {
    res.send(req.user)
})

router.get('/logout', loggedIn, (req, res) => {
    req.logout();
    res.redirect('/login');
})

module.exports = router;