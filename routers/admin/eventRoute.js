const express = require('express')
const { authenticateJWT } = require('../../middleware/jwtVerification')
const uploadConfig = require('../../confiq/multerConfig');
const { createEvent, viewAllEvents, deleteEvent } = require('../../controllers/admin/eventController');

const router = express.Router()

router.post('/createEvent', uploadConfig.single('eventBanner'),authenticateJWT, createEvent);
router.get('/getEvents',authenticateJWT, viewAllEvents)
router.route('/deleteEvent/:id').delete(authenticateJWT, deleteEvent)

module.exports = router;