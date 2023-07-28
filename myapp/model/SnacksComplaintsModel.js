const mongoose = require("mongoose")
const Schema = mongoose.Schema

//限制模型内只能存 username、password 这两个字段
const UserType = {
    userId:String, // 这条评论的发布者
    snacksId:String,
    questionsText:String
}

//利用mongoose创建一个叫user的模型
//模型user 将会对应users 集合（它会自动加s）
//通过Schema限制user的字段
const SnacksComplaintsModel = mongoose.model("snackscomplaint",new mongoose.Schema(UserType))

module.exports = SnacksComplaintsModel