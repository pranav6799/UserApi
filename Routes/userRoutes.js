const express = require('express')
const router = express.Router()
const userController = require('../Controller/userController')
const authController = require('../Controller/authController')

router.post('/register',userController.createUser)

router.put('/updateUser/:id',authController.protect,authController.restrictTo('user'),userController.updateUser)

router.route('/:id')
.get(userController.getUser)
.post(userController.login)
.delete(authController.protect,authController.restrictTo('admin'),userController.deleteUser)



module.exports = router   