const { Router } = require("express");
let router = new Router();

router.get('/login', (_, res) => {
    res.render('login');
})

router.post('/login', (_, res) => {
    res.redirect('/app')
})

module.exports = router;