#vpm-package
[VPM](https://github.com/gavinning/vpm)打包模块  
[GLOB](https://www.npmjs.com/package/glob)  



### API
```js
var package = require('vpm-package');

/**
 * 打包文件
 * @param   {String}   pattern  glob pattern
 * @param   {String}   target   压缩包目标地址
 * @param   {Object}   options  glob options
 * @param   {Function} callback 解压完成后回调
 * @example package.zip('./folder/*.js', './folder.zip', {ignore: ['./node_modules/**']}, cb)
 */
package.zip(pattern, target, [options], callback)

/**
 * 解压文件
 * @param   {String}   src      压缩包地址
 * @param   {String}   target   解压目标地址
 * @param   {Function} callback 解压完成后回调
 * @example package.unzip('./folder.zip', './folder', cb)
 */
package.unzip(src, target, callback)

```

### Filter Example
```js

package.zip('/Users/gavinning/Documents/test', '/Users/gavinning/Documents/test.zip', ['**/node_modules/**'], function(err){
	console.log(arguments)
})
```
