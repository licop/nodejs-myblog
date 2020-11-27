const {exec} = require('../db/mysql');
const xss = require('xss');


const getList = async (author, keyword) => {
    // 先返回假数据，格式是正确的
    let sql = `select * from blogs where 1=1 `
    if(author) {
        sql += `and author='${author}'`
    }
    if(keyword) {
        sql += `and title like '%${keyword}%'`
    }
    
    return  await exec(sql);
}

const getDetail = async (id) => {
    let sql = `select * from blogs where id=${id}`
    // 返回假数据
    const rows = await exec(sql);
    return rows[0];
}

const newBlog = async (blogData = {}) => {
    const {title, content, author} = blogData;
    const createTime = Date.now();
    
    let sql = `
        insert into blogs(title, content, createtime, author)
        values('${xss(title)}', '${xss(content)}', ${createTime}, '${author}')
    `;

    const insertData = await exec(sql);

    return {
        id: insertData.insertId
    }
}

const updateBlog = async (id, blogData = {}) => {
    const {title, content} = blogData;
    const sql = `update blogs set title='${xss(title)}', content='${xss(content)}' where id=${id}`
    
    const data = await exec(sql);

    if(data.affectedRows > 0) {
        return true;
    }
    return false;
}

const delBlog = async (id, author) => {
    const sql = `delete from blogs where id=${id}`
    const data = await exec(sql);
    if(data.affectedRows > 0) {
        return true;
    }
    return false;
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}