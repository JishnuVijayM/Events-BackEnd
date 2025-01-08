const express = require('express')
const { createRole, getAllRoles, getRole } = require('../../controllers/admin/roleManagement')
const { authenticateJWT } = require('../../middleware/authJwt')
const router = express.Router()

router.route('/createRole').post(createRole)
router.route('/getRoles').get(authenticateJWT, getAllRoles)
router.route('/getRole/:id').get(authenticateJWT, getRole)


module.exports = router