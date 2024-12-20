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
        enum: ['superAdmin','admin', 'user', 'moderator'],
    },
    country: {
        type: String,
        required: false, 
    },
    gender: {
        type: String,
        required: false,
        enum: ['male', 'female', 'other']
    },
    dateOfBirth: {
        type: Date,
        required: false,
    },
    phone: {
        type: String,
        required: false,
        validate: {
            validator: function (v) {
                return /\d{10,15}/.test(v); 
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
