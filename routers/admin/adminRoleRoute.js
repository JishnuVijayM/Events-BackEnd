const express = require('express')
const { createRole, getRoles } = require('../../controllers/admin/roleManagement')
const { authenticateJWT } = require('../../middleware/authJwt')
const router = express.Router()

router.route('/createRole').post(authenticateJWT, createRole)
router.route('/getRole').get(authenticateJWT, getRoles)


module.exports = router