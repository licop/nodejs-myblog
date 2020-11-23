const querystinrg = require('querystring');
const handleUserRouter = require('./src/route/user');
const handleBlogRouter = require('./src/route/blog');
const user = require('./src/controller/user');

const SESSION_DATA = {};
// 获取cookie过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))

    return d.toGMTString();
}

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

    // 解析session
    let needSetCookie = false;
    let userId = res.cookie ? res.cookie.userid : ''
    if(userId) {
        if(!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {};
        }    
    } else {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        SESSION_DATA[userId] = {};
    }
    res.session = SESSION_DATA[userId];
    
    // 处理postdata
    getPostData(req).then(postData => {
        req.body = postData;
        const bolgResult = handleBlogRouter(req, res);
        const userResult = handleUserRouter(req, res);

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