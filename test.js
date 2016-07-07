var package = require('./package.js');



// package.zip(process.cwd(), './test.zip', ['**/node_modules/**'], function(err, target){
//     console.log(arguments)
// })


package.unzip('./test.zip', './test', function(){
    console.log(arguments)
})

console.log(package)
