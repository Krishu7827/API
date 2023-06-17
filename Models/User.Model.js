let mongoose = require('mongoose')


let userschema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,default:"User"}
})

let UserModel = mongoose.model('user',userschema)

module.exports = {UserModel}