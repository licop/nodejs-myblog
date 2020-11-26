const http = require('http');
const slice = Array.prototype.slice;

class Express {
    constructor() {
        // 存放中间件的列表
        this.routes = {
            all = [], // app.use()
            get = [], // app.get()
            post = [] // app.post()
        }
    }
    
    register(path) {
        const info = {};
        if(typeof path == 'string') {
            info.path = path;
            // 从第二个参数开始，转换为数组，存入stack
            info.stack = slice.call(arguments, 1);
        } else {
            info.path = '/';
            // 从第一个参数开始，转换为数组，存入stack
            info.stack = slice.call(arguments, 0);
        }
        return info
    }

    // 把所有use的中间件根据路径存放起来
    use() {
        const info = this.register.apply(this, arguments);
        this.routes.all.push(info);
    }

    get() {
        const info = this.register.apply(this, arguments);
        this.routes.get.push(info)
    }

    post() {
        const info = this.register.apply(this, arguments);
        this.routes.post.push(info)
    }
    // 匹配当前路径和方法下的中间件
    match(method, url) {
        let stack = [];
        if(url === '/favion.ico') {
            return stack;
        }
        // 获取routes
        let currentRoute = [];
        curRoutes = curRoutes.concat(this.routes.all);
        curRoutes = curRoutes.concat(this.routes[method]);

        curRoutes.forEach(routeInfo => {
            if(url.indexof(routeInfo.path) === 0) {
                // url === 'api/get-cookie'
                stack = stack.concat(routeInfo.stack);
            }
        });
        return stack;
    }

    // 核心的next机制
    handle(req, res, stack) {
        const next = () => {
            // 拿到第一个匹配的middleware
            const middleware = stack.shift();
            // 执行中间件
            if(middleware) {
                middleware(req, res, next)
            }
        }
        next();
    }
    
    callback() {
        return (req, res) => {
            // 定义res.json
            res.json = (data) => {
                res.setHeader('Content-type', 'application/json');
                res.end(
                    JSON.stringify(data)
                )
            }
            const url = req.url;
            const method = req.method.toLowerCase();
            // 当前路由和方法下的中间件列表
            const resultList = this.match(method, url);
            this.handle(req, res, resultList);
        }
    }
    
    listen(...arg) {
        const server = http.createServer(this.callback());
        server.listen(...arg);
    }
}

// 工厂函数
module.exports = () => {
    return new Express();
} 