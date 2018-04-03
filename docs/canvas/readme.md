### canvas

* 为什么getImageData()会报错

该方法是canvas对源图像数据的读取，需要注意的是在很多地方没有指出该方法必须在服务环境中使用，什么意思呢？就跟你使用AJAX一样，该方法必须使用服务环境来执行。

如果读取的是canvas中的图片，那这里就还需要注意，由于是对源数据读取，那么这里就需要受到同源策略的限制，意味着你的图片一旦是引用非同源服务下的其他网络资源，那么该方法会显示报错。

>Failed to execute 'getImageData' on 'CanvasRenderingContext2D': The canvas has been tainted by cross-origin data
