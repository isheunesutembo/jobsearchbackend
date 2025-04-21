const router=require('express').Router()
const resumeControllert=require('../controller/resumeController')
const {verifyTokenAndAuthorization}=require('../middleware/verifyToken')

router.post("/",verifyTokenAndAuthorization,resumeControllert.createResume)
router.get("/:id",verifyTokenAndAuthorization,resumeControllert.getUserResume)
router.patch("/:id",verifyTokenAndAuthorization,resumeControllert.updateResume)
router.delete("/:id",verifyTokenAndAuthorization,resumeControllert.deleteResume)

module.exports = router;