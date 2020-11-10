const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'content-type': 'text/html'})
    res.end('<h1>hello wolrd<h1>')
});

server.listen(3003, () => {
    console.log('listening on 3003 port');
})