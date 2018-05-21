let request = require('request');
let url = 'http://jidi.oa.com/upload/umeditor/compress/2017-12-06/e23a0de3-c3d4-44db-86b0-81e30c0c148e.png';
// let r = request(url, function (err, res, body) {
//   console.log(err);
//   console.log(res.statusCode);
//   console.log(r.uri.href);
//   console.log(res.request.uri.href);
//
//   // Mikael doesn't mention getting the uri using 'this' so maybe it's best to avoid it
//   // please add a comment if you know why this might be bad
//   console.log(this.uri.href);
// });

let rp = require('request-promise');
// let result = rp(url)
//   .then(function (res, err) {
//     console.log(res);
//   })
//   .catch(function (err) {
//     // Crawling failed or Cheerio choked...
//   });

// console.log(result);

let Promise = require('bluebird');
// Promise.promisifyAll(require("request"), {multiArgs: true});
// Promise.promisifyAll(request, {multiArgs: true});
// let request = Promise.promisify(require("request"));
// Promise.promisifyAll(request);
// let request = Promise.promisifyAll(require("request"), {multiArgs: true});
// request(url)
//   .then(function (res) {
//     console.log(res.request.uri.href);
//   });

async function test() {
  // let result = await request(url);
  // console.log(result.request.uri.href);
  return Promise.resolve(request(url))
    .then(function (res) {
      console.log(res.uri.href);
    })
    .catch((err) => {
      console.log(err);
    });
}

test();