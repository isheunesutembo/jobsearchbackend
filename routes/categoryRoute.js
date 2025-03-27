
const router=require('express').Router()
const categoryController=require('../controller/categoryController')
router.post("/",categoryController.createCategory)
router.get('/',categoryController.getAllCategories)
router.delete('/:id',categoryController.deleteCategory)

module.exports =router