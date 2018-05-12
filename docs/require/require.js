/*
** 注意这里采用的是同步加载策略
 */

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
  let loadModule = function (mod_dep_name, callback) {

    let url = _getPathUrl(mod_dep_name);
    let js_ele, mod_obj, _script;

    console.log(JSON.stringify(moduleCache));
    console.log(mod_dep_name);

    // 检查模块是否已经加载
    if (moduleCache[mod_dep_name]) {
      mod_obj = moduleCache[mod_dep_name];
      // 检查模块状态
      if (mod_obj.status == 'loaded') {
        // console.log('loaded');
        // 如果已经加载完毕，那么下次轮询时执行回调
        setTimeout(callback(mod_obj.exports), 0);
      } else {
        // 如果未加载完毕就推入事件组（其实这里一个事件栈）
        mod_obj.onload.push(callback);
      }

    } else {
      // 缓存模块
      moduleCache[mod_dep_name] = {
        modName: mod_dep_name,
        status: 'loading',
        exports: null,
        onload: [callback]
      };
      // 创建script元素到文档中
      _script = document.createElement('script');
      _script.id = mod_dep_name;
      _script.type = 'text/javascript';
      _script.charset = 'utf-8';
      // 约定当前载入的代码为异步执行
      _script.async = true;
      _script.src = url;
      // 注意这里添加元素的顺序，所有模块都必须在主模块执行前就得加入
      js_ele = document.getElementsByTagName('script')[0];
      js_ele.parentNode.insertBefore(_script, js_ele);

      console.log(Date.now());
    }
  }

  // 初始化模块
  let initModule = function (modName, modules_res, callback) {
    let mod, fn;
    // console.log(JSON.stringify(moduleCache));
    // console.log(modName);
    // 如果模块已经加载且有了缓存
    // 也就是执行了上面的loadmodule
    if (moduleCache.hasOwnProperty(modName)) {
      // 改变状态执行模块中的函数
      mod = moduleCache[modName];
      mod.status = 'loaded';
      // 执行模块中的函数，并将模块中函数的返回值赋值给exports
      mod.exports = callback ? callback(...modules_res) : null;
      // 再次执行模块加载中推入加载栈中的函数
      // 这里使用方法非常巧妙，本人非常欣赏这样的优雅写法
      // fn 每次取得栈中第一个函数，并执行，直到栈中函数取尽
      while (fn = mod.onload.shift()) {
        fn(mod.exports);
      }
    } else {
      // console.log('main');
      // 如果没有执行模块加载，那么直接在window全局中执行回调
      callback && callback.apply(window, modules_res);
    }
  }

  // @deps array 需要加载的文件地址数组
  let require = function (modul_deps, callback) {
    // 储存模块抛出的数据
    let modules_res = [];
    // 记录需要依赖模块的数量
    let depCount = 0;
    let i, len, modName;
    let isEmpty = false;

    // 获取HTML文件中当前正在执行的代码片段的script元素
    // 这里主要是用于获取文件地址
    modName = document.currentScript && document.currentScript.id || 'REQUIRE_MAIN';
    // console.log(modName);
    // 注意这里的src得到的是一个绝对路径
    // console.log(document.currentScript.src);
    if (modul_deps.length) {

      for (i = 0, len = modul_deps.length; i < len; i++) {
        // 执行闭包函数
        (function (i) {
          // 追加依赖模块数量
          depCount++;
          // 执行模块加载
          loadModule(modul_deps[i], function (mod_res) {
            // 记录每个依赖模块返回的数据
            modules_res[i] = mod_res;
            // 执行完依赖模块加载后，将需要的依赖模块数量减一
            depCount--;
            if (depCount == 0) {
              // 初始依赖模块
              initModule(modName, modules_res, callback);
            }
          });
        })(i)
        console.log(`${modName} ---- ${i} \n >>>>>>`);
      }
    } else {

      isEmpty = true;
    }

    if (isEmpty) {

      setTimeout(function () {
        initModule(modName, modules_res, callback);
      }, 0);
    }

  }

  window.require = require;
  window.require.moduleCache = moduleCache;
  window.define = require;

})();
