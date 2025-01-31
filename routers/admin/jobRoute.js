const express = require('express')
const { createJob, getAllJobs } = require('../../controllers/admin/jobController')
const { authenticateJWT } = require('../../middleware/jwtVerification')

const router = express.Router()

router.post('/createJob', authenticateJWT, createJob)
router.get('/getJobs',getAllJobs)

module.exports = router