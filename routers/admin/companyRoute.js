const express = require('express')
const { authenticateJWT } = require('../../middleware/jwtVerification')
const { createCompany, getAllCompany, viewCompany } = require('../../controllers/admin/companyController')
const uploadConfig = require('../../confiq/multerConfig');

const router = express.Router()

router.post('/createCompany', uploadConfig.single('companyLogo'), createCompany);
router.get('/getCompanies',authenticateJWT, getAllCompany)
router.get('/viewCompany/:id',authenticateJWT, viewCompany)


module.exports = router