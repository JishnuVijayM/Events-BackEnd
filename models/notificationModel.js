const mongoose = require('mongoose');

const notificationShema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String,
        },
        event: {
            type: String,
            required: true,
        },
        target: {
            type: String,
            required: false,
        },
        content: {
            type: String,
            required: true,
        },
        dateAndTime: {
            type: Date,
            required: true,
        },
        channel: {
            type: String,
            required: false,
        },
        expDate: {
            type: Date,
        },
        updatedBy: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('notification', notificationShema);