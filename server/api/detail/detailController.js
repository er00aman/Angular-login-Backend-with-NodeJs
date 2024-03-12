const detail = require('./detailModel')

function storeDetail(req,res){
    let data = req.body
    validation = []

    if(!data.name)
    validation.push('Name')

    if(!data.phone)
    validation.push('Phone')

    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation.join(',')+" is/are required"
        })
    }else{
        detail.findOne({phone:data.phone}).then(result=>{
            if(!!data.phone){
                res.json({
                    success:false,
                    status:500,
                    message:"User already registered"
                })
            }else{
                let obj = new detail()

                obj.name = data.name
                obj.phone = data.phone

                obj.save().then(saveObj=>{
                    res.json({
                        success:true,
                        status:200,
                        message:saveObj
                    })
                }).catch(err=>{
                    res.json({
                        success:false,
                        status:500,
                        message:"error"+err
                    })
                })
            }
        }).catch(err=>{
            res.json({
                success:false,
                status:400,
                message:"error"+err
            })
        })
    }
}

module.exports = {
    storeDetail
}