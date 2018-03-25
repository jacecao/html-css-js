// 测试服务器
// node 运行该文件 创建本地测试服务环境

const http = require('http');
const querystring = require('querystring');
const path = require('path');
const Multiparty = require('multiparty');
const util = require('util');
const fs = require('fs');

function writeResponse (res, data) {
	let total = 0;
	for (fruit in data) {
		total += Number(data[fruit])
	}

	res.writeHead(200, 'ok', {
		'Content-Type': 'text/html',
		'Access-Control-Allow-Origin': '*'
	});

	res.write(`<strong> ${total} items ordered</strong>`);
	res.end();
}

const server = http.createServer(function (req, res) {
	console.log(`[200] ${req.method} to ${req.url}`);

	if (req.method === 'OPTIONS') {
		
		es.writeHead(200, 'ok', {
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Origin': '*'
		});
		res.end();

	} else if (req.url === '/form' && req.method === 'POST') {
		
		let data_obj = new Object();
		let contentType = req.headers['content-type'];
		let full_body = '';

		if (contentType) {
			if (contentType.indexOf('application/x-www-form-urlencoded') !== -1) {
				req.on('data', (chunk) => {
					console.log(chunk.toString());
					full_body += chunk.toString();
				});
				req.on('end', () => {
					let dbody = querystring.parse(full_body);
					console.log(dbody);
					data_obj.apple = dbody.apple;
					data_obj.cherries = dbody.cherries;
					writeResponse(res, data_obj);
				});
			} else if (contentType.indexOf('application/json') !== -1) {
				req.on('data', (chunk) => {
					console.log(chunk.toString());
					full_body += chunk.toString();
				});
				req.on('end', () => {
					data_obj = JSON.parse(full_body);
					writeResponse(res, data_obj);
				});
			} else if (contentType.indexOf('multipart/form-data') !== -1) {
				req.on('data', (chunk) => {
					console.log(chunk.toString());
				});
				let form = new Multiparty.Form();
				form.parse(req, function(err, fields, files) {
					res.writeHead(200, {'Content-Type': 'text/plain'});
					res.write('received upload: \n\n');
					res.end(util.inspect({fields, files}));
				});
			}
		}

	} else {

		let filePath = path.join(__dirname, req.url === '/' ? './index.html' : `.${req.url}`);
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
});

server.listen(3000, 'localhost', () => {
	console.log('server running at localhost:3000');
});

// process.on('unhandledRejection', (mes, err) => {
// 	console.log(`rejection: ${err}, reason: ${mes}`);
// })

// process.on('uncaughtException', (err) => {
// 	fs.writeSync(1, `捕获到异常：${err}`);
// });