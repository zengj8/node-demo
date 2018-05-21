Promise = require('bluebird');
let request = require('request');
let rp = require('request-promise');
let tough = require('tough-cookie');

let url = 'http://127.0.0.1:3000/users/login';

request.post({url: url, form: {user: 'adminxxxx'}}, function (err, res, body) {
  // console.log(res.headers);

  let cookies = res.headers['set-cookie'];
  console.log(cookies);

  let cookie_1 = rp.cookie('' + cookies[1]);
  console.log(cookie_1);

  let cookie_0 = rp.cookie('' + cookies[0]);
  console.log(cookie_0);

  // Put cookie in an jar which can be used across multiple requests
  let cookiejar = rp.jar();
  cookiejar.setCookie(cookie_1, 'http://127.0.0.1:3000');
  cookiejar.setCookie(cookie_0, 'http://127.0.0.1:3000');

  // ...all requests to https://api.mydomain.com will include the cookie
  let options = {
    headers: {'Content-Type': 'text/html; charset=utf-8'},
    uri: 'http://127.0.0.1:3000/users',
    method: 'GET',
    jar: cookiejar // Tells rp to include cookies in jar that match uri
  };

  rp(options).then(function (body) {
    console.log(body);
  })
});

// const reqOpt = {url: url, form: {user: 'adminxxxx'}};
// const reqPromiseOpt = Object.assign({}, reqOpt, {transform: function (body, res, resolveWithFullResponse) { return res['headers']['set-cookie'] }})
//
// function getCookieByRequest() {
//   return new Promise(function (resolve, reject) {
//     request.post(reqOpt, function (err, res, body) {
//       if (err) {
//         reject(err)
//         return
//       }
//
//       if (res && res['headers']) {
//         resolve(res['headers']['set-cookie'])
//       }
//     })
//   })
// }
//
// function getCookieByRequestPromise() {
//   return rp.post(reqPromiseOpt)
// }
//
// async function test() {
//   const cookie = await getCookieByRequest()
//   const cookie2 = await getCookieByRequestPromise()
//
//   console.log(cookie, cookie2)
// }
//
// test();