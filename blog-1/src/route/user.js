const {checkLogin} = require("../controller/user");
const { SuccessModule, ErrorModule } = require("../module/resModule");

const handleUserRouter = (req, res) => {
    const method = req.method;
    const path = req.path;
    
    // 获取博客列表
    if(method === 'POST' && path === '/api/user/login') {
        const {userName, password} = req.body;

        const result = checkLogin(userName, password);
        if(result) {
            return new SuccessModule(result);
        } else {
            return new ErrorModule('登录失败');
        }
    }
}

module.exports = handleUserRouter;
