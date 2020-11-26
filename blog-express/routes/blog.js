const  express = require('express');
const  router = express.Router();
const {getList, getDetail, newBlog, updateBlog, delBlog} = require('../controller/blog');
const {SuccessModule, ErrorModule} = require('../module/resModule')
const loginCheck = require('../middleware/loginCheck')

router.get('/list', (req, res, next) => {
    let author = req.query.author || '';
    const keyword = req.query.keyword || '';
    console.log(req.query.author, 9)
    if(req.query.isadmin) {
        if(req.session.username == null) {
            res.json(new ErrorModule('未登录'))
            return;
        }
        author = req.session.username;
    }

    const result = getList(author, keyword);
    return result.then(listData => {
        res.json(new SuccessModule(listData));
    })
});

router.get('/detail', (req, res, next) => {
    const result = getDetail(req.query.id);
    return result.then(data => {
        res.json(new SuccessModule(data));
    })
});

router.post('/new', loginCheck, (req, res, next) => {
    console.log(req.session.username, 34);
    req.body.author = req.session.username;
    let result = newBlog(req.body);

    return result.then(data => {
        res.json(new SuccessModule(data))
    })
});

router.post('/update', loginCheck, (req, res, next) => {
    let result = updateBlog(req.query.id, req.body);
    return result.then(val => {
        if(val) {
            res.json(new SuccessModule(val));
        } else {
            res.json(new ErrorModule('更新博客失败'));
        }
    })
});

router.post('/del', loginCheck, (req, res, next) => {

    const author = req.session.username;
    const result = delBlog(req.query.id, author);

    return result.then(val => {
        if(result) {
            res.json(new SuccessModule());
        } else {
            res.json(new ErrorModule('删除博客失败'));
        }
    })
});

module.exports = router;
