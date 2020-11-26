const {exec} = require('../db/mysql');
const xss = require('xss');


const getList = (author, keyword) => {
    // 先返回假数据，格式是正确的
    let sql = `select * from blogs where 1=1 `
    if(author) {
        sql += `and author='${author}'`
    }
    if(keyword) {
        sql += `and title like '%${keyword}%'`
    }
    
    return exec(sql);
}

const getDetail = (id) => {
    let sql = `select * from blogs where id=${id}`
    // 返回假数据
    return exec(sql).then(rows => {
        return rows[0];
    });
}

const newBlog = (blogData = {}) => {
    const {title, content, author} = blogData;
    const createTime = Date.now();
    
    let sql = `
        insert into blogs(title, content, createtime, author)
        values('${xss(title)}', '${xss(content)}', ${createTime}, '${author}')
    `;

    return exec(sql).then((insertData) => {
        return insertData.insertId
    })
}

const updateBlog = (id, blogData = {}) => {
    const {title, content} = blogData;
    const sql = `update blogs set title='${xss(title)}', content='${xss(content)}' where id=${id}`

    return exec(sql).then((data) => {
        if(data.affectedRows > 0) {
            return true;
        }
        return false;
    })
}

const delBlog = (id, author) => {
    const sql = `delete from blogs where id=${id}`
    
    return exec(sql).then((data) => {
        if(data.affectedRows > 0) {
            return true;
        }
        return false;
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}