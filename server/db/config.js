const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/practice_login").then(()=>{
    console.log('Database connectivity is successfully established')
}).catch(err=>{
    console.log(err)
})