const router=require("express").Router()
const upload=require("../middleware/resumeupload")
const resumeController=require("../controller/resumeController")
const {verifyTokenAndAuthorization,authenticateToken}=require('../middleware/verifyToken')


router.post("/",verifyTokenAndAuthorization,resumeController.uploadResume)
router.get("/:id",verifyTokenAndAuthorization,resumeController.getUserResume)
router.patch("/:id",verifyTokenAndAuthorization,resumeController.updateResume)
router.delete("/:id",verifyTokenAndAuthorization,resumeController.deleteResume)

module.exports=router;