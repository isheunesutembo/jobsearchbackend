const router = require('express').Router();
const { getUserById, updateUser, deleteUser } = require('../controller/userController');
const { verifyTokenAndAuthorization } = require('../middleware/verifyToken');


router.get('/:id', verifyTokenAndAuthorization, getUserById);
router.patch('/:id', verifyTokenAndAuthorization, updateUser);
router.delete('/:id', verifyTokenAndAuthorization, deleteUser);
module.exports = router;