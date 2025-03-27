const router=require('express').Router()
const companyAuthController=require('../controller/companyAuthController')
router.post("/registerCompany",companyAuthController.createCompany)
router.post('/logInCompany',companyAuthController.logInCompany)

module.exports =router