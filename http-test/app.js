const { rename } = require('fs');
// POST请求访问
const http = require('http')
const querystring = require('querystring');

const server= http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    const path = url.split('?')[0];
    const query = querystring.parse(url.split('?')[1]);
    // 设置返回格式为json
    res.setHeader('Content-type', 'application/json'); 
    // 返回数据    
    const resData = {
        url,
        method,
        path,
        query
    }
    if(method === 'GET') {
        res.end(JSON.stringify(resData))
    }
    if(req.method === 'POST') {
        // 接收数据
        let postData = '';
        req.on('data', chunk => {
            console.log(chunk.toString());
            postData += chunk.toString();
        })
        req.on('end',() => {
            resData.postData = postData;
            res.end(JSON.stringify(resData));
        })
    }
});

server.listen(3004);
console.log('ok')
