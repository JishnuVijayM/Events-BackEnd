const express = require("express");
const router = express.Router();
const { login, register, initial,  forgotPassword, resetPassword } = require("../../controllers/admin/adminAuth");
const { authenticateJWT } = require("../../middleware/authJwt");

router.route('/').get(authenticateJWT, initial);
router.route('/register').post(register)
router.route('/login').post(login)

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);


module.exports = router;