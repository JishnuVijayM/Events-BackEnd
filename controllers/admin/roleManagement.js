const Role = require('../../models/roleModel');

exports.createRole = async (req, res) => {
    try {
        const { name, description, permissions } = req.body;

        if (!name || !description || !permissions) {
            return res.status(400).json({ message: "Name, description, and permissions are required" });
        }

        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res.status(400).json({ message: "Role with this name already exists" });
        }

        const newRole = new Role({
            name,
            description,
            permissions
        });

        await newRole.save();

        res.status(201).json({
            message: "Role created successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while creating the role",
            error: error.message
        });
    }
};


exports.getRoles = async (req, res) => {
    try {
        const roleList = await Role.find();

        if (!roleList.length) {
            return res.status(404).json({ message: "No roles found" });
        }

        return res.status(200).json(roleList);
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching the roles",
            error: error.message
        });
    }
};
