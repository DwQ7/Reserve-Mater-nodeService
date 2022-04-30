/**
 *node服务器搭建
 */

//引入需要用到的核心模块
const express = require('express');

const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const path = require('path');
// const session = require('express-session');
// const { createProxyMiddleware } = require('http-proxy-middleware');
// const fs = require('fs');
// const bodyParser = require('body-parser');

//定义express框架
const app = express();

//设置跨域
app.use(cors());
app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() === 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
})
// app.all("*",(req,res,next)=>{
//   res.header('Content-Type','text/html;charset=utf-8');
//   next();
// })
//设置代理，主要用于调用后端提供的接口
// const options = {
//   target: 'http://localhost:9527', // 目标服务器 host
//   changeOrigin: true,               // 默认false，是否需要改变原始主机头为目标URL
//   ws: false,                         // 是否代理websockets
//   pathRewrite: {
//     '/apis' : '/',     // 重写请求，比如我们源访问的是api/old-path，那么请求会被解析为/api/new-path
//   }
// }
// const proxy1 = createProxyMiddleware(options);
// app.use('/apis',proxy1);
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const registerRouter = require('./routes/register');
//引用路由
// const loginRouter = require('./routes/login');
// const registerRouter = require('./routes/register');
// const downloadRouter = require("./routes/download");

//用于记录用户
// app.use(session({
//   secret: 'this is string key',   // 可以随便写。 一个 String 类型的字符串，作为服务器端生成 session.js 的签名
//   //name:'admin',/*保存在本地cookie的一个名字 默认connect.sid  可以不设置*/
//   resave: false,   /*强制保存 session.js 即使它并没有变化,。默认为 true。建议设置成 false。*/
//   saveUninitialized: true,   //强制将未初始化的 session.js 存储。  默认值是true  建议设置成true
//   cookie: {
//     maxAge:500000    /*过期时间*/
//   },   /*secure https这样的情况才可以访问cookie*/
//   //设置过期时间比如是30分钟，只要游览页面，30分钟没有操作的话在过期
//   rolling:true //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
// }))

//一些配置
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('./views'));
app.set('views',path.join(__dirname,'views'));
app.engine('html',require('express-art-template'));
app.set('view engine','html');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//配置路由
app.use('/users',usersRouter)
app.use('/login',loginRouter)
app.use('/register',registerRouter);
// app.use('/download',downloadRouter);


app.get('*',(req,res,next)=>{
  res.header("Content-Type", "text/html; charset=utf-8");
  next();
})

//错误时后的中间件
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
