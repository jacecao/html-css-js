### Require模块加载时如何实现的？

说一下原生JS如何实现require的核心思想

* #### <span id="require">require()方法</span>

require(module_deps, callback(modules_res) {});

> @module_deps: Array 记录需要依赖的模块地址
> @callback: 加载模块后执行的回调函数，该回调函数接收一组参数module_res
> @module_res: 为加载模块module_deps中依次每个模块返回的值

require()方法执行流程

* **获取模块名**将当前执行代码的script元素的ID作为模块名,在该项目中我们取ID，这样更方便操作（当然也可以是地址）,通过`document.currentScript.id`方法来获取当前script标签的id,如果没有则为`require_main`,

* **检查依赖模块**检查是否需要加载其他模块，如果没有则直接传入initModule,进行当前模块的初始化，究竟[如何初始化](#initModule), 如果需要添加依赖模块，那么依次循环执行模块加载函数。

* **闭包执行模块加载**在`require`方法中有下面一段闭包函数，非常重要：
```javascript
(function (i) {
  // 记录模块依赖值
  depCount++;
  // 执行模块加载
  loadModule(modul_deps[i], function (mod_res) {
    modules_res[i] = mod_res;
    depCount--;
    if (depCount == 0) {
      // 初始依赖模块
      initModule(modName, modules_res, callback);
    }
  });
})(i)
```
这个闭包也是整个`require`模块最主要消耗内存的地方，依次循环加载模块依赖中，我们都需要执行`loadModule`函数，而在该函数中我们又传入了一个新的匿名函数，这个函数中需要使用使用多个`require`函数体内的变量，所以在该函数未执行前这些变量都必须保存在内存中。
那为什么要说这个闭包函数很重要呢？主要是这里面包含了整个模块加载**执行逻辑**，


