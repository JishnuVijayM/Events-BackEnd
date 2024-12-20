const mongoose = require('mongoose')
require('dotenv').config()

const URI = process.env.DB_URI

exports.connectDb = async () => {
    try {
        await mongoose.connect(URI)
        console.log("Connect to DB");
    } catch (error) {
        console.log("Db error",error);
    }
}