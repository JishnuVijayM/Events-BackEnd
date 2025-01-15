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


exports.getAllRoles = async (req, res) => {
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

exports.getRole = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id not found' })
        }

        const roleDetail = await Role.findById(id)

        if (!roleDetail) {
            return res.status(404).json({ message: "No roles found" });
        }

        return res.status(200).json(roleDetail)

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching the role",
            error: error.message
        });
    }
}

exports.deleteRole = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id not found' });
        }

        const roleList = await Role.findById(id);

        if (!roleList) {
            return res.status(404).json({ message: 'No roles found' });
        }

        await roleList.deleteOne();
        res.status(200).json({ message: 'Role deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

exports.editRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, permissions } = req.body;

        console.log("id",id);

        console.log('data',req.body);
        
        

        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        if (!name || !description || !permissions) {
            return res.status(400).json({ message: "Name, description, and permissions are required" });
        }

        const updatedItem = await Role.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        return res.status(201).json({
            message: 'Role updated successfully'
        });

    } catch (error) {
        console.error('Error updating role:', error);
        return res.status(500).json({
            message: 'An error occurred while updating the role',
            error: error.message,
        });
    }
};

