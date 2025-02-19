const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    event: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    expertise: {
        type: String,
        required: false
    },
    experience: {
        type: String,
        required: false
    },
    regDate: {
        type: Date,
    },
    status: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    linkedIn: {
        type: String,
        required: false
    },
    resume: {
        type: String,
        required: false
    }
});

const EventUser = mongoose.model('event-user', studentSchema);

module.exports = EventUser;
