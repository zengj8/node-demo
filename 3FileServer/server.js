let formidable = require('formidable');
let request = require('request-promise');
let http = require('http');
let util = require('util');
let fs = require('fs');
let iconv = require('iconv-lite');

http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    let form = new formidable.IncomingForm();

    let chunks = [], size = 0;
    req.on('data', function (chunk) {
      chunks.push(chunk);
      size += chunk.length;
    }).on('end', function () {
      let buf = Buffer.concat(chunks, size);
      // let str = iconv.decode(buf, 'GBK');
      let str = iconv.decode(buf, 'utf-8');
      console.log(str);
      res.end('end');
    });

    form.parse(req, function(err, fields, files) {
      // res.writeHead(200, {'content-type': 'text/plain'});
      // res.write('received upload:\n\n');
      // res.end(util.inspect({fields: fields, files: files}));
      console.log({fields: fields, files: files});
    });

    return;
  }

  // show a file upload form 
  // res.writeHead(200, {'content-type': 'text/html'});
  // res.end(
  //   '<form action="/upload" enctype="multipart/form-data" method="post">'+
  //   '<input type="text" name="title"><br>'+
  //   '<input type="file" name="upload" multiple="multiple"><br>'+
  //   '<input type="submit" value="Upload">'+
  //   '</form>'
  // );
}).listen(3000);

// request({
//   uri : 'http://127.0.0.1:3000/upload',
//   method : 'POST',
//   formData : {
//     // Like <input type="text" name="name">
//     title : 'bbs.txt',
//     // Like <input type="file" name="file">
//     file : {
//       value : fs.createReadStream('C:\\Users\\duoyi\\Desktop\\my\\bbs.txt'),
//       options : {
//         filename : 'blob',
//         // contentType : 'application/octet-stream'
//       }
//     }
//   }
// }, function (err, response, body) {
//   console.log(body);
// });

let options = {
  hostname: 'localhost',
  port: 3000,
  path: '/upload',
  method: 'POST'
};

//生成分隔数据
let boundaryKey = '----WebKitFormBoundaryjLVkbqXtIi0YGpaB';

//读取需要上传的文件内容
fs.readFile('C:\\Users\\duoyi\\Desktop\\my\\bbs.txt', function (err, data) {
  //拼装分隔数据段
  let payload = '--' + boundaryKey + '\r\n' + 'Content-Disposition:form-data; name="file"; filename="bbs.txt"\r\n' + 'Content-Type:text/plain\r\n\r\n';
  payload += iconv.decode(data, 'GBK');
  payload += '\r\n--' + boundaryKey + '--';

  //发送请求
  let req = http.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('body:', chunk);
    });

  });

  req.on('error', function(e) {
    console.error("error:" + e);
  });
  //把boundary、要发送的数据大小以及数据本身写进请求
  req.setHeader('Content-Type', 'multipart/form-data; boundary='+boundaryKey+'');
  req.setHeader('Content-Length', Buffer.byteLength(payload, 'utf-8'));
  req.write(payload);
  req.end();
});
