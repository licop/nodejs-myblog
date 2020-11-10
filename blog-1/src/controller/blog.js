const getList = (author, keyword) => {
    // 先返回假数据，格式是正确的
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: Date.now(),
            author: 'zhangsan'
        },
        {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: Date.now(),
            author: 'lisi'
        }
    ];
}

const getDetail = (id) => {
    // 返回假数据
    return {
        id: 2,
        title: '标题B',
        content: '内容B',
        createTime: Date
    }
}

const newBlog = (blogData = {}) => {
    return {
        id: 3
    }
}

const updateBlog = (id, blogData = {}) => {
    return false;
}

const delBlog = (id) => {
    return true;
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}