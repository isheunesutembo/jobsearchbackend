const router=require('express').Router()
const companyAuthController=require('../controller/companyAuthController')
const { logInLimiter } = require('../middleware/ratelimiting')


router.post("/registerCompany",logInLimiter,companyAuthController.createCompany)
router.post('/logInCompany',logInLimiter,companyAuthController.logInCompany)

module.exports =router