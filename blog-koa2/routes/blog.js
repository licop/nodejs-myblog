const router = require('koa-router')()
const {getList, getDetail, newBlog, updateBlog, delBlog} = require('../controller/blog');
const {SuccessModule, ErrorModule} = require('../module/resModule')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
    let author = ctx.query.author || '';
    const keyword = ctx.query.keyword || '';
    if(ctx.query.isadmin) {
        if(ctx.session.username == null) {
            ctx.body = new ErrorModule('未登录')
            return;
        }
        author = ctx.session.username;
    }

    const listData = await getList(author, keyword);
    ctx.body = new SuccessModule(listData);
});

router.get('/detail', async (ctx, next) => {
    const result = await getDetail(ctx.query.id);
    console.log(result, 25);
    ctx.body = new SuccessModule(result);
});

router.post('/new', loginCheck, async (ctx, next) => {
    ctx.request.body.author = ctx.session.username;
    let result = await newBlog(ctx.request.body);
    ctx.body = new SuccessModule(result)
});

router.post('/update', loginCheck, async (ctx, next) => {
    let val = await updateBlog(ctx.query.id, ctx.request.body);
    
    if(val) {
        ctx.body = new SuccessModule(val);
    } else {
        ctx.body = new ErrorModule('更新博客失败');
    }
});

router.post('/del', loginCheck, async (ctx, next) => {
    const author = ctx.session.username;
    const val = await delBlog(ctx.query.id, author);

    if(val) {
        ctx.body = new SuccessModule();
    } else {
        rctx.body = new ErrorModule('删除博客失败');
    }
});

module.exports = router;
