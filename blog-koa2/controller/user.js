const {exec, escape} = require('../db/mysql');
const {genPassword} = require('../utils/cryp'); 

const checkLogin = async (userName, password) => {
    userName = escape(userName);
    password = escape(genPassword(password));
    const sql = `
        select username, realname from users where username=${userName} and password=${password}
    `
    const rows = await exec(sql);

    return rows[0] || {};
}

module.exports = {
    checkLogin
}
