// POST请求访问
const http = require('http')
const querystring = require('querystring');


const server= http.createServer((req, res) => {
    if(req.method === 'POST') {
        // req 数据格式
        console.log('req content-type:',  req.headers['content-type']);
        // 接收数据
        let postData = '';
        req.on('data', chunk => {
            console.log(chunk.toString());
            postData += chunk.toString();
        })
        req.on('end',() => {
            console.log('postData', postData);
            res.end('hello world')
        })
    }
});

server.listen(3004);
console.log('ok')
