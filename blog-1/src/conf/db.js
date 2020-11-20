const env = process.env.NODE_ENV; // 参数环境
console.log(env, 2);
let MYSQL_CONF;

if(env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'password',
        port: '3306',
        database: 'myblog'
    }
} 

if(env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'password',
        port: '3306',
        database: 'myblog'
    }
}

module.exports = {
    MYSQL_CONF
}

