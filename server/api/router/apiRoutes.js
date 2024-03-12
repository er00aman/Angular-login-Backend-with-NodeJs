const router = require('express').Router()
const registerController = require('../register/registerController')
const detailController = require("../detail/detailController")

router.post('/register',registerController.registerController)
router.post('/loginController',registerController.loginController)
router.post('/getAll',registerController.getAll)
router.post('/getSingle',registerController.getSingle)
router.post('/updateRegister',registerController.updateRegister)

router.post('/detail',detailController.storeDetail)

module.exports = router