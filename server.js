const express = require('express')
const { connectDb } = require('./utilis/db')
require('dotenv').config()
const cors = require('cors');
const path = require('path');


const adminAuthRouter = require('./routers/admin/authRoute')
const adminRoleRoutes = require('./routers/admin/roleRoute')
const adminUserRoutes = require('./routers/admin/userRoute')

const app = express()
app.use(express.json())
app.use(cors());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/adminAuth', adminAuthRouter)
app.use('/role', adminRoleRoutes)
app.use('/user', adminUserRoutes)


const PORT = process.env.PORT || 4000

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    })
})