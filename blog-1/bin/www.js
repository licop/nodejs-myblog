const http = require('http');
const serverHandle = require('../app')

const port = 3005;
const server = http.createServer(serverHandle);
server.listen(port);
