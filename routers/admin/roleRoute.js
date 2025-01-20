const express = require('express')
const { createRole, getAllRoles, getRole, deleteRole, editRole, viewRole } = require('../../controllers/admin/roleController')
const { authenticateJWT } = require('../../middleware/jwtVerification')
const router = express.Router()

router.route('/createRole').post(authenticateJWT, createRole)
router.route('/getAllRoles').get(authenticateJWT, getAllRoles)
router.route('/viewRole/:id').get(viewRole)
router.route('/deleteRole/:id').delete(authenticateJWT, deleteRole)
router.route('/editRole/:id').put(authenticateJWT, editRole)
router.route('/getRoles').get(getRole)

module.exports = router