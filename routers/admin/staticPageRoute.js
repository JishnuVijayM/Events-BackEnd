const express = require('express')
const { authenticateJWT } = require('../../middleware/jwtVerification')
const { createPage, viewPage, getAllPages, updatePage, deletePage } = require('../../controllers/admin/staticPageController');

const router = express.Router()

router.post('/createPage', authenticateJWT, createPage);
router.get('/getPages', authenticateJWT, getAllPages)
router.get('/viewPage/:id', authenticateJWT, viewPage)
router.put('/updatePage/:id', authenticateJWT, updatePage)
router.delete('/deletePage/:id', authenticateJWT, deletePage)


module.exports = router