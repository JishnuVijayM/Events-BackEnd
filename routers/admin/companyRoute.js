const express = require('express')
const { authenticateJWT } = require('../../middleware/jwtVerification')
const { createCompany, getAllCompany, viewCompany, deleteCompany, updateCompany } = require('../../controllers/admin/companyController')
const uploadConfig = require('../../confiq/multerConfig');

const router = express.Router()

router.post('/createCompany', uploadConfig.single('companyLogo'),authenticateJWT, createCompany);
router.get('/getCompanies',authenticateJWT, getAllCompany)
router.get('/viewCompany/:id',authenticateJWT, viewCompany)
router.route('/deleteCompany/:id').delete(authenticateJWT, deleteCompany)
router.put('/updateCompany/:id', uploadConfig.single('companyLogo'), authenticateJWT, updateCompany);

module.exports = router