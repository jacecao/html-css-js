var get2DCanvas = function (selector) {
  let _canvas = document.querySelector(selector);
  return {
    context: _canvas.getContext('2d'),
    ele: _canvas
  };
}

var createCanvas = function (width, height) {
  var _canvas = document.createElement('canvas');
  if (width) { _canvas.width = width;}
  if (height) {_canvas.height = height;}
  return {
    context: _canvas.getContext('2d'),
    ele: _canvas
  }
}


var getEle = function (selector) {
  return document.querySelector(selector);
}

var getEles = function (selector) {
  return document.querySelectorAll(selector);
}

var image = function (src) {
  var _image = new Image();
  _image.src = src || "http://a.hiphotos.baidu.com/image/pic/item/faf2b2119313b07eaad49f0c00d7912397dd8c4d.jpg";
  return _image;
}

// 添加水印文字
var drawWaterMark = function (context, canvas) {
  var lineone = 'copyright',
      linetwo = 'Hiou Inc.',
      textMetrics,
      FONT_HEIGHT = 32;
  context.save();
  context.font = FONT_HEIGHT + 'px Arial';

  textMetrics = context.measureText(lineone);
  context.globalAlpha = 0.6;
  context.translate(canvas.width / 2, canvas.height / 2);

  context.fillText(lineone, -textMetrics.width / 2, 0);
  context.strokeText(lineone, -textMetrics.width / 2, 0);

  textMetrics = context.measureText(linetwo);
  context.fillText(linetwo, -textMetrics.width / 2, FONT_HEIGHT);
  context.strokeText(linetwo, -textMetrics.width / 2, FONT_HEIGHT);

  context.restore();
}
