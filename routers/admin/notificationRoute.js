const express = require('express')
const { authenticateJWT } = require('../../middleware/jwtVerification')
const { createNotify, getAllNotify, viewNotify, deleteNotify, updateNotify } = require('../../controllers/admin/notificationController');

const router = express.Router()

router.post('/createNotify', authenticateJWT, createNotify);
router.get('/getAllNotify', authenticateJWT, getAllNotify)
router.get('/viewNotify/:id', authenticateJWT, viewNotify)
router.put('/updateNotify/:id', authenticateJWT, updateNotify)
router.delete('/deleteNotify/:id', authenticateJWT, deleteNotify)


module.exports = router