const {exec, escape} = require('../db/mysql');
const {genPassword} = require('../utils/cryp'); 

const checkLogin = (userName, password) => {
    
    userName = escape(userName);
    password = escape(genPassword(password));
    console.log(userName, password, 8)
    const sql = `
        select username, realname from users where username=${userName} and password=${password}
    `

    return exec(sql).then((rows) => {
        return rows[0] || {}
    })
}

module.exports = {
    checkLogin
}
