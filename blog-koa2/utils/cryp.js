const crypto = require('crypto');

// 密钥
const SECRET_KEY = 'FFJHJDG';

// md5加密
function md5(content) {
    let md5 = crypto.createHash('MD5');
    return md5.update(content).digest('hex');
}

// 加密函数
function genPassword(password) {
    const src = `password=${password}&key=${SECRET_KEY}`;
    return md5(src);
}

const result = genPassword('123');

module.exports = {
    genPassword
}