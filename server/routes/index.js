const router = require('koa-router')()

const home = require("../controllers/home");
const user = require("../controllers/user");

router.get('/', home)
router.get('/user/edit', user.editPage);
router.get('/user/login', user.loginPage);



module.exports = router
