const { Router } = require("express");
let router = new Router();

router.use(require('./auth'));
router.use('/app', require('./app'))

module.exports = router;