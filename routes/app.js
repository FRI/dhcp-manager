const { Router } = require("express");
let router = new Router();

router.use(require('./middleware').loggedIn);

router.get('/', (req, res) => {
    res.render('app/home');
})
router.get('/networks', (req, res) => {
    res.render('app/networks');
})
module.exports = router;