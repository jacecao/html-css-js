/*
** canvas 对图像的基本操作
** @author  hiou
 */

// 图片铺满canvas
(function () {
  var canvasObj = get2DCanvas('#test-1');
  var context = canvasObj.context;
  var canvas = canvasObj.ele;
  var checkbox = getEle('.checkbox-hook');

  var img = image();

  var fullScreen = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (checkbox.checked) {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    } else {
      context.drawImage(img, 0, 0);
    }
  }
  img.onload = function (e) {
    context.drawImage(this, 0, 0);
    checkbox.addEventListener('click' , fullScreen, false);
  };
})();


// 图片缩放
(function () {
  var canvasObj = get2DCanvas('#test-2');
  var context = canvasObj.context;
  var canvas = canvasObj.ele;

  context.strokeStyle = 'yellow';
  context.shadowColor = 'rgb(50, 50, 50)';
  context.shadowOffsetX = 5;
  context.shadowOffsetY = 5;
  context.shadowBlur = 10;

  var range = getEle('.range-hook');
  var info = getEle('.info-2');

  var img = image();

  var scaleImage = function (scale) {
    var w = canvas.width,
        h = canvas.height,
        sw = w * scale,
        sh = h * scale;
    context.clearRect(0, 0, w, h);
    context.drawImage(img, -sw/2 + w/2 , -sh/2 + h/2, sw, sh);
  }

  var drawScaleText = function (value) {
    info.innerText = value;
    info.style.fontSize = (value * 4) + 'px';
    info.style.marginLeft = (value * 4) / 2 + 'px';
    info.style.top = -(value * 4) / 2 + 'px';
  }

  img.onload = function (e) {
    context.drawImage(this, 0, 0, canvas.width, canvas.height);
  };

  range.addEventListener('change' , function () {
    scaleImage(this.value);
    drawScaleText(this.value);
  }, false);
})();

// 水印绘制
/*
(function () {
  var canvasObj = get2DCanvas('#test-3');
  var context = canvasObj.context;
  var canvas = canvasObj.ele;

  var range = getEle('.range3-hook');
  var img = image();

  var scaleImage = function (scale) {
    var w = canvas.width,
        h = canvas.height,
        sw = w * scale,
        sh = h * scale;
    context.clearRect(0, 0, w, h);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    drawWaterMark(context, canvas);
    // 注意这里绘制原型是canvas，而不是图像
    context.drawImage(canvas, 0, 0, canvas.width, canvas.height, -sw/2 + w/2 , -sh/2 + h/2, sw, sh);
  }

  img.onload = function (e) {
    context.drawImage(this, 0, 0, canvas.width, canvas.height);
    drawWaterMark(context, canvas);
  };

  range.addEventListener('change' , function () {
    scaleImage(this.value);
  }, false);
})();
*/


// 采用后台canvas实现缩放图片渲染
// 看看与上面有什么不同

(function () {
  var canvasObj = get2DCanvas('#test-3');
  var context = canvasObj.context;
  var canvas = canvasObj.ele;

  var off_canvas = createCanvas(canvas.width, canvas.height);

  var range = getEle('.range3-hook');
  var img = image();

  var scaleImage = function (scale) {
    var w = canvas.width,
        h = canvas.height,
        sw = w * scale,
        sh = h * scale;
    context.clearRect(0, 0, w, h);
    // 注意这里绘制原型是canvas，而不是图像
    context.drawImage(off_canvas.ele, 0, 0, canvas.width, canvas.height, -sw/2 + w/2 , -sh/2 + h/2, sw, sh);
  }

  img.onload = function (e) {
    off_canvas.context.drawImage(this, 0, 0, canvas.width, canvas.height);
    drawWaterMark(off_canvas.context, off_canvas.ele);
    context.drawImage(off_canvas.ele, 0, 0, canvas.width, canvas.height);
  };

  range.addEventListener('change' , function () {
    scaleImage(this.value);
  }, false);
})();

