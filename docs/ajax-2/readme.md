#### AJAX-2

AJAX 数据传输用例展示

* 关于获取和设置头信息的方法(http_req为一起AJAX请求实例)

1. 设置头信息

http_req.setRequestHeader()       
http_req.overrideMimeType()

2. 获取服务头信息

http_req.getAllResponseHeaders()     
http_req.getResponseHeader("Content-Type")


3. 数据进度监控

```javascript
// http_req.upload 返回一个监控进度的对象
let upload = http_req.upload;
// 通过对监控对象添加监听方法，来获取进度信息
// prog 为一个现实进度的HTML元素
upload.onprogress = function (e) {
  prog.max = e.total;
  prog.value = e.loaded;
};
upload.onload = function (e) {
  // console.log(e);
  prog.max = 1;
  prog.value = 1;
};
```