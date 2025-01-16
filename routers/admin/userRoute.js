const express = require('express')
const { getAllUsers } = require('../../controllers/admin/userController')

const router = express.Router()

router.route('/getUsers').get(getAllUsers)

module.exports = router