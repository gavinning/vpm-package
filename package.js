var fs = require('fs');
var path = require('path');
var glob = require('glob');
var Unzip = require('unzip');
var Zip = require('moxie-zip').ZipWriter;

/**
 * 打包Zip
 * @param    {String}    source  压缩的源地址
 * @param    {String}    target  压缩包地址
 * @param    {Object}    filter  过滤条件，参考glob的ignore文档
 * @param    {Function}  fn      回调
 * @example  zip('./folder', 'folder.zip', fn)
 * @date     2016-04-22 11:48
 */
function zip(source, target, options, fn) {
    var zip = new Zip;

    // 检查是否存在filter
    if(typeof filter == 'function'){
        fn = filter;
        filter = null;
    }
    // 检查是否存在回调
    fn = fn || function(){};

    // 查找文件准备执行压缩
    glob(source + '/**', options, function(err, files){
        if(err) throw err;

        // 添加文件到待压缩数据中
        files.forEach(function(item){
            if(fs.statSync(item).isFile()){
                zip.addFile(path.relative(source, item), item);
            }
        })

        // 执行压缩
        zip.saveAs(target, function(err){
            fn(err, target)
        })
    })
}

/**
 * 解压Zip
 * @param    {String}   src     压缩包地址
 * @param    {String}   target  解压缩目的地
 * @param    {Function} fn      回调，可选
 * @example  zip('./folder.zip', './test/folder' [, fn]);
 * @date     2016-04-22 11:58
 */
function unzip(src, target, fn) {
    fs
        .createReadStream(src)
        .pipe(Unzip.Extract({path: target}))
        .on('close', fn || function(){})
}

exports.zip = zip;
exports.unzip = unzip;
