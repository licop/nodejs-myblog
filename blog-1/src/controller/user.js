const {exec} = require('../db/mysql');

const checkLogin = (userName, password) => {
    console.log(userName, password, 4)
    const sql = `
        select username, realname from users where username='${userName}' and password='${password}'
    `

    return exec(sql).then((rows) => {
        console.log(rows, 9);
        return rows[0] || {}
    })
}

module.exports = {
    checkLogin
}
