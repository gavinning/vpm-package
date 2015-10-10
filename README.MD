#vpm-package
[VPM](https://github.com/gavinning/vpm)打包模块



```
var package = require('vpm-package');

// 打包目录
package.zip('./folder', './folder.zip', function(err){
    console.log(arguments)
})

// 解压目录
package.unzip('./folder.zip', './test', function(err){
    console.log(arguments)
})

```
