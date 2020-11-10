const checkLogin = (userName, password) => {
    console.log(userName, password, 2);
    if(userName === 'zhangsan' && password === '123') {
        return true;
    }
    return false;
}

module.exports = {
    checkLogin
}