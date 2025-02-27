const express = require('express')
const { authenticateJWT } = require('../../middleware/jwtVerification')
const { createFaq, getAllFaq, viewFaq, updateFaq, deleteFaq } = require('../../controllers/admin/faqController');

const router = express.Router()

router.post('/createFaq', authenticateJWT, createFaq);
router.get('/getAllFaq', authenticateJWT, getAllFaq)
router.get('/viewFaq/:id', authenticateJWT, viewFaq)
router.put('/updateFaq/:id', authenticateJWT, updateFaq)
router.delete('/deleteFaq/:id', authenticateJWT, deleteFaq)


module.exports = router