const express = require("express");
const router = express.Router();
const { login, register, initial } = require("../../controllers/admin/adminAuth");

router.route('/').get(initial);
router.route('/register').post(register)
router.route('/login').post(login)


module.exports = router;
