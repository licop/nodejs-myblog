const {getList, getDetail, newBlog, updateBlog, delBlog} = require('../controller/blog');
const {SuccessModule, ErrorModule} = require('../module/resModule')

// 统一登录验证
const loginCheck = (req) => {
    console.log(req.session.username, 6);
    if(!req.session.username) {
        return Promise.resolve(
            new ErrorModule('尚未登录')
        )
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const path = req.path;
    const id = req.query.id || '';

    // 获取博客列表
    if(method === 'GET' && path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';        
        const result = getList(author, keyword);
        
        return result.then(listData => {
            return new SuccessModule(listData);
        })
    }

    // 获取博客详情
    if(method === 'GET' && path === '/api/blog/detail') {
        const result = getDetail(id);
        return result.then(data => {
            return new SuccessModule(data);
        })        
    }
    // 新建博客
    if(method === 'POST' && path === '/api/blog/new') {
        if(loginCheck(req)) {
            // 未登录
            return loginCheck(req);
        }

        let result = newBlog(req.body);
        req.body.author = req.session.username; // 假数据
        return result.then(data => {
            return new SuccessModule(data)
        })
    }
    // 更新博客
    if(method === 'POST' && path === '/api/blog/update') {
        if(loginCheck(req)) {
            // 未登录
            return loginCheck(req);
        }

        let result = updateBlog(id, req.body);
        return result.then(val => {
            if(val) {
                return new SuccessModule(val);
            } else {
                return new ErrorModule('更新博客失败');
            }
        })
    }
    // 删除博客
    if(method === 'POST' && path === '/api/blog/del') {
        if(loginCheck(req)) {
            // 未登录
            return loginCheck(req);
        }
        const author = req.session.username;
        const result = delBlog(id, author);

        return result.then(val => {
            if(result) {
                return new SuccessModule()
            } else {
                return new ErrorModule('删除博客失败')
            }
        })
    }
}

module.exports = handleBlogRouter;