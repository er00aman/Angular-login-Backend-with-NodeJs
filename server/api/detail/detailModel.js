const mongoose = require('mongoose')

const detailSchema = mongoose.Schema({
    name:{type:String,default:null},
    phone:{type:String,default:null},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()}
})

module.exports = new mongoose.model("studentPhone",detailSchema)