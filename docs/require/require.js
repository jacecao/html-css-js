(function () {
  // 缓存已经加载的模块
  let moduleCache = {};

  // 模块地址纠正
  let _getPathUrl = function (modName) {
    let url = modName;
    if (url.indexOf('.js') == -1) {
      url += '.js';
    }
    return url;
  }

  // 模块加载
  let loadMod = function (modName, callback) {
    let url = _getPathUrl(modName);
    let fs, mod, _script;
    // 检查模块是否已经加载
    if (moduleCache[modName]) {

      mod = moduleCache[modName];
      if (mod.status == 'loaded') {
        setTimeout(callback(mod.exports), 0);
      } else {
        mod.onload.push(callback);
      }

    } else {

      mod = moduleCache[modName] = {
        modName: modName,
        status: 'loading',
        exports: null,
        onload: [callback]
      };
      _script = document.createElement('script');
      _script.id = modName;
      _script.type = 'text/javascript';
      _script.charset = 'utf-8';
      _script.async = true;
      _script.src = url;

      fs = document.getElementsByTagName('script')[0];
      fs.parentNode.insertBefore(_script, fs);
    }
  }

  // 模块信息缓存
  let saveModule = function (modName, params, callback) {
    let mod, fn;
    if (moduleCache.hasOwnProperty(modName)) {

      mod = moduleCache[modName];
      mod.status = 'loaded';
      mod.exports = callback ? callback(params) : null;

      while (fn = mod.onload.shift()) {
        fn(mod.exports);
      }
    } else {

      callback && callback.apply(window, params);
    }
  }

  // @deps array 需要加载的文件地址数组
  let require = function (deps, callback) {
    let params = [];
    // 模块依赖值
    let depCount = 0;
    let i, len, modName;
    let isEmpty = false;

    // 获取HTML文件中当前正在执行的代码片段
    modName = document.currentScript && document.currentScript.id || 'REQUIRE_MAIN';

    if (deps.length) {
      for (i = 0, len = deps.length; i < len; i++) {
        // 执行闭包函数
        (function (i) {
          // 添加模块依赖值
          depCount++;
          // 执行模块加载
          loadMod(deps[i], function (param) {
            params[i] = param;
            depCount--;
            if (depCount == 0) {
              // 储存模块
              saveModule(modName, params, callback);
            }
          });
        })(i)
      }
    } else {
      isEmpty = true;
    }

    if (isEmpty) {
      setTimeout(function () {
        saveModule(modName, params, callback);
      }, 0);
    }

  }

  window.require = require;
  window.require.moduleCache = moduleCache;
  window.define = require;

})();
