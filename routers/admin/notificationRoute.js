const express = require('express')
const { authenticateJWT } = require('../../middleware/jwtVerification')
const { createNotify, getAllNotify, viewNotify, deleteNotify } = require('../../controllers/admin/notificationController');

const router = express.Router()

router.post('/createNotify', authenticateJWT, createNotify);
router.get('/getAllNotify', authenticateJWT, getAllNotify)
router.get('/viewNotify/:id', authenticateJWT, viewNotify)
// router.put('/updateFaq/:id', authenticateJWT, updateFaq)
router.delete('/deleteNotify/:id', authenticateJWT, deleteNotify)


module.exports = router