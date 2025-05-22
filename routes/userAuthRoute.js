const router=require('express').Router()
const userAuthController=require('../controller/userAuthController')
const { loginLimiter } = require('../middleware/rate_limit')
router.post("/registerUser",loginLimiter,userAuthController.createUser)
router.post('/logInUser',loginLimiter,userAuthController.logInUser)

module.exports =router