const express = require('express')
const { connectDb } = require('./utilis/db')
require('dotenv').config()
const cors = require('cors');
const path = require('path');


const adminAuthRouter = require('./routers/admin/authRoute')
const adminRoleRoutes = require('./routers/admin/roleRoute')
const adminUserRoutes = require('./routers/admin/userRoute')
const companyRoutes = require('./routers/admin/companyRoute')
const jobRoutes = require('./routers/admin/jobRoute')


const app = express()
app.use(express.json())
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/adminAuth', adminAuthRouter)
app.use('/role', adminRoleRoutes)
app.use('/user', adminUserRoutes)
app.use('/company', companyRoutes)
app.use('/job', jobRoutes)

const PORT = process.env.PORT || 4000

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    })
})