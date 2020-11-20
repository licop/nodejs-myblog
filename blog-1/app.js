const querystinrg = require('querystring');
const handleUserRouter = require('./src/route/user');
const handleBlogRouter = require('./src/route/blog');
const { getPriority } = require('os');

// 用于处理postData
const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        if(req.method !== 'POST') {
            resolve({})
            return
        }
        if(req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        

        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        })
        req.on('end',() => {
            if(!postData) {
                resolve({});
                return
            }
            resolve(JSON.parse(postData))
        })
    })
}

const serverHandle = (req, res) => {
    // 设置返回格式
    res.setHeader('Content-type', 'application/json'); 
    const url = req.url;
    req.path = url.split('?')[0];
    
    req.query = querystinrg.parse(url.split('?')[1]);

    // 处理postdata
    getPostData(req).then(postData => {
        req.body = postData;
        const bolgResult = handleBlogRouter(req, res);
        const userResult = handleUserRouter(req, res);

        if(bolgResult) {
            bolgResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return;
        }
        if(userResult) {
            userResult.then(userData => {
                res.end(
                    JSON.stringify(userData)
                )
            })
            return;
        }

        res.writeHead(404, {"Content-type": "text-plain"});
        res.write("404 not found/n");
        res.end();
    })
}

module.exports = serverHandle;

// process.env.NODE_ENV