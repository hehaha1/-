const mongoose = require("mongoose")
const Schema = mongoose.Schema

//限制模型内只能存 userId,nickName,label,time,genderText这几个字段
const UserType = {
    userId:String,
    comment:String,
    time:String,
    videoId:String,
    nickName:String,
    avatar:String
}

//利用mongoose创建一个叫userInfo的模型
//模型user 将会对应users 集合（它会自动加s）
//通过Schema限制user的字段
const VideoCommentsModel = mongoose.model("videocomment",new mongoose.Schema(UserType))

module.exports = VideoCommentsModel