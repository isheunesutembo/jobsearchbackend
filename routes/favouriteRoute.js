const router=require('express').Router()
const favoriteController=require('../controller/favouriteController')
router.post("/",favoriteController.addJobVacancyToFavourite)
router.get('/:id',favoriteController.getFavourites)
router.delete('/:id',favoriteController.deleteFavourite)

module.exports =router