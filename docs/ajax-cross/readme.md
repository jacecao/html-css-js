#### AJAX-CROSS

AJAX跨域请求案例

通过Node来搭建服务环境

>server-3000 创建一个监听3000端口的服务，通过该端口发起访问4000端口的请求

>server-4000 创建一个监听4000端口的服务，针对请求内容返回请求信息

```javascript

let origin = req.headers['origin'];
if (origin.indexOf('localhost:3000') === -1) {
  origin = '';
}
res.writeHead(200, 'ok', {
  'content-type': 'text/html',
  'Access-Control-Allow-Origin': origin
});
```

以上为4000服务中实现跨域的响应头设置