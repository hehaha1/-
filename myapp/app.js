var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//1.引入
var session = require('express-session')

const MongoStore = require("connect-mongo")

var app = express();

// view engine setup (配置模板引擎)
app.set('views', path.join(__dirname, 'views')); // path.join会根据Linux或window环境自动区分/与\ ; __dirname表示把路径转换成绝对路径
app.set('view engine', 'ejs'); // 设置引擎为ejs模板。

app.use(logger('dev')); // 引入morgan模块，每刷新一次页面，都会记录请求。 如：GET / 200 24.743 ms - 207
app.use(express.json()); // 为了获取前端POST过来的数据而做的中间件的设置。
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // 对前端传来的cookie进行解析，并且可以设置前端的cookie。
app.use(express.static(path.join(__dirname, 'public')));  //把public文件夹作为静态资源文件夹。

//2.注册session中间件
app.use(session({
  name:"ChinaSystem",
  secret:"dhfkyfuykfgkuy",
  cookie:{
      maxAge:1000*60*60, //过期时间1h
      secure:false //为true时，表示只有https协议才能访问cookie
  },
  // rolling:true, //true表示超时前刷新，cookie会重新计时
  resave:true, //每次重新访问接口之后，过期时间会重新开始计算
  saveUninitialized:true, //true：一开始访问网站就给cookie，但cookie是无效的，除非你登录成功后操作了一下才有效
                         //false:一开始没有给你cookie，除非你登录成功了，操作session了，才会给你cookie
  store:MongoStore.create({   //将数据存放到Mongodb中
  mongoUrl:'mongodb://127.0.0.1:27017/China_session', //新创建一个数据库来存它
  ttl:1000*60*60 //过期时间（要和上面的时间保持一致）
  })
}))

// 设置中间键，session过期校验
// 注意：这里会限制接口和页面
app.use((req,res,next)=>{
  if(req.url == '/login' || req.url == '/api/login' || req.url == '/api/user/add'){ 
    next()
    return
  }

  if(req.session.user){
    req.session.mydate = Date.now()
    next()
  }else{
    req.url.includes("api")?res.status(401).json({ok:0}):res.redirect("/login")
  }
})

// 一级路由
app.use('/', indexRouter);
app.use('/api', usersRouter); //用来配置users表的请求

// catch 404 and forward to error handler (页面不匹配，走404)
app.use(function(req, res, next) {
  next(createError(404)); // 通过createError模块，直接生成404的错误，传到下一个中间件的err里
});

// error handler
app.use(function(err, req, res, next) {  // 此时err接收到了404
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error'); // 渲染error.ejs文件
});

module.exports = app;
