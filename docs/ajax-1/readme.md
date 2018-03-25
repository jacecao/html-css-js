#### AJAX-1

AJAX 基础用例展示

* XMLHttpRequest readState属性

|值|数值|说明|
|-|:-:|:-|
|UNSENT|0|已创建XMLHttpRequest对象|
|OPENED|1|已调用OPEN方法|
|HEADERS_RECEIVED|2|已收到服务器响应的标头|
|LOADING|3|已收到服务器响应|
|DONE|4|响应完成或已失败|  

在XMLHttpRequest类中已经内置了上面5个属性，我们可以通过直接访问属性来获取数值 

|key|value|
|-|:-:|
|XMLHttpRequest.UNSENT|0|
|XMLHttpRequest.OPENED|1|
|XMLHttpRequest.HEADER_RECEIVED|2|
|XMLHttpRequest.LOADING|3|
|XMLHttpRequest.DONE|4|


需要注意的是readState值为DONE（4）时并不代表请求成功，只是说明请求已经完成，我们还需要通过status属性获取HTTP状态码，当状态码为200时才能够确定数据请求的结果。

* onreadystatechange 事件

在大部分浏览器中在触发该事件时会生成一个Event对象，通过XMLHttp的实例可以监听该事件，并在事件回调函数中通过使用`event.target`对象来获取返回的响应对象，但在较低版本的Opera浏览器中是不会有这个对象的，需要将XMLHttp的请求实例作为全局变量传递到回调函数中使用。

```javascript
  var buttons = document.getElementsByTagName('button');
  var httpRequest = null;
  Array.prototype.forEach.call(buttons, function (button) {
    button.addEventListener('click', function (e) {
      httpRequest = new XMLHttpRequest();
      httpRequest.onreadystatechange = handleResponse;
      httpRequest.open('GET', './'+e.target.innerHTML+'.html');
      httpRequest.send();
    }, false);
  });
  function handleResponse(e) {
    let res_e = e ? e.target : httpRequest;
    if (res_e.readyState == XMLHttpRequest.DONE && res_e.status == 200) {
      document.getElementById('target').innerHTML = res_e.responseText;
    }
  }
```

* XMLHttpRequest 对象定义的事件

|名称|说明|事件类型|
|-|-|-|
|abort|在请求被中止时触发|ProgrssEvent|
|error|在请求失败时触发|ProgrssEvent|
|load|在请求成功完成时触发|ProgrssEvent|
|loadend|在请求已完成时触发，无论成功还是错误|ProgrssEvent|
|loadstart|在请求开始时触发|ProgrssEvent|
|progress|触发以提示请求的进度|ProgrssEvent|
|readystatechange|在请求生命周期发生变化时触发|Event|
|timeout|请求超时触发|ProgrssEvent|

**一个请求实例可以通过调用abort()方法来终止本次请求，并会触发abort事件**

* XMLHttpRequest中的upload属性
一个请求实例的upload属性将返回一个可用于监控数据上传进度的对象，该对象主要用于监听上传中触发的事件，onabort\onerror\onload\onloadend\onloadstart\onprogress\ontimeout。

* ProgressEvent

`ProgressEvent`该事件对象是与常规的事件对象增加了以下一些额外属性

|key|value-type|desc|
|-|-|-|
|lenthComputable|Bool|如果能够计算数据流的总长度则返回true|
|loaded|Num|返回当前已载入的总数据量|
|total|Num|返回可用的数据总量|

* XMLHttpRequest 获取和设置标头

XMLHttpRequest对象中与标头有关的方法

|方法名|返回值|说明|
|-|-|-|
|setRequestHeader(header,value)|none|设置请求‘标头-值’|
|getResponseHeader(header)|string|获取指定标头的值|
|getAllResponseHeaders()|string|获取所有的标头|

服务端响应头在readState变成HEADERS_RECEIVED(数值为2)时就可以使用了，所以我们可以监听在状态为2时就可以读取响应头信息。

覆盖请求头
```javascript
httpReq.open('GET', '..url.com/xx');
httpReq.setRequestHeader('X-HTTP-Method-Override', "DELETE");
```   
要覆盖请求方式，那么需要在调用open方法之后才可以设置，如果在调用open方法之前使用了setRequestHeader方法，那XMLHttpResquest对象就会跑出一个错误。