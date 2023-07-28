const mongoose = require("mongoose")
const Schema = mongoose.Schema

//限制模型内只能存 username、password 这两个字段
const UserType = {
    userId:String,
    videoId:String,
    img:String,
    title:String,
    nickName:String,
    watchtime:String,
    classify:String
}

//利用mongoose创建一个叫user的模型
//模型user 将会对应users 集合（它会自动加s）
//通过Schema限制user的字段
const UserWatchHistoryModel = mongoose.model("userwatchhistory",new mongoose.Schema(UserType))

module.exports = UserWatchHistoryModel