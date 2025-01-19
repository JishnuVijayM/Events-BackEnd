const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

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



exports.createUser = async (req, res) => {
    try {
        const { userName, email, password, role, country, state, district, phone } = req.body;
        const profilePicture = req.file ? req.file.path : null;

        if (!userName || !email || !password || !role || !country || !state || !district || !phone) {
            if (profilePicture) fs.unlinkSync(profilePicture); 
            return res.status(400).json({ message: "Missing fields" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            if (profilePicture) fs.unlinkSync(profilePicture); 
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            role,
            country,
            state,
            district,
            phone,
            profilePicture,
        });

        await newUser.save();

        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({
            message: "An error occurred while creating the user",
            error: error.message,
        });
    }
};

