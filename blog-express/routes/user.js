const  express = require('express');
const  router = express.Router();
const {checkLogin} = require("../controller/user");
const {SuccessModule, ErrorModule} = require('../module/resModule')

router.post('/login', function(req, res, next) {
    const {username, password} = req.body;
        const result = checkLogin(username, password);
        console.log(username, password, 9);
        return result.then((data) => {
            console.log(data, 11);
            if (data.username) {
                // 设置 session
                req.session.username = data.username
                req.session.realname = data.realname
            
                res.json(new SuccessModule());
                return;
            }
            res.json(new ErrorModule('登录失败'));
        })
});

router.get('/login-test', (req, res, next) => {
    if(req.session.username) {
        res.json({
            error: 0,
            msg: '测试成功'
        })
        return;
    }
    res.json({
        error: -1,
        msg: '未登录'
    })
})

router.get('/session-test', (req, res, next) => {
    const session = req.session;
    res.json(session);
})

module.exports = router;
