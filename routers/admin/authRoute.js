const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../../middleware/jwtVerification");
const { initial, register, login, forgotPassword, resetPassword } = require("../../controllers/admin/authController");

router.route('/').get(authenticateJWT, initial);
router.route('/register').post(register)
router.route('/login').post(login)

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);


module.exports = router;