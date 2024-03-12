const register = require('../register/registerModel')
const bcrypt = require('bcrypt')
const salt = 10

function registerController(req,res){
    let data = req.body
    validation = []

    if(!data.name)
    validation.push('Name')

    if(!data.email)
    validation.push('Email')

    if(!data.password)
    validation.push('Password')

    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation.join(',') + ' is/are required'
        })
    }else{
        register.findOne({email:data.email}).then(registerFindObj=>{
            if(!!registerFindObj){
                res.json({
                    success:false,
                    status:400,
                    message:'User already registered'
                })
            }else{
                let obj = new register()

                obj.name = data.name
                obj.email = data.email
                obj.password = bcrypt.hashSync(data.password,salt)

                obj.save().then(registerSaveObj=>{
                    res.json({
                        success:true,
                        status:200,
                        message:'User registered',
                        data:registerSaveObj
                    })
                }).catch(err=>{
                    res.json({
                        success:false,
                        status:500,
                        message:'error'+err
                    })
                })
            }
        }).catch(err=>{
            res.json({
                success:false,
                status:500,
                message:'error'+err
            })
        })
    }
}

function loginController(req,res){
    let data = req.body
    validation = []

    if(!data.email)
    validation.push('Email')

    if(!data.password)
    validation.push('Password')

    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation.join(',')+ ' is/are required'
        })
    }else{
        register.findOne({email:data.email}).then(obj2=>{
            if(!obj2){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found!'
                })
            }else{
                bcrypt.compare(data.password,obj2.password,(err,data)=>{
                    if(!data){
                        res.json({
                            success:false,
                            status:500,
                            message:'Invalid password'
                        })
                    }else{
                        res.json({
                            success:true,
                            status:200,
                            message:'Login successfully'
                        })
                    }
                })
            }
        }).catch(err=>{
            res.json({
                success:false,
                status:400,
                message:'error'+err
            })
        })
    }
}

function getAll(req,res){
    register.find().then(findObj=>{
        res.json({
            success:true,
            status:200,
            message:'Data loaded successfully',
            data:findObj
        })
    }).catch(err=>{
        res.json({
            success:false,
            status:404,
            message:'Not found!'
        })
    })
}

function getSingle(req,res){
    let data = req.body
    validation = []

    if(!data._id)
    validation.push('_id')

    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation.join(',')+' is required'
        })
    }else{
        register.findOne({_id:data._id}).then(findObj=>{
            if(!findObj){
                res.json({
                    success:false,
                    status:404,
                    message:'User not found!'
                })
            }else{
                res.json({
                    success:true,
                    status:200,
                    message:'Data loaded',
                    data:findObj
                })
            }
        }).catch(err=>{
            res.json({
                success:false,
                status:400,
                message:'error'+err
            })
        })
    }
}

function updateRegister(req,res){
    let data = req.body
    validation = []

    if(!data._id)
    validation.push('_id')

    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation + 'is required'
        })
    }else{
        register.findOne({_id:data._id}).then(updateFindObj=>{
            if(!updateFindObj){
                res.json({
                    success:false,
                    status:404,
                    message:'Not found!'
                })
            }else{
                if(data.name)
                updateFindObj.name = data.name

                if(data.email)
                updateFindObj.email = data.email

                updateFindObj.save().then(updateSaveObj=>{
                    res.json({
                        success:true,
                        status:200,
                        message:'User update successfully',
                        data:updateSaveObj
                    })
                }).catch(err=>{
                    res.json({
                        success:false,
                        status:400,
                        message:'error'+err
                    })
                })

            }
        }).catch(err=>{
            res.json({
                success:false,
                status:500,
                message:'error'+err
            })
        })
    }
}

module.exports = {
    registerController,
    loginController,
    getAll,
    getSingle,
    updateRegister
}