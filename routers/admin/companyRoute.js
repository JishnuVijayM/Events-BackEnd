const express = require('express')
const { authenticateJWT } = require('../../middleware/jwtVerification')
const { createCompany } = require('../../controllers/admin/companyController')
const uploadConfig = require('../../confiq/multerConfig');

const router = express.Router()

router.post('/createCompany', uploadConfig.single('companyLogo'), createCompany);


module.exports = router