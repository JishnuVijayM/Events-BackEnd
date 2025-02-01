const express = require('express')
const { createJob, getAllJobs, viewJob, updateJob, deleteJob } = require('../../controllers/admin/jobController')
const { authenticateJWT } = require('../../middleware/jwtVerification')

const router = express.Router()

router.post('/createJob', authenticateJWT, createJob)
router.get('/getJobs',authenticateJWT,getAllJobs)
router.get('/viewJob/:id', authenticateJWT,viewJob)
router.put('/updateJob/:id', authenticateJWT,updateJob)
router.delete('/deleteJob/:id',authenticateJWT,deleteJob)

module.exports = router