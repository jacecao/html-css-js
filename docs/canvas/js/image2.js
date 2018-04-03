/* canvas 对图像进行像素操作
** @author hiou
*/
(function () {
  var canvasObj = get2DCanvas('#test-4');
  var context = canvasObj.context;
  var canvas = canvasObj.ele;
  var reset = getEle('.reset4-hook');

  var img = image('./resource/test.jpg');
  var imageData = null,
      mousedown = {},
      rubberbandRectangle = {},
      dragging = false;

  // 计算canvas相对于窗口的距离
  function windowToCanvas (canvas, x, y) {
    var canvasRectangle = canvas.getBoundingClientRect();
    return {
      x: x - canvasRectangle.left,
      y: y - canvasRectangle.top
    };
  }
  // 截取图片像素
  function captureRubberbandPixels() {
    /*
    ** 这里需要注意的是getImageData是需要对原始数据进行访问的
    ** 这意味访问数据就必须搭建服务，如果不搭建服务就会报错
    ** 依然受到同源策略的限制
     */
    imageData = context.getImageData(
        rubberbandRectangle.left,
        rubberbandRectangle.top,
        rubberbandRectangle.width,
        rubberbandRectangle.height
      );
  }

  // 重绘图片像素
  function restoreRubberbandPixels() {
    context.putImageData(
        imageData,
        rubberbandRectangle.left,
        rubberbandRectangle.top
      );
  }
  // 绘制选取框
  function drawRubberband() {
    context.strokeRect(
        rubberbandRectangle.left + context.lineWidth,
        rubberbandRectangle.top + context.lineWidth,
        // 这里需要注意理解去除绘制的边框
        rubberbandRectangle.width - context.lineWidth * 4,
        rubberbandRectangle.height - context.lineWidth * 4
      );
  }
  // 设置rubberbandRectangle数据
  function setRubberbandRectangle(x, y) {
    rubberbandRectangle.left = Math.min(x, mousedown.x);
    rubberbandRectangle.top = Math.min(y, mousedown.y);
    rubberbandRectangle.width = Math.abs(x - mousedown.x);
    rubberbandRectangle.height = Math.abs(y - mousedown.y);
  }
  // 数据更新
  function updateRubberband() {
    captureRubberbandPixels();
    drawRubberband();
  }
  // 开始选取图像
  function rubberbandStart(x, y) {
    mousedown.x = x;
    mousedown.y = y;

    rubberbandRectangle.left = mousedown.x;
    rubberbandRectangle.top = mousedown.y;

    dragging = true;
  }

  function rubberbandStretch(x, y) {
    if (rubberbandRectangle.width > 2 * context.lineWidth &&
        rubberbandRectangle.height > 2 * context.lineWidth) {
      if (imageData !== undefined) {
        restoreRubberbandPixels();
      }
    }

    setRubberbandRectangle(x, y);

    if (rubberbandRectangle.width > 2 * context.lineWidth &&
        rubberbandRectangle.height > 2 * context.lineWidth) {
      updateRubberband();
    }
  }
  // 选取结束 绘制图像
  function rubberbandEnd() {
    context.drawImage(canvas,
        rubberbandRectangle.left + context.lineWidth * 2,
        rubberbandRectangle.top + context.lineWidth * 2,
        rubberbandRectangle.width - context.lineWidth * 4,
        rubberbandRectangle.height - context.lineWidth * 4,
        0, 0, canvas.width, canvas.height
      );

    dragging = false;
    imageData = undefined;
  }

  // 事件绑定
  canvas.addEventListener('mousedown', function(e) {
    var loc = windowToCanvas(canvas, e.clientX, e.clientY);
    e.preventDefault();
    rubberbandStart(loc.x, loc.y);
  }, false);

  canvas.addEventListener('mousemove', function(e) {
    var loc = null;

    if (dragging) {
      loc = windowToCanvas(canvas, e.clientX, e.clientY);
      rubberbandStretch(loc.x, loc.y);
    }

  }, false);

  canvas.addEventListener('mouseup', function (e) {
    rubberbandEnd();
  } ,false);

  img.addEventListener('load', function () {
    context.drawImage(this, 0, 0, canvas.width, canvas.height);
  }, false);

  reset.addEventListener('click', function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
  } , false);

  context.strokeStyle = '#fff';
  context.lineWidth = 1.0;
})();
