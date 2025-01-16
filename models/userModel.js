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
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    dateOfBirth: {
        type: Date,
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{10,12}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    lastLoginAt: {
        type: Date,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpire: {
        type: Date,
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('User', userSchema);
