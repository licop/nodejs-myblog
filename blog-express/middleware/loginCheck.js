const { ErrorModel } = require('../module/resModule');

module.exports = (req, res, next) => {
    if(res.session.username) {
        next();
        return;
    }
    res.json(new ErrorModel('未登录'));
}