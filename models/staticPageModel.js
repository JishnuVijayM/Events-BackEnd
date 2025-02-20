const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        pageSlug: {
            type: String,
        },
        content: {
            type: String,
            required: true
        },
        keyword: {
            type: String
        },
        description: {
            type: String
        },
        updatedBy: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('static-page', PageSchema);
