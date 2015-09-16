#vpm-package
VPM打包模块



```
var package = require('vpm-package');

package.zip('./folder', './folder.zip', function(err){
	console.log(arguments)
})

package.unzip('./folder.zip', './test', function(err){
	console.log(arguments)
})

```