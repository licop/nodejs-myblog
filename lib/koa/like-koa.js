const http = require('http');
const { createContext } = require('../../blog-koa2/app');

// 组合中间件
function compose(middlewareList) {
    return function(ctx) {
        function dispatch(i) {
            const fn = middlewareList(i);
            try {
                return Promise.resolve(
                    fn(ctx, dispatch.bind(null, i + 1))
                )
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return dispatch(0)
    }
}

class Koa {
    constructor() {
        this.middlewareList = [];
    }
    use(fn) {
        this.middlewareList.push(fn);
        return this;
    }
    createContext(req, res) {
        const ctx = {
            req,
            res
        }
        return ctx
    }
    handleRequest(ctx, fn) {
        return fn(ctx)
    }
    callback() {
        const fn = compose(this.middlewareList);
        
        return (req, res) => {
            const ctx = createContext(req, res);
            return this.handleRequest(ctx, fn);
        }
    }

    listen(...arg) {
        const server = http.createServer(this.callback());
    }
}

module.exports = Koa;