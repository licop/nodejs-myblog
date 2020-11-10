// GET请求访问
const http = require('http');
const querystring = require('querystring');

const server= http.createServer((req, res) => {
    console.log("method:", req.method); // GET;
    const url = req.url;
    console.log("url", url);
    req.query = querystring.parse(url.split('?')[1]);
    console.log('query:', req.query);
    // 将querystring返回
    res.end(
        JSON.stringify(req.query)
    );
});

server.listen(3004);
console.log('ok')
