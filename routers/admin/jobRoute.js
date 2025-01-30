const express = require('express')
const { createJob } = require('../../controllers/admin/jobController')

const router = express.Router()

router.post('/createJob', createJob)

module.exports = router