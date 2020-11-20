const env = process.env.NODE_ENV; // 参数环境

let MYSLQ_CONF;

if(env === 'dev') {
    let MYSLQ_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'password',
        port: '3306',
        database: 'myblog'
    }
} 

if(env === 'production') {
    let MYSLQ_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'password',
        port: '3306',
        database: 'myblog'
    }
}

module.exports = {
    MYSLQ_CONF
}

