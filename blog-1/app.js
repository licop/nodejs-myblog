const querystinrg = require('querystring');
const { get, set } = require('./src/db/redis');
const handleUserRouter = require('./src/route/user');
const handleBlogRouter = require('./src/route/blog');
const { access } = require('./src/utils/log');
const user = require('./src/controller/user');

// const SESSION_DATA = {};
// 获取cookie过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))

    return d.toGMTString();
}

// 用于处理postData
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    // 记录access.log
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`, )

    // 设置返回格式
    res.setHeader('Content-type', 'application/json'); 
    const url = req.url;
    req.path = url.split('?')[0];
    
    req.query = querystinrg.parse(url.split('?')[1]);
    // 解析cookie
    req.cookie = {};
    
    const cookieStr = req.headers.cookie || ''; // k1=v1; k2=v2; 
    cookieStr.split(';').forEach(item => {
        if(!item) {
            return 
        }
        const arr = item.split('=');
        const key = arr[0].trim();
        const val = arr[1].trim();
        req.cookie[key] = val;
    });

    // 解析session 使用redis
    let needSetCookie = false;
    let userId = res.cookie ? res.cookie.userid : ''
    
    if(!userId){
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;

        // 初始化 session
        set(userId, {})
        
    }
    // 获取session
    req.sessionId = userId;
    get(req.sessionId).then(sessionData => {
        if(sessionData == null) {
            set(req.sessionId, {})
            req.session = {};
        } else {
            req.session = sessionData;
        }
        
        return getPostData(req)
    }).then(postData => {
        req.body = postData;
        const bolgResult = handleBlogRouter(req, res);
        const userResult = handleUserRouter(req, res);
        console.log(userResult, 92)
        if(bolgResult) {
            bolgResult.then(blogData => {
                if(needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return;
        }

        if(userResult) {
            console.log(102);
            userResult.then(userData => {
                res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)

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