const {checkLogin} = require("../controller/user");
const { SuccessModule, ErrorModule } = require("../module/resModule");

// 获取cookie过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))

    return d.toGMTString();
}

const handleUserRouter = (req, res) => {
    const method = req.method;
    const path = req.path;
    
    // 获取博客列表
    if(method === 'GET' && path === '/api/user/login') {
        const {username, password} = req.query;
        const result = checkLogin(username, password);
        return result.then((data) => {
            // 设置 session
            if(!req.session) {
                req.session = {}
            }
            req.session.username = data.username;
            req.session.realname = data.realname;
            
            if(data.username) {
                return new SuccessModule(result);
            } 
            return new ErrorModule('登录失败');
        })
    }
}

module.exports = handleUserRouter;
