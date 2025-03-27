const router=require('express').Router()
const userAuthController=require('../controller/userAuthController')
router.post("/registerUser",userAuthController.createUser)
router.post('/logInUser',userAuthController.logInUser)

module.exports =router