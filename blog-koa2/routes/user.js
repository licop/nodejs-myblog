const router = require('koa-router')()
const {checkLogin} = require("../controller/user");
const {SuccessModule, ErrorModule} = require('../module/resModule')

router.prefix('/api/user');

router.post('/login', async function(cxt, next) {
    const {username, password} = cxt.request.body;
    const result = await checkLogin(username, password);

    if (result.username) {
        // 设置 session
        cxt.session.username = result.username
        cxt.session.realname = result.realname
    
        cxt.body = new SuccessModule();
        return;
    }
    cxt.body = new ErrorModule('登录失败');

});


module.exports = router
