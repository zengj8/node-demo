let express = require('express');
//引用路由模块
let routes = require('./Routes/index');
//引用path模块
let path = require('path')
//引入session
let session = require('express-session');
//引入bodyparse
let bodyParser = require('body-parser');

//生成express对象
let app = express();


//__dirname 当前脚本路径, join 拼接路径
app.set('views', path.join(__dirname, 'views'));
//引用ejs模块, 并使用读取方法;
//require('ejs').__express === require('ejs').readerFile
app.engine('html', require('ejs').__express);

// 设置后缀名
// res.render('index'); === res.render('index.html')
//express 默认使用的引擎是jade, res.render('login.jade')
app.set('view engine', 'html');


//session
app.use(session({
	secret: 'asdfjklk#$%^&*()$%^&*',
	cookie: {maxAge: 1000 * 60 * 30},
	//每次更新
	resave: true,
	//强制保存未初始化的session
	saveUninitialized: true
}));


//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//设置静态文件夹
app.use(express.static(path.join(__dirname, 'public')))


//交由routes处理
app.use('/', routes);

//监听3000端口
app.listen(3000);	
