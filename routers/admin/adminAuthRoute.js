const express = require("express");
const router = express.Router();
const { login, register, initial } = require("../../controllers/admin/adminAuth");
const { authenticateJWT } = require("../../middleware/authJwt");

router.route('/').get(authenticateJWT, initial);
router.route('/register').post(register)
router.route('/login').post(login)


module.exports = router;
