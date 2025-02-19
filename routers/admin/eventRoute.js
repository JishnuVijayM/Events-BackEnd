const express = require('express')
const { authenticateJWT } = require('../../middleware/jwtVerification')
const uploadConfig = require('../../confiq/multerConfig');
const { createEvent, viewAllEvents, deleteEvent, viewEvent, updateEvent, listEvent, createEventUser, viewAllEventUsers, deleteEventUser, viewEventUser, updateEventUser } = require('../../controllers/admin/eventController');

const router = express.Router()

router.post('/createEvent', uploadConfig.single('eventBanner'), authenticateJWT, createEvent);
router.get('/getEvents', authenticateJWT, viewAllEvents)
router.route('/deleteEvent/:id').delete(authenticateJWT, deleteEvent)
router.route('/viewEvent/:id').get(authenticateJWT, viewEvent)
router.put('/updateEvent/:id', uploadConfig.single('eventBanner'), authenticateJWT, updateEvent);
router.get('/getEventList', listEvent)

router.post('/createEventUser', uploadConfig.single('resume'),authenticateJWT, createEventUser);
router.get('/getEventUsers',authenticateJWT, viewAllEventUsers)
router.route('/deleteEventUser/:id').delete(authenticateJWT, deleteEventUser)
router.route('/viewEventUser/:id').get(authenticateJWT, viewEventUser)
router.put('/updateEventUser/:id', uploadConfig.single('resume'), authenticateJWT, updateEventUser);


module.exports = router;