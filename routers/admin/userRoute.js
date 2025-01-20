const express = require('express')
const { getAllUsers, createUser, deleteUser, viewUser } = require('../../controllers/admin/userController');
const upload = require('../../confiq/multerConfig');
const { authenticateJWT } = require('../../middleware/jwtVerification');

const router = express.Router()

router.route('/getUsers').get(getAllUsers)
router.post('/createUser', upload.single('profilePicture'),authenticateJWT, createUser);
router.route('/deleteUser/:id').delete(authenticateJWT, deleteUser)
router.route('/viewUser/:id').get(viewUser)


// router.post('/createChild', upload.single('bannerPicture'), createChild);

module.exports = router