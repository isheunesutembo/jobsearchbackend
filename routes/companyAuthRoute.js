const router=require('express').Router()
const companyAuthController=require('../controller/companyAuthController')
const { loginLimiter } = require('../middleware/rate_limit')
router.post("/registerCompany",loginLimiter,companyAuthController.createCompany)
router.post('/logInCompany',loginLimiter,companyAuthController.logInCompany)

module.exports =router