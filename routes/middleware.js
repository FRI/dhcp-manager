function loggedIn(req, res, next) {
    if (req.user) return next();
    res.redirect('/login');
}

function loggedOut(req, res, next) {
    if (!req.user) return next();
    res.redirect('/app');
}

module.exports = {
    loggedIn,
    loggedOut
}