const User = require('../../models/userModel')
const Role = require('../../models/roleModel');


exports.getAllUsers = async (req, res) => {
    try {
        const userList = await User.find();

        if (!userList.length) {
            return res.status(404).json({ message: "No users found" });
        }

        const roleList = await Role.find();

        const updatedData = userList.map((item, index) => {

            const roleData = roleList.find((role) => role._id.toString() === item.role.toString());
        
            return {
                id: item._id,
                no: index + 1,
                name: item.userName,
                role: roleData ? roleData.name : 'Unknown',
                mobile: item.phone,
                email: item.email,
                'updated-by': 'Dev',
                'last-login': new Date(item.lastLoginAt).toLocaleString() || null,
                'last-updated': new Date(item.updatedAt).toLocaleString()
            };
        });
        


        return res.status(200).json(updatedData);

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching the user",
            error: error.message
        });
    }
};