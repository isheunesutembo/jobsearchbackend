const router = require('express').Router();
const { getCompanyById, updateCompany, deleteCompany } = require('../controller/companyController');
const { verifyTokenAndAuthorization } = require('../middleware/verifyToken');


router.get('/:id', verifyTokenAndAuthorization, getCompanyById);
router.patch('/:id', verifyTokenAndAuthorization, updateCompany);
router.delete('/:id', verifyTokenAndAuthorization, deleteCompany);
module.exports = router;