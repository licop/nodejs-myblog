const {getList, getDetail, newBlog, updateBlog, delBlog} = require('../controller/blog');
const {SuccessModule, ErrorModule} = require('../module/resModule')

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
        let result = newBlog(req.body);
        req.body.author = 'zhangsan'; // 假数据
        return result.then(data => {
            return new SuccessModule(data)
        })
    }
    // 更新博客
    if(method === 'POST' && path === '/api/blog/update') {
        let result = updateBlog(id, req.body);
        req.body.author = 'zhangsan'; // 假数据
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
        const result = delBlog(id);
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