const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },      
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    role: {
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
    phone: {
        type: String,
    },
    lastLoginAt: {
        type: Date,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpire: {
        type: Date,
    },
    profilePicture: {
        type: String,
    },
    updatedBy: {
        type: String,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
