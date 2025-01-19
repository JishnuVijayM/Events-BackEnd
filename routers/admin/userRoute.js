const express = require('express')
const { getAllUsers, createUser } = require('../../controllers/admin/userController');
const upload = require('../../confiq/multerConfig');

const router = express.Router()

router.route('/getUsers').get(getAllUsers)

router.post('/createUser', upload.single('profilePicture'), createUser);
// router.post('/createChild', upload.single('bannerPicture'), createChild);

module.exports = router