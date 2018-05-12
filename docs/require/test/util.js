console.log('util-loaded');
define([], function () {
  console.log('util-required');
  return {
    show: function (str) {
      document.querySelector('#hook').innerHTML += `<h3>${str}</h3>`;
    }
  }
});
