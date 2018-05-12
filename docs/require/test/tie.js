console.log('tie-loaded');

require(['test/util'], function (util) {
  console.log('tie-required');
  util.show('hello world!');
  return 'hello require';
})
