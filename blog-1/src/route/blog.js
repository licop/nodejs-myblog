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
        const listData = getList(author, keyword); 
        
        return new SuccessModule(listData)
    }
    // 获取博客详情
    if(method === 'GET' && path === '/api/blog/detail') {
        const id = req.query.id || '';
        
        return new SuccessModule(getDetail(id));
    }
    // 新建博客
    if(method === 'POST' && path === '/api/blog/new') {
        return new SuccessModule(newBlog(req.body));
    }
    // 更新博客
    if(method === 'POST' && path === '/api/blog/update') {
        let result = updateBlog(id, req.body);
        if(result) {
            return new SuccessModule(result);
        } else {
            return new ErrorModule('更新博客失败');
        }
    }
    // 删除博客
    if(method === 'POST' && path === '/api/blog/del') {
        const result = delBlog(id);
        if(result) {
            return new SuccessModule()
        } else {
            return new ErrorModule('删除博客失败')
        }
    }
}

module.exports = handleBlogRouter;