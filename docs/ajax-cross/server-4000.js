/*
** 创建服务器监听4000端口
 */
const http = require('http');

let webserver = function (req, res) {
	let req_url = req.url;
	console.log(`[200] ${req.method} to ${req_url}`);
	// 通过请求头信息来自动设置允许访问的地址
	let origin = req.headers['origin'];
	if (origin.indexOf('localhost:3000') === -1) {
		origin = '';
	}
	res.writeHead(200, 'ok', {
		'content-type': 'text/html',
		// 这是跨域请求的关键，需要设置允许跨域访问的地址
		// 如果不设置该模块那么，index.html的请求将出错
		'Access-Control-Allow-Origin': origin
	});
	res.write(`<h4>come from 4000 port</h4><p>your input: ${req_url.substring(1)}</p>`);
	res.end();
}

const createServer = http.createServer(webserver);

createServer.on('error', function (err) {
  console.log(err);
});

createServer.listen(4000, 'localhost', function () {
  console.log('webserver running at localhost:4000');
});
