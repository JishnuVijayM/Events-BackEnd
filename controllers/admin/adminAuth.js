const User = require('../../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.initial = async (req, res) => {

    const users = await User.find({});

    if (!users) {
        return res.status(404).json({ message: "No user found" });
    }

    return res.status(200).json(users);
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existUser = await User.findOne({ email });
        if (!existUser) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (!existUser.password) {
            return res.status(500).json({ message: "Password is missing in the database" });
        }

        const isPasswordValid = await bcrypt.compare(password, existUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: existUser._id, role: existUser.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            role: existUser.role,
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


exports.register = async (req, res) => {
    try {
        const { userName, password, email, role, country, gender, dateOfBirth, phone } = req.body;

        if (!userName || !password || !email || !role || !country || !gender || !dateOfBirth || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "Email already in use" });
        }

        const saltRounds = parseInt(process.env.SALT) || 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await User.create({
            userName,
            email,
            password: hashedPassword,
            role,
            country,
            gender,
            dateOfBirth,
            phone
        });

        return res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error", error: error });
    }
};