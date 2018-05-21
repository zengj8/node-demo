// let sizeOf = require('image-size');
// let dimensions = sizeOf('http://jidi.duoyioa.com/upload/tmpfile/20171206/162471568133670073.jpg');
// console.log(dimensions.width, dimensions.height);

Promise = require('bluebird');

let url = require('url');
let http = require('http');
let rp = require('request-promise');
let request = require('request');

let sizeOf = require('image-size');

let imgUrl = 'http://static.oschina.net/uploads/space/2016/0219/095715_HJwP_220508.png';
let options = url.parse(imgUrl);
// console.log(options);


http.get(options, function (response) {
  let chunks = [];
  response.on('data', function (chunk) {
    chunks.push(chunk);
  }).on('end', function() {
    let buffer = Buffer.concat(chunks);
    console.log('http', buffer);
    console.log(sizeOf(buffer));
  });
});

request({
  url: imgUrl,
  encoding: null
}, function(err, res, body) {
  let buffer = body;
  console.log('request', buffer);
});

async function test() {
  let result = await rp({url: imgUrl,
    encoding: null});
  let buffer = result;
  console.log('test', buffer);
}

test();


function test1() {
  return new Promise((resolve, reject) => {
    http.get(imgUrl, (response) => {
      let chunks = [];
      response.on('data', (chunk) => {
        chunks.push(chunk);
      }).on('end', () => {
        let buffer = Buffer.concat(chunks);
        resolve(sizeOf(buffer));
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
};

(async () => {
  try {
    console.log(await test1());
  } catch (error) {
    console.log(error);
  }
})();
