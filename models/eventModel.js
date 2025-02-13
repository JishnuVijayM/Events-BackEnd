const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    companies:{
        type: [String],
    },
    info: {
        type: String,
        trim: true
    },
    coordinator: {
        type: String,
        required: true,
        trim: true
    },
    agenda: {
        type: String,
        trim: true
    },
    participatingNo: {
        type: Number,
        default: 0
    },
    vacancy: {
        type: Number,
        required: false
    },
    status: {
        type: String,
    },
    eventBanner: {
        type: String,  
    }
}, {
    timestamps: true 
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;