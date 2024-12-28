const express = require('express')
const { connectDb } = require('./utilis/db')
require('dotenv').config()
const cors = require('cors');

const adminAuthRouter = require('./routers/admin/adminAuthRoute')
const adminRoleRoutes = require('./routers/admin/adminRoleRoute')

const app = express()
app.use(express.json())
app.use(cors());

app.use('/adminAuth', adminAuthRouter)
app.use('/admin', adminRoleRoutes)


const PORT = process.env.PORT || 4000

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    })
})