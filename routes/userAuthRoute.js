const router=require('express').Router()
const userAuthController=require('../controller/userAuthController')
const { logInLimiter } = require('../middleware/ratelimiting')



router.post("/registerUser",logInLimiter,userAuthController.createUser)
router.post('/logInUser',logInLimiter,userAuthController.logInUser)

module.exports =router