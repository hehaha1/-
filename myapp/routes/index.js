var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(req.route.path)
  console.log("你好"+req.url)
  //4. 判断req.session有没有user属性
  if(req.session.user.role == 1){
    res.render('specialty'); // 自动找到views文件夹下的home.ejs
  }else{
    res.redirect('login');
  }
});

router.get('/cuisines', function(req, res, next) {
  res.render('cuisines');
});
router.get('/foodvideo', function(req, res, next) {
  res.render('foodvideo');
});
router.get('/snacks', function(req, res, next) {
  res.render('snacks');
});
router.get('/specialty', function(req, res, next) {
  res.render('specialty');
});

router.get('/spe-sichuan', function(req, res, next) {
  res.render('spe-sichuan');
});
router.get('/spe-guizhou', function(req, res, next) {
  res.render('spe-guizhou');
});
router.get('/spe-hunan', function(req, res, next) {
  res.render('spe-hunan');
});
router.get('/spe-guangxi', function(req, res, next) {
  res.render('spe-guangxi');
});
router.get('/spe-fujian', function(req, res, next) {
  res.render('spe-fujian');
});
router.get('/spe-guangdong', function(req, res, next) {
  res.render('spe-guangdong');
});
router.get('/spe-jiangxi', function(req, res, next) {
  res.render('spe-jiangxi');
});
router.get('/spe-yunnan', function(req, res, next) {
  res.render('spe-yunnan');
});
router.get('/spe-zhejiang', function(req, res, next) {
  res.render('spe-zhejiang');
});
router.get('/spe-jiangsu', function(req, res, next) {
  res.render('spe-jiangsu');
});
router.get('/spe-anhui', function(req, res, next) {
  res.render('spe-anhui');
});
router.get('/spe-hubei', function(req, res, next) {
  res.render('spe-hubei');
});
router.get('/spe-chongqing', function(req, res, next) {
  res.render('spe-chongqing');
});
router.get('/spe-shandong', function(req, res, next) {
  res.render('spe-shandong');
});
router.get('/spe-henan', function(req, res, next) {
  res.render('spe-henan');
});
router.get('/spe-shanxi', function(req, res, next) {
  res.render('spe-shanxi');
});
router.get('/spe-hebei', function(req, res, next) {
  res.render('spe-hebei');
});
router.get('/spe-shanxi2', function(req, res, next) {
  res.render('spe-shanxi2');
});
router.get('/spe-beijing', function(req, res, next) {
  res.render('spe-beijing');
});
router.get('/spe-tianjing', function(req, res, next) {
  res.render('spe-tianjing');
});
router.get('/spe-gansu', function(req, res, next) {
  res.render('spe-gansu');
});
router.get('/spe-ningxia', function(req, res, next) {
  res.render('spe-ningxia');
});
router.get('/spe-qinghai', function(req, res, next) {
  res.render('spe-qinghai');
});
router.get('/spe-xizang', function(req, res, next) {
  res.render('spe-xizang');
});
router.get('/spe-xingjiang', function(req, res, next) {
  res.render('spe-xingjiang');
});
router.get('/spe-neimenggu', function(req, res, next) {
  res.render('spe-neimenggu');
});
router.get('/spe-liaoning', function(req, res, next) {
  res.render('spe-liaoning');
});
router.get('/spe-hainan', function(req, res, next) {
  res.render('spe-hainan');
});
router.get('/spe-taiwan', function(req, res, next) {
  res.render('spe-taiwan');
});
router.get('/spe-jilin', function(req, res, next) {
  res.render('spe-jilin');
});
router.get('/spe-heilongjiang', function(req, res, next) {
  res.render('spe-heilongjiang');
});

router.get('/self', function(req, res, next) {
  res.render('self');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/search', function(req, res, next) {
  res.render('search');
});
router.get('/videoPlay', function(req, res, next) {
  res.render('videoPlay');
});
router.get('/chat', function(req, res, next) {
  res.render('chat');
});
router.get('/upVideo', function(req, res, next) {
  res.render('upVideo');
});
router.get('/dynamic', function(req, res, next) {
  res.render('dynamic');
});
router.get('/history', function(req, res, next) {
  res.render('history');
});
router.get('/collect', function(req, res, next) {
  res.render('collect');
});
router.get('/message', function(req, res, next) {
  res.render('message');
});
router.get('/manager', function(req, res, next) {
  // console.log(req.session.user.role) // 根据role的值实现路径的权限管理
  if(req.session.user.role == 2){
    res.render('manager'); 
  }else{
    res.redirect('home');
  }
});

module.exports = router;
