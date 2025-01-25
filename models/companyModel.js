const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    industry: {
        type: String,
        required: true,
    },      
    companyAddress: {
        type: String,
        required: true,
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
    },
    jobPosition: {
        type: String,
    },
    vacancy: {
        type: String,
    },
    eventName: {
        type: String,
    },
    companyLogo: {
        type: String,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Company', companySchema);
