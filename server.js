const express = require('express')
const adminAuthRouter = require('./routers/admin/adminAuthRoute')
const { connectDb } = require('./utilis/db')
require('dotenv').config()

const app = express()
app.use(express.json())

app.use('/adminAuth', adminAuthRouter)


const PORT = process.env.PORT || 4000

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    })
})