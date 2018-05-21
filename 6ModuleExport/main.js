let example = require('./example.js');


require('./example.js').message = 'hello';

// console.log('example', example);

console.log(require('./example.js').message);