// 图片铺满canvas
(function () {
  var canvasObj = get2DCanvas('#test-1');
  var context = canvasObj.context;
  var canvas = canvasObj.ele;
  var checkbox = getEle('.checkbox-hook');
  var image = new Image();
  image.src = "http://a.hiphotos.baidu.com/image/pic/item/faf2b2119313b07eaad49f0c00d7912397dd8c4d.jpg";

  var fullScreen = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (checkbox.checked) {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    } else {
      context.drawImage(image, 0, 0);
    }
  }

  image.onload = function (e) {
    // console.log(e);
    context.drawImage(image, 0, 0);
    checkbox.addEventListener('click' , fullScreen, false);
  };
})();


// 图片放大
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
  var image = new Image();
  image.src = "http://a.hiphotos.baidu.com/image/pic/item/faf2b2119313b07eaad49f0c00d7912397dd8c4d.jpg";

  var info = getEle('.info-2');

  var scaleImage = function (scale) {
    var w = canvas.width,
        h = canvas.height,
        sw = w * scale,
        sh = h * scale;
    context.clearRect(0, 0, w, h);
    context.drawImage(image, -sw/2 + w/2 , -sh/2 + h/2, sw, sh);
  }

  var drawScaleText = function (value) {
    info.innerText = value;
    info.style.fontSize = (value * 4) + 'px';
    info.style.marginLeft = (value * 4) / 2 + 'px';
    info.style.top = -(value * 4) / 2 + 'px';
  }

  image.onload = function (e) {
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    range.addEventListener('change' , function () {
      scaleImage(this.value);
      drawScaleText(this.value);
    }, false);
  };
})();
