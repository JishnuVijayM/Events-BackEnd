const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    module: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        required: false
    },
    add: {
        type: Boolean,
        required: false 
    },
    edit: {
        type: Boolean,
        required: false 
    },
    delete: {
        type: Boolean,
        required: false
    }
}, { _id: false });


const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true 
    },
    description: {
        type: String,
        required: true
    },
    permissions: {
        dashboard: [permissionSchema],
        administration: [permissionSchema],
        jobManagement: [permissionSchema],
        eventManagement: [permissionSchema],
        settings: [permissionSchema]
    }
}, { timestamps: true });

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;

