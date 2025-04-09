const router=require('express').Router()
const {Router}=require("express")
const vacancyController=require('../controller/vacancyController')


router.post("/",vacancyController.createVacancy)
router.get("/",vacancyController.getAllVacancies)
router.get("/:id",vacancyController.getVacanciesById)
router.get("/search",vacancyController.searchVacancy)
router.get("filter",vacancyController.filterVacancy)
router.get("/vacancyBycategory/:id",vacancyController.getVacancyByCategory)

module.exports=router;