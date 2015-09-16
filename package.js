var fs = require('fs');
var path = require('path');
var lib = require('linco.lab').lib;
var Unzip = require('unzip');
var Zip = require('moxie-zip').ZipWriter;

/**
 * 打包Zip
 * @param    {String}    source  压缩的源地址
 * @param    {String}    target  压缩包地址
 * @param    {Object}    filter  过滤条件，参考linco.lab.lib.dir的文档
 * @param    {Function}  fn      回调
 * @example  zip('./folder', 'folder.zip', fn)
 */
function zip(source, target, filter, fn) {
    var zip = new Zip;
    var files = lib.dir(source || process.cwd(), filter).files;
    var zipfiles = [];

    if(typeof filter == 'function'){
        fn = filter;
        filter = null;
    }
    fn = fn || function(){};

    files.forEach(function(item){
        zip.addFile(item, item);
    })

    zip.saveAs(target, function(err){
        fn(err)
    })
}

/**
 * 解压Zip
 * @param    {String}   src     压缩包地址
 * @param    {String}   target  解压缩目的地
 * @example  zip('./folder.zip', './test/folder');
 */
function unzip(src, target, fn) {
    fs.createReadStream(src).pipe(Unzip.Extract({path: target}));
    fn && fn(null)
}

/**
 * [unzipSync description]
 * @param    {[type]}    src     [description]
 * @param    {[type]}    target  [description]
 * @param    {Function}  fn      [description]
 * @return   {[type]}            [description]
 * @example  [example]
 */
function unzipSync(src, target, fn) {
    var fstream = require('fstream')
    var input = fs.createReadStream(src);
    var ouput = fstream.Writer(target);

    fn = fn || function(){}

    input
      .pipe(Unzip.Parse())
      .pipe(ouput)

    ouput.on('close', function(){
        fn(null)
    })

    ouput.on('error', function(e){
        fn(e)
    })
}


exports.zip = zip;
exports.unzip = unzip;
