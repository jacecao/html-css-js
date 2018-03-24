/*
** 创建服务器监听3000端口
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

let webserver = function (req, res) {
	let req_url = req.url;
	let filePath = path.join(__dirname, req_url === '/' ? './index.html' : `.${req_url}`);

	fs.exists(filePath, exists => {
		if (exists) {
			res.writeHead(200, 'ok', {
			  "Content-Type": "text/html",
			});
			let file_stream = fs.createReadStream(filePath, {flags: 'r'});
			file_stream.pipe(res);
		} else {
			res.writeHead(404, 'NOT-FOUND', {
			  "Content-Type": "text/html",
			});
			res.end('<h3>404 NOT FOUND</h3>');
		}
	});
}

const createServer = http.createServer(webserver);

createServer.on('error', function (err) {
  console.log(err);
});

createServer.listen(3000, 'localhost', function () {
  console.log('webserver running at localhost:3000');
});
