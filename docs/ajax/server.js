console.time('start server need time');

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// 解析请求，返回响应内容
let webserver = function (req, res) {
  let reqUrl = req.url;
  console.log(reqUrl);
  // 组装实际文件路径
  let filePath = path.join(__dirname, reqUrl === '/' ? './index.html' : `.${reqUrl}`);

  // 判断访问文件是否存在
  fs.exists(filePath, function (exists) {
    if (exists) {
      // 响应头设置内容类型
      res.writeHead(200, {
        "Content-Type": "text/html"
      });
      // 创建读取文件流
      let fileStream = fs.createReadStream(filePath, {flags: 'r'});
      fileStream.on('error', function (err) {
        res.writeHead(404);
        res.end('<h3>404 Read Error</h3>');
      });
      fileStream.pipe(res);
    } else {
      // 如果没有指定的文件
      res.writeHead(404, {
        "Content-Type": "text/html"
      });
      res.end('<h3>404 NOT FOUND</h3>');
    }
  });
  
};

const createServer = http.createServer(webserver);

createServer.on('error', function (err) {
  console.log(err);
});

createServer.listen(3000, 'localhost', function () {
  console.log('webserver running at localhost:3000');
  console.timeEnd('start server need time');
});

createServer.on('connection', function (socket) {
  console.log('网络建立连接');
});