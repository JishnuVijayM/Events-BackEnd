const express = require('express')
const { createRole, getAllRoles, getRole, deleteRole, editRole } = require('../../controllers/admin/roleController')
const { authenticateJWT } = require('../../middleware/jwtVerification')
const router = express.Router()

router.route('/createRole').post(createRole)
router.route('/getRoles').get(authenticateJWT, getAllRoles)
router.route('/getRole/:id').get(authenticateJWT, getRole)
router.route('/deleteRole/:id').delete(authenticateJWT, deleteRole)
router.route('/editRole/:id').put(authenticateJWT, editRole)

module.exports = router