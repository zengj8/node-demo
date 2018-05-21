let fs = require('fs');

let StringDecoder = require('string_decoder').StringDecoder;
let decoder = new StringDecoder('utf8');

let buf1 = new Buffer([0xE5, 0xBA, 0x8A, 0xE5, 0x89, 0x8D, 0xE6, 0x98, 0x8E, 0xE6, 0x9C]);
console.log(decoder.write(buf1));

let buf2 = new Buffer([0x88, 0xE5, 0x85, 0x89, 0xEF, 0xBC, 0x8C, 0xE7, 0x96, 0x91, 0xE6]);
console.log(decoder.write(buf2));

let rs = fs.createReadStream('test.md', {highWaterMark: 11});
// rs.setEncoding('utf8');
let data = '';
rs.on('data', function (chunk) {
  console.log(chunk);
  data += chunk;
});
rs.on('end', function () {
  console.log(data);
});