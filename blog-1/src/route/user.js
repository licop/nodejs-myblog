const {checkLogin} = require("../controller/user");
const { SuccessModule, ErrorModule } = require("../module/resModule");
const {set} = require('../db/redis')


const handleUserRouter = (req, res) => {
    const method = req.method;
    const path = req.path;
    
    // 获取博客列表
    if(method === 'POST' && path === '/api/user/login') {
        const {username, password} = req.body;
        const result = checkLogin(username, password);
        console.log(21);
        return result.then((data) => {
            if (data.username) {
                // 设置 session
                req.session.username = data.username
                req.session.realname = data.realname
                // 同步到 redis
                set(req.sessionId, req.session)

                return new SuccessModule()
            }
            return new ErrorModule('登录失败')
        })
    }
}

module.exports = handleUserRouter;
