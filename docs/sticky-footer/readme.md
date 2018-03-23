```html
方法一
<div id="wrap">
    <div id="main" class="clearfix">
        <div id="content">
        </div>
        <div id="side">
        </div>
    </div>
</div>
<div id="footer">
</div>

<style>
*{padding: 0;margin: 0;font-size:20px;}
html, body, #wrap {height: 100%;}
body > #main {height: auto; min-height: 100%;}
#main {padding-bottom: 150px;} /* 必须使用和footer相同的高度 */
#footer {position: relative;margin-top: -150px; /* footer高度的负值 */height: 150px;clear:both;}
.clearfix:after {content: ".";display: block;height: 0;clear: both;visibility: hidden;}
.clearfix {display: inline-block;}
/* Hides from IE-mac \*/
* html .clearfix { height: 1%;}
.clearfix {display: block;}
/* End hide from IE-mac */
</style>

```

```html
方法二：fixed

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>sticky footer</title>
<style type="text/css">
*{padding: 0;margin: 0;font-size: 48px}
/* 第一步设置盒子为满屏大小 */
.box{
position: fixed;
width: 100%;
height: 100%;
top: 0;
left: 0;
overflow: auto;
background: green;
}
/* 第二步子盒子设置最小高度且清除浮动 给一个padding-bottom 等于footer 避免内容被footer遮盖*/
.box .main{
width: 100%;
min-height: 100%;  

padding-bottom: 100px;
}
.box .main .content{
background: orange;
/*padding-bottom: 100px;*/
}
/* 第三步footer的高度和margin-top要相等 */
.box .footer{
position: relative;
width: 100%;
height: 100px;
background: #f3f3f3;
margin: -100px auto 0 auto;
clear: both;
text-align: center;
line-height: 100px;

}
.clearfix{
display: inline-block;

}
.clearfix::after{
content: ".";
display: block;
height: 0;
line-height: 0;
visibility: hidden;
clear: both;
}
</style>
</head>
<body>
  <div class="box">
    <div class="main clearfix">
      <div class="content">
        <p>这里是内容区域</p>
      </div>
    </div>
    <div class="footer">这是footer区域</div>
  </div>
</body>
</html>

作者：王阿王
链接：https://www.jianshu.com/p/fb5241493625
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```