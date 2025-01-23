const express = require('express')
const { getAllUsers, createUser, deleteUser, viewUser, updateUser } = require('../../controllers/admin/userController');
const uploadConfig = require('../../confiq/multerConfig');
const { authenticateJWT } = require('../../middleware/jwtVerification');

const router = express.Router()

router.route('/getUsers').get(getAllUsers)
router.post('/createUser', uploadConfig.single('profilePicture'), authenticateJWT, createUser);
router.route('/deleteUser/:id').delete(authenticateJWT, deleteUser)
router.route('/viewUser/:id').get(viewUser)
router.put('/updateUser/:id', uploadConfig.single('profilePicture'), updateUser);

// Example of handling child banner uploads
// router.post('/createChild', uploadConfig.single('bannerPicture'), authenticateJWT, createChild);

module.exports = router