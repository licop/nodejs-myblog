const {checkLogin} = require("../controller/user");
const { SuccessModule, ErrorModule } = require("../module/resModule");

const handleUserRouter = (req, res) => {
    const method = req.method;
    const path = req.path;
    
    // 获取博客列表
    if(method === 'POST' && path === '/api/user/login') {
        const {username, password} = req.body;
         
        const result = checkLogin(username, password);
        
        return result.then((data) => {
            console.log(data, 13);
            if(data.username) {
                return new SuccessModule(result);
            } 
            return new ErrorModule('登录失败');
        })

    }

}

module.exports = handleUserRouter;