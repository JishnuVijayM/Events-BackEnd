const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    skill: {
        type: String,
        required: false
    },
    salaryRange: {
        type: String,
        required: false
    },
    employmentType: {
        type: String,
        required: false
    },
    experience: {
        type: String,
        required: false
    },
    eduLevel: {
        type: String,
        required: false
    },
    vacancy: {
        type: Number,
        required: false
    },
    deadline: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
