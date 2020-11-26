const  express = require('express');
const  router = express.Router();
const {getList, getDetail, newBlog, updateBlog, delBlog} = require('../controller/blog');
const {SuccessModule, ErrorModule} = require('../module/resModule')

router.get('/list', function(req, res, next) {
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    const result = getList(author, keyword);
    
    return result.then(listData => {
        res.json(new SuccessModule(listData));
    })
});

module.exports = router;
