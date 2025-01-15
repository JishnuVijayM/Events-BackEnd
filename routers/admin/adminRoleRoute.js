const express = require('express')
const { createRole, getAllRoles, getRole, deleteRole } = require('../../controllers/admin/roleManagement')
const { authenticateJWT } = require('../../middleware/authJwt')
const router = express.Router()

router.route('/createRole').post(createRole)
router.route('/getRoles').get(authenticateJWT, getAllRoles)
router.route('/getRole/:id').get(authenticateJWT, getRole)
router.route('/deleteRole/:id').delete(authenticateJWT, deleteRole)

module.exports = router