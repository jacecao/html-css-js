var get2DCanvas = function (selector) {
  let _canvas = document.querySelector(selector);
  return {
    context: _canvas.getContext('2d'),
    ele: _canvas
  };
}

var getEle = function (selector) {
  return document.querySelector(selector);
}

var getEles = function (selector) {
  return document.querySelectorAll(selector);
}
