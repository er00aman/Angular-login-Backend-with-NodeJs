const mongoose = require('mongoose')

const registerSchema = mongoose.Schema({
    name:{type:String,default:null},
    email:{type:String,default:null},
    password:{type:String,default:null},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()}
})

module.exports  = new mongoose.model("register",registerSchema)