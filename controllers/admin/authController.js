const User = require('../../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

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

        existUser.lastLoginAt = new Date();
        await existUser.save();

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

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

        const templatePath = path.join(__dirname, '../../templates/email_template.html'); 
        let emailTemplate = fs.readFileSync(templatePath, 'utf8');

        emailTemplate = emailTemplate
            .replace('{{userName}}', user.userName || 'User') 
            .replace('{{resetLink}}', resetLink);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            html: emailTemplate,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                return res.status(451).json({ message: 'Error sending email', error: err });
            }
            return res.status(200).json({ message: 'Password reset link sent to your email' });
        });

    } catch (error) {
        console.error('Forgot Password Error:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
};


exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: "Password has been reset successfully" });

    } catch (error) {
        console.error('Reset Password Error: ', error);
        return res.status(500).json({ message: "Server error", error });
    }
};

