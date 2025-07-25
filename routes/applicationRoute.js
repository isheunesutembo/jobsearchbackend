const router=require('express').Router()
const applicationControllert=require('../controller/applicationController')
const { appLimiter } = require('../middleware/ratelimiting')
const {verifyTokenAndAuthorization}=require('../middleware/verifyToken')

router.post("/",appLimiter ,verifyTokenAndAuthorization,applicationControllert.createApplication)
router.get("/getapplicationByVacancyId/:id",verifyTokenAndAuthorization,applicationControllert.getApplicationByVacancyId)
router.get("/getapplicationByUserId/:id",verifyTokenAndAuthorization,applicationControllert.getApplicationByUserId)
router.get("/getapplicationByCompanyId/:id",verifyTokenAndAuthorization,applicationControllert.getApplicationByCompanyId)
router.delete("/:id",verifyTokenAndAuthorization,applicationControllert.deleteUserApplication)
router.patch("/:id",verifyTokenAndAuthorization,applicationControllert.updateApplicationStatus)

module.exports = router;