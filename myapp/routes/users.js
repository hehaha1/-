var express = require('express');
var router = express.Router();
const UserModel = require('../model/UserModel')
const UserInfoModel = require('../model/UserInfoModel')
const VideoInfoModel = require('../model/VideoInfoModel')
const VideoIdModel = require('../model/VideoIdModel')
const VideoCommentsModel = require('../model/VideoCommentsModel')
const UserWatchHistoryModel = require('../model/UserWatchHistoryModel')
const UserCollectModel = require('../model/UserCollectModel')
const UserGoodModel = require('../model/UserGoodModel')
const VideoViewModel = require('../model/VideoViewModel')
const AttentionModel = require('../model/AttentionModel')
const CommentGoodModel = require('../model/CommentGoodModel')
const SnacksModel = require('../model/SnacksModel')
const SnacksComplaintsModel = require('../model/SnacksComplaintsModel')
const SnacksIdModel = require('../model/SnacksIdModel')
const VideoComplaintsModel = require('../model/VideoComplaintsModel')
const CommentsComplaintsModel = require('../model/CommentsComplaintsModel')
const NoticeModel = require('../model/NoticeModel')
const VideoAuditModel = require('../model/VideoAuditModel')
const SnacksAuditModel = require('../model/SnacksAuditModel')

//引入multer中间件
const multer  = require('multer')
const faceUpload = multer({ dest: 'public/uploads/face/' })  //创建文件夹
const videoUpload = multer({ dest: 'public/uploads/video/' })  //创建文件夹
const snacksUpload = multer({ dest: 'public/uploads/snacksImg/' })  //创建文件夹

/* GET users listing. */
router.get('/', function(req, res, next) {
  // cookie
  res.send('respond with a resource');
});

// 修改user表
router.post("/user/edit",(req,res)=>{
  const {id, role} = req.body // 从前端拿数据
  UserModel.updateOne({_id:id},{  // return返回 返回数据库数据
    role // 数据库数据
  }).then(data=>{
    res.send({
      ok:1
    })
  })
})

// 永久删除用户
router.get('/user/del/:id',(req,res)=>{
  UserModel.deleteOne({"_id":req.params.id}).then(data=>{
    UserInfoModel.deleteOne({"_id":req.params.id}).then(data=>{
      res.send({
        ok:1
      })
    })
  })
})

// 获取用户信息
router.get('/user/get',(req,res)=>{
  UserModel.find({}).then(data=>{
    res.send({
      data:data
    })
  })
})

// video审核通过
router.get('/video/add2/:id', (req,res)=>{
  VideoAuditModel.find({"_id":req.params.id},{}).then(data=>{
    const {img,title,userId,time,video,classify,nickName} = data[0]
    VideoIdModel.findOneAndUpdate({name: 'user'}, {$inc: {id: 1}}, {new: true,}, (err, docs)=>{
      const videoId = docs.id
      // 插入数据库
      VideoInfoModel.create({  
        videoId,img,title,userId,time,video,classify,nickName
      }).then(data=>{
      // 删除
        VideoAuditModel.deleteOne({"_id":req.params.id}).then(data=>{
          // (2) 通知发布者审核通过
          // const title = "video审核通知"
          // const content = "您上传的视频审核通过，已成功上传。"
          // // 获取当前时间
          // var date = new Date();
          // var year = date.getFullYear();
          // var month = date.getMonth()+1;
          // var day = date.getDate();
          // var hour = date.getHours();
          // var minute = date.getMinutes();
          // var second = date.getSeconds();
          // const time = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
          // // 插入数据库
          // NoticeModel.create({  
          //   title,content,time
          // }).then(data=>{
            res.send({
              ok:1
            })
          // })
        })
      })
    })
  })
});

// 待审核的video不通过
router.get('/audio/video/del/:id', (req,res)=>{
  // (1) 删除
  VideoAuditModel.deleteOne({"_id":req.params.id}).then(data=>{
    // (2) 通知发布者审核不通过的消息
    // const title = "video审核通知"
    // const content = "很抱歉，您上传的视频审核不通过。"
    // // 获取当前时间
    // var date = new Date();
    // var year = date.getFullYear();
    // var month = date.getMonth()+1;
    // var day = date.getDate();
    // var hour = date.getHours();
    // var minute = date.getMinutes();
    // var second = date.getSeconds();
    // const time = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
    // // 插入数据库
    // NoticeModel.create({  
    //   title,content,time
    // }).then(data=>{
      res.send({
        ok:1
      })
    // })
  })
});

// snack审核通过
router.get('/snacks/add2/:id', (req,res)=>{
  SnacksAuditModel.find({"_id":req.params.id},{}).then(data=>{
    // console.log(data)
    const {img,title,userId,classify,nickName} = data[0]
    // console.log(img,title,userId,classify,nickName)
    SnacksIdModel.findOneAndUpdate({name: 'user'}, {$inc: {id: 1}}, {new: true,}, (err, docs)=>{
    const snacksId = docs.id
    // 插入数据库
    SnacksModel.create({  
      img,title,userId,classify,nickName,snacksId
    }).then(data=>{
      // 删除
      SnacksAuditModel.deleteOne({"_id":req.params.id}).then(data=>{
         // (2) 通知发布者审核通过
        // const title = "snacks审核通知"
        // const content = "您上传的snacks图文审核通过，已成功上传。"
        // // 获取当前时间
        // var date = new Date();
        // var year = date.getFullYear();
        // var month = date.getMonth()+1;
        // var day = date.getDate();
        // var hour = date.getHours();
        // var minute = date.getMinutes();
        // var second = date.getSeconds();
        // const time = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
        // 插入数据库
        // NoticeModel.create({  
        //   title,content,time
        // }).then(data=>{
          res.send({
            ok:1
          })
        // })
      })
    })
   })
  })
});

// 待审核的snacks不通过
router.get('/audio/snacks/del/:id', (req,res)=>{
  // (1) 删除
  SnacksAuditModel.deleteOne({"_id":req.params.id}).then(data=>{
    // (2) 通知发布者审核不通过的消息
    // const title = "snacks审核通知"
    // const content = "很抱歉，您上传的snacks图文审核不通过。"
    // // 获取当前时间
    // var date = new Date();
    // var year = date.getFullYear();
    // var month = date.getMonth()+1;
    // var day = date.getDate();
    // var hour = date.getHours();
    // var minute = date.getMinutes();
    // var second = date.getSeconds();
    // const time = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
    // // 插入数据库
    // NoticeModel.create({  
    //   title,content,time
    // }).then(data=>{
      res.send({
        ok:1
      })
    // })
  })
});

// 获取待审核的snacks
router.get('/audio/snacks', (req,res)=>{
  SnacksAuditModel.find({}).then(data=>{
    res.send({
      data:data,
      ok:1
    })
  })
});

// 获取待审核的视频
router.get('/audio/video', (req,res)=>{
  VideoAuditModel.find({}).then(data=>{
    res.send({
      data:data,
      ok:1
    })
  })
});

// 获取系统通知
router.get('/notice/get', (req,res)=>{
  NoticeModel.find({}).then(data=>{
    res.send({
      data:data,
      ok:1
    })
  })
});

// 发布系统通知
router.post('/notice/add', (req,res)=>{
  const {title,content} = req.body
  // 获取当前时间
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  const time = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
  // 插入数据库
  NoticeModel.create({  
    title,content,time
  }).then(data=>{
    res.send({
      ok:1
    })
  })
})

// 根据id获取评论
router.get('/comments/get/:id', (req,res)=>{
  VideoCommentsModel.find({"_id":req.params.id},{}).then(data=>{
    res.send({
      data:data,
      ok:1
    })
  })
});

// 删除评论
router.get('/comment/del/:id', (req,res)=>{
  // 查询数据库
  VideoCommentsModel.deleteOne({"_id":req.params.id}).then(data=>{
    CommentsComplaintsModel.deleteOne({"commentId":req.params.id}).then(data=>{
      res.send({
        ok:1
      })
    })
  })
});
// 删除评论
router.get('/comment/del2/:id', (req,res)=>{
  // 查询数据库
  CommentsComplaintsModel.deleteOne({"commentId":req.params.id}).then(data=>{
    res.send({
      ok:1
    })
  })
});

// 删除snacks
router.get('/snacks/del/:id', (req,res)=>{
  // 查询数据库
  SnacksModel.deleteOne({"snacksId":req.params.id}).then(data=>{
    SnacksComplaintsModel.deleteOne({"snacksId":req.params.id}).then(data=>{
      res.send({
        ok:1
      })
    })
  })
});
// 删除snacks
router.get('/snacks/del2/:id', (req,res)=>{
  // 查询数据库 
  SnacksComplaintsModel.deleteOne({"snacksId":req.params.id}).then(data=>{
    res.send({
      ok:1
    })
  })
});

// 获取snacks
router.get('/snacks/get2/:id', (req,res)=>{
  // 查询数据库
  SnacksModel.find({"snacksId":req.params.id}).then(data=>{
    res.send({
      data:data,
      ok:1
    })
  })
});

// 删除视频
router.get('/video/del/:id', (req,res)=>{
  VideoInfoModel.deleteOne({"videoId":req.params.id}).then(data=>{
    VideoComplaintsModel.deleteOne({"videoId":req.params.id}).then(data=>{
      res.send({
        ok:1
      })
    })
  })
});

router.get('/video/del2/:id', (req,res)=>{
 VideoComplaintsModel.deleteOne({"videoId":req.params.id}).then(data=>{
    res.send({
      ok:1
    })
  })
});

// 获取视频投诉的数据
router.get('/video/complaints/get', (req,res)=>{
  VideoComplaintsModel.find({}).then(data=>{
    res.send({
      data:data,
      ok:1
    })
  })
})

// 获取snacks投诉的数据
router.get('/snacks/complaints/get', (req,res)=>{
  SnacksComplaintsModel.find({}).then(data=>{
    res.send({
      data:data,
      ok:1
    })
  })
})

// 获取评论投诉的数据
router.get('/comments/complaints/get', (req,res)=>{
  CommentsComplaintsModel.find({}).then(data=>{
    res.send({
      data:data,
      ok:1
    })
  })
})

// 视频评论投诉
router.post('/comments/complaints', (req,res)=>{
  const {userId,commentId,questionsText} = req.body
  CommentsComplaintsModel.create({  
    userId,commentId,questionsText // 数据库数据
  }).then(data=>{
    res.send({
      ok:1
    })
  })
})

// video投诉
router.post('/video/complaints', (req,res)=>{
  const {userId,videoId,questionsText} = req.body
  VideoComplaintsModel.create({  
    userId,videoId,questionsText // 数据库数据
  }).then(data=>{
    res.send({
      ok:1
    })
  })
})

// snacks投诉
router.post('/snacks/complaints', (req,res)=>{
  const {userId,snacksId,questionsText} = req.body
  console.log(userId,snacksId,questionsText)
  SnacksComplaintsModel.create({  
    userId,snacksId,questionsText // 数据库数据
  }).then(data=>{
    res.send({
      ok:1
    })
  })
})

// 获取各地小吃
router.get('/snacks/get', (req,res)=>{
  // 查询数据库
  SnacksModel.find({}).then(data=>{
    res.send({
      data:data,
      ok:1
    })
  })
});

// 上传各地小吃
// 修改头像
router.post('/snacks/add',snacksUpload.single("img"),(req,res)=>{
  const img = `/uploads/snacksImg/${req.file.filename}` // 不传头像也不会报错
  const {title,userId,classify,nickName} = req.body // 从前端拿数据
  console.log(title,userId,classify,nickName)
//   SnacksIdModel.findOneAndUpdate({name: 'user'}, {$inc: {id: 1}}, {new: true,}, (err, docs)=>{
//     // if(err) return err;
//     // console.log(docs);
//     const snacksId = docs.id
//     // 插入数据库
//     SnacksModel.create({  
//       img,title,userId,classify,nickName,snacksId
//     }).then(data=>{
//       res.send({
//         ok:"上传成功"
//     })
//   })
//  })
  SnacksAuditModel.create({  
    img,title,userId,classify,nickName
  }).then(data=>{
    res.send({
      ok:"上传成功"
    })
  })
})

router.get('/videoinfo/good/find4/:id', (req,res)=>{
  // 查询数据库
  UserInfoModel.find({userId:req.params.id},["nickName"]).then(data=>{
    res.send({
      data:data,
      ok:1
    })
  })
});

router.get('/videoinfo/good/find3/:id', (req,res)=>{
  VideoInfoModel.find({"videoId":req.params.id},["title"]).then(data=>{
    res.send({
      data:data
    })
  })
});

router.get('/videoinfo/good/find2/:id', (req,res)=>{
  UserGoodModel.find({"videoId":req.params.id},{}).then(data=>{
    res.send({
      data:data
    })
  })
});

//查询用户自己发布过的视频
router.get('/videoinfo/good/find/:id', (req,res)=>{
  VideoInfoModel.find({"userId":req.params.id},["videoId"]).then(data=>{
    res.send({
      data:data
    })
  })
});

// 获取点赞评论的数据
router.get('/user/comment/begood/get/:id', (req,res)=>{
  // 查询数据库
  CommentGoodModel.find({"userId":req.params.id}).then(data=>{
    res.send({
      data:data
    })
  })
});

// 查看用户是否点赞某条评论
router.post('/user/comment/good/get', (req,res)=>{
  const {guserId,commentid} = req.body // 从前端拿数据
  // 查询数据库
  CommentGoodModel.find({"commentid":commentid,"guserId":guserId}).then(data=>{
    if(data.length > 0){
      res.send({
        ok:1
      })
    }else{
      res.send({
        ok:0
      })
    }
  })
});

// 获取某个评论的点赞数
router.get('/comment/goodnum/get/:id', (req,res)=>{
  // 查询数据库
  CommentGoodModel.find({"commentid":req.params.id}).then(data=>{
    // console.log(data)
    res.send({
      data:data.length
    })
  })
});

// 点赞评论事件
router.post('/comment/good', (req,res)=>{
  const {commentid,guserId} = req.body
  // 实现点击第一次点赞，点击第二次取消点赞
  CommentGoodModel.find({"commentid":commentid,"guserId":guserId}).then(data=>{
    if(data.length > 0){
      // 说明重复插入：立即删除
      CommentGoodModel.deleteOne({"commentid":commentid,"guserId":guserId}).then(data=>{
        res.send({
          ok:1
        })
      })
    }else{
      // 没有重复插入:立即插入
      // (1) 查询用户点赞的这条评论
      VideoCommentsModel.find({"_id":commentid}).then(data=>{
        // console.log(data[0])
        var userId = data[0].userId // 发布评论的用户的id
        var comment = data[0].comment
        var videoId = data[0].videoId
        // (2) 根据userId查询点赞这条评论的用户数据
        UserInfoModel.find({"userId":guserId},{}).then(data=>{
          var gnickName = data[0].nickName
          // (3) 根据userId查询点赞者的头像
          UserModel.find({"_id":guserId},["avatar"]).then(data=>{
            // console.log(data[0])
            var gavatar = data[0].avatar

            // (4) 获取当前时间
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();
            const goodtime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
            // (5) 存储用户点赞这条评论的数据
            CommentGoodModel.create({  
              userId,comment,videoId,guserId,gavatar,gnickName,goodtime,commentid
            }).then(data=>{
              res.send({
                ok:1
              })
            })
          })
        })
      })
    }
  })
});

// 删除收藏的视频
router.post('/videoPlay/del', (req,res)=>{
  const {videoId,userId} = req.body
  UserCollectModel.deleteOne({"videoId":videoId,"userId":userId}).then(data=>{
    res.send({
      ok:1
    })
  })
});

// 动态
router.get('/videoinfo/find/:up', (req,res)=>{
  // 查询用户关注的博主发布的视频
  VideoInfoModel.find({"userId":req.params.up}).then(data=>{
    res.send({
      data:data,
      ok:1
    })
  })
});

// 查询自己发布的视频的数量
router.get('/my/videoinfo/find/:up', (req,res)=>{
  // 查询用户关注的博主发布的视频
  VideoInfoModel.find({"userId":req.params.up}).then(data=>{
    res.send({
      data:data.length,
      ok:1
    })
  })
});

// 动态
router.get('/dynamic/:userId', (req,res)=>{
  // 查询用户关注的博主
  AttentionModel.find({"fans":req.params.userId},["up"]).then(data=>{
    res.send({
      data:data,
      ok:1
    })
  })
});

// 热门
router.get('/video/hot/get', (req,res)=>{
  VideoInfoModel.find({},["videoId","title","classify"]).then(data=>{
    res.send({
      data:data,
      ok:1
    })
  })
});

// 查看当前用户是否有关注博主
router.post('/attention/get2', (req,res)=>{
  const {up,fans} = req.body // 从前端拿数据
  // 查询数据库
  AttentionModel.find({"fans":fans,"up":up}).then(data=>{
    if(data.length > 0){
      res.send({
        ok:1
      })
    }else{
      res.send({
        ok:0
      })
    }
  })
});

// 获取某个视频作者的粉丝数量
router.get('/attention/get/:up', (req,res)=>{
  // 查询数据库
  AttentionModel.find({"up":req.params.up}).then(data=>{
    res.send({
      data:data.length
    })
  })
});

// 获取某个用户所关注的博主数量
router.get('/my/attention/get/:fans', (req,res)=>{
  // 查询数据库
  AttentionModel.find({"fans":req.params.fans}).then(data=>{
    res.send({
      data:data.length
    })
  })
});

// 粉丝关注某个视频发布者
router.post('/attention/add', (req,res)=>{
  const {fans,up} = req.body // 从前端拿数据

   // 实现点击第一次关注，点击第二次取消关注
   AttentionModel.find({"fans":fans,"up":up}).then(data=>{
    if(data.length > 0){
      // 说明重复插入：立即删除
      AttentionModel.deleteOne({"fans":fans,"up":up}).then(data=>{
        res.send({
          ok:1
        })
      })
    }else{
      // 没有重复插入:立即插入
      AttentionModel.create({  
        fans,up
      }).then(data=>{
        res.send({
          ok:1
        })
      })
    }
  })
});

// 获取某个视频的播放量
router.get('/videoview/number/get/:id', (req,res)=>{
  // 查询数据库
  VideoViewModel.find({"videoId":req.params.id}).then(data=>{
    res.send({
      data:data.length
    })
  })
});

// 记录某个视频的播放量
router.post('/videoview/number/add', (req,res)=>{
  const {userId,videoId} = req.body // 从前端拿数据

   // 查看该用户之前是否已经点击过该视频
    VideoViewModel.find({"videoId":videoId,"userId":userId}).then(data=>{
      if(data.length == 0){
        // 没有观看过该视频:立即插入
        VideoViewModel.create({  
          userId,videoId
        }).then(data=>{
          res.send({
            ok:1
          })
        })
      }
  })
});

// 获取某个视频的收藏数
router.get('/user/collect/number/get/:id', (req,res)=>{
  // 查询数据库
  UserCollectModel.find({"videoId":req.params.id}).then(data=>{
    res.send({
      data:data.length
    })
  })
});

// 获取某个视频的点赞数
router.get('/user/good/number/get/:id', (req,res)=>{
  // 查询数据库
  UserGoodModel.find({"videoId":req.params.id}).then(data=>{
    res.send({
      data:data.length
    })
  })
});

// 查看用户是否点赞某个视频
router.post('/user/good/get', (req,res)=>{
  const {userId,videoId} = req.body // 从前端拿数据
  // 查询数据库
  UserGoodModel.find({"videoId":videoId,"userId":userId}).then(data=>{
    if(data.length > 0){
      res.send({
        ok:1
      })
    }else{
      res.send({
        ok:0
      })
    }
  })
});

// 点赞视频
router.post('/user/good/add', (req,res)=>{
  const {userId,videoId} = req.body // 从前端拿数据

   // (4) 获取当前时间
   var date = new Date();
   var year = date.getFullYear();
   var month = date.getMonth()+1;
   var day = date.getDate();
   var hour = date.getHours();
   var minute = date.getMinutes();
   var second = date.getSeconds();
   const videoGoodTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;

   // 实现点击第一次点赞，点击第二次取消点赞
   UserGoodModel.find({"videoId":videoId,"userId":userId}).then(data=>{
    if(data.length > 0){
      // 说明重复插入：立即删除
      UserGoodModel.deleteOne({"videoId":videoId,"userId":userId}).then(data=>{
        res.send({
          ok:1
        })
      })
    }else{
      // 没有重复插入:立即插入
      UserGoodModel.create({  
        userId,videoId,videoGoodTime
      }).then(data=>{
        res.send({
          ok:1
        })
      })
    }
  })
});

// 查看某个用户收藏的视频
router.post('/user/collect/get2', (req,res)=>{
  const {userId,videoId} = req.body // 从前端拿数据
  // 查询数据库
  UserCollectModel.find({"userId":userId}).then(data=>{
    res.send({
      data:data,
      ok:1
    })
  })
});

// 查看用户是否收藏某个视频
router.post('/user/collect/get', (req,res)=>{
  const {userId,videoId} = req.body // 从前端拿数据
  // 查询数据库
  UserCollectModel.find({"videoId":videoId,"userId":userId}).then(data=>{
    if(data.length > 0){
      res.send({
        ok:1
      })
    }else{
      res.send({
        ok:0
      })
    }
  })
});

// 收藏视频
router.post('/user/collect/add', (req,res)=>{
  const {userId,videoId,img,title,nickName} = req.body // 从前端拿数据
  // 获取当前的时间戳
  var collecttime = Date.now();
  // 存储数据
   // 实现点击第一次收藏，点击第二次取消收藏
   UserCollectModel.find({"videoId":videoId,"userId":userId}).then(data=>{
    if(data.length > 0){
      // 说明重复插入：立即删除
      UserCollectModel.deleteOne({"videoId":videoId,"userId":userId}).then(data=>{
        res.send({
          ok:1
        })
      })
    }else{
      // 没有重复插入:立即插入
      UserCollectModel.create({  
        userId,videoId,img,title,nickName,collecttime
      }).then(data=>{
        res.send({
          ok:1
        })
      })
    }
  })
});

// 删除历史数据
router.post('/watch/history/del', (req,res)=>{
  const {userId,videoId} = req.body
  // console.log(userId,videoId)
  UserWatchHistoryModel.deleteOne({"videoId":videoId,"userId":userId}).then(data=>{
    res.send({
      data:data,
      ok:1
    })
  })
});

// 删除所有的历史数据
router.get('/del/history/all/:id', (req,res)=>{
  UserWatchHistoryModel.find({"userId":req.params.id},["img","title","nickName","videoId","watchtime","userId","classify"]).then(data=>{
    for(i=0; i<data.length; i++){
        UserWatchHistoryModel.deleteOne({"userId":req.params.id}).then(data=>{
  
        })
    }
    res.send({
      ok:1
    })
  })
});

// 获取用户的观看历史
router.get('/watch/history/get/:id', (req,res)=>{
  UserWatchHistoryModel.find({"userId":req.params.id},["img","title","nickName","videoId","watchtime","userId","classify"]).then(data=>{
    res.send({
      data:data,
      ok:1
    })
  })
});

// 存储观看历史
router.post('/watch/history/add', (req,res)=>{
  const {userId,videoId,img,title,nickName,classify} = req.body // 从前端拿数据
  // 获取当前的时间戳
  var watchtime = Date.now();
  // 如果重复插入该怎么办？
  UserWatchHistoryModel.find({"videoId":videoId,"userId":userId}).then(data=>{
    if(data.length > 0){
      // 说明重复插入：修改一下历史观看时间即可
      UserWatchHistoryModel.updateOne({"videoId":videoId,"userId":userId},{
        watchtime
      }).then(data=>{
        res.send({
          ok:1
        })
      })
    }else{
      // 没有重复插入
      UserWatchHistoryModel.create({  
        userId,videoId,img,title,nickName,watchtime,classify
      }).then(data=>{
        res.send({
          ok:1
        })
      })
    }
  })
});

// videoPlay页面获取视频评论
router.get('/videoCom/get/:id', (req,res)=>{
  VideoCommentsModel.find({"videoId":req.params.id},{}).then(data=>{
    res.send({
      data:data,
      ok:1
    })
  })
});

// 存储视频评论
router.post('/videoCom/add', (req,res)=>{
  const {userId,comment,time,videoId} = req.body
  // 获取其他数据
  UserInfoModel.find({"userId":userId},[]).then(data=>{
    // console.log(data.length)
    if(data.length === 0){
      res.send({
        ok:0
      })
    }else{
      const nickName = data[0].nickName
      UserModel.find({_id:userId},["avatar"]).then(data=>{
        const avatar = data[0].avatar
        VideoCommentsModel.create({  
          userId,comment,time,videoId,nickName,avatar
        }).then(data=>{
          res.send({
            ok:1
          })
        })
      })
    }
  })
});

// videoPlay页面获取数据-获取视频发布者的信息
router.post('/get/userInfo', (req,res)=>{
  const userId = req.body.userId
  // console.log(req.body)
  UserInfoModel.find({"userId":userId},["label"]).then(data=>{
    res.send({
      data:data,
      ok:1
    })
  })
});

// videoPlay页面获取数据
router.get('/videoPlay/get/:id', (req,res)=>{
  // console.log(req.params.id)
  VideoInfoModel.find({"videoId":req.params.id},["title","time","video","nickName","userId","img","classify"]).then(data=>{
    res.send({
      data:data,
      ok:1
    })
  })
});

// home页面 “前方高能”获取数据
router.get('/video/get', (req,res)=>{
  const {page,limit} = req.query
  // console.log(req.query)
  // console.log(page,limit)
  VideoInfoModel.find({},["videoId","img","title","time","nickName","classify"]).skip((page-1)*limit).limit(limit).then(data=>{
    res.send({
      data:data,
      ok:1
    })
  })
});

router.get('/video/get2', (req,res)=>{
  VideoInfoModel.find({},["videoId","img","title","time","nickName","classify"]).then(data=>{
    res.send({
      data:data,
      ok:1
    })
  })
});

// 向VideoInfoModel中插入数据（视频上传）
router.post('/video/add',videoUpload.fields([{ name: 'img', maxCount: 1 }, { name: 'video', maxCount: 1 }]), (req,res)=>{
  const {title,userId,classify,nickName} = req.body 
  const img = `/uploads/video/${req.files.img[0].filename}` 
  const video = `/uploads/video/${req.files.video[0].filename}`
  // 获取当前时间
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  const time = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;

  VideoAuditModel.create({  
    img,title,userId,time,video,classify,nickName
  }).then(data=>{
    res.send({
      ok:"视频上传成功"
    })
  })
});

//获取到users表的avatar
router.get('/getFace/:id', (req,res)=>{
  UserModel.find({_id:req.params.id},["avatar"]).then(data=>{
    res.send({
      data:data,
      ok:1
    })
  })
});

// 修改头像
router.post('/changeavatar',faceUpload.single("avatar"),(req,res)=>{
  const avatar = req.file ? `/uploads/face/${req.file.filename}` : `images/default.gif` // 不传头像也不会报错
  UserModel.updateOne({_id:req.body.testname},{ 
    avatar // 数据库数据
  }).then(data=>{
    res.send({
      ok:"头像更换成功"
    })
  })
})

// 获取用户个人信息
// upload.single("avatar")表示接收这个文件，并把这个文件接收到'public/uploads/'文件夹下
router.get('/info/get/:id', (req,res)=>{
  // 查询数据库
  UserInfoModel.find({userId:req.params.id},["nickName","label","time","genderText"]).then(data=>{
    res.send({
      data:data,
      ok:1
    })
  })
});

// 用户个人信息
// upload.single("avatar")表示接收这个文件，并把这个文件接收到'public/uploads/'文件夹下
router.post('/info/add/:id', (req,res)=>{
  const {nickName,label,time,genderText} = req.body // 从前端拿数据
  const userId = req.params.id
  // console.log(userId,nickName,label,time,genderText)
  // 先查询数据库
  UserInfoModel.find({userId:userId},["nickName","label","time","genderText"]).then(data=>{
    console.log(data)
    if(data.length == 0){
      // 没有则增加
      UserInfoModel.create({  
        userId,nickName,label,time,genderText // 数据库数据
      }).then(data=>{
      console.log(222)
        res.send({
          ok:1
        })
      })
    }else{
      // 之前已经设置过个人信息，则修改即可
      UserInfoModel.updateOne({userId:userId},{  
        userId,nickName,label,time,genderText // 数据库数据
      }).then(data=>{
      console.log(111)
        res.send({
          ok:1
        })
      })
    }
  })
});

// 1. 用户注册事件
// upload.single("avatar")表示接收这个文件，并把这个文件接收到'public/uploads/'文件夹下
router.post("/user/add", (req,res)=>{
  const {username,password} = req.body // 从前端拿数据
  const avatar = 'images/default.jpg' // 默认头像
  const role = '1'
  // 获取当前时间
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  const regtime = year+'-'+month+'-'+day;
  UserModel.find({"username":username},[]).then(data=>{
    if(data.length > 0){
      res.send({
        ok:2
      })
    }else{
      // 插入数据库
      UserModel.create({  
        username,password,avatar,role,regtime // 数据库数据
      }).then(data=>{
        res.send({
        ok:1
       })
      })
    }
  })
});// 只有注册和更新用户才需要头像

// 2. 更新数据P343
router.post("/user/update/:id",(req,res)=>{
  const {username,password} = req.body // 从前端拿数据
  UserModel.updateOne({_id:req.params.id},{  // return返回 返回数据库数据
    username,password // 数据库数据
  }).then(data=>{
    res.send({
      ok:1
    })
  })
})

// 3. 删除数据
router.get('/user/delete/:id', (req,res)=>{
  UserModel.deleteOne({  // return返回 返回数据库数据
    _id:req.params.id // 数据库数据
  }).then(data=>{
    res.send({
      ok:1
    })
  })
});

// 4. 查询数据
router.get('/user/list', (req,res)=>{
  UserModel.find({},["username","avatar"]).then(data=>{
    res.send({
      ok:1
    })
  })
});

//5. 登录校验
router.post('/login', (req,res)=>{
  const {username,password} = req.body
  UserModel.find({"username":username,"password":password},["role"]).then(data=>{
    if(data.length == 0){
      res.send({ 
        ok:0
      });
    }else{
      if(data[0].role == 1){
        // 设置session对象
        req.session.user = data[0]
        res.send({ 
          ok:1,
          id:data[0]._id.toString()
        });
     }else{
       // 设置session对象
       req.session.user = data[0]
       res.send({
         ok:2,
         id:data[0]._id.toString()
       });
      }
    }
  })
});

// 6. 退出登录
router.get("/logout",(req,res)=>{
  //销毁session
  req.session.destroy(()=>{
    //销毁session成功，传出ok:1
    res.send({ok:1})
  })
})

module.exports = router;
