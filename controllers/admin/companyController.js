const bcrypt = require('bcrypt');
const fs = require('fs');
const Company = require('../../models/companyModel')

exports.createCompany = async (req, res) => {
    try {

        // companyName: '',
        // industry: '',
        // companyAddress: '',
        // country: '',
        // state: '',
        // city: '',
        // email: '',
        // phone: '',
        // password: '',
        // confirmPassword: '',
        // jobPosition: '',
        // vacancy: '',
        // eventName: '',
        // companyLogo: null,


        const { companyName, industry, companyAddress,  country, state, city, email, phone, password, jobPosition, vacancy, eventName } = req.body;
        const companyLogo = req.file ? req.file.path : null;
        // const userId = req.user.userId;

        if (!companyName || !industry || !companyAddress || !country || !state || !city || !email || !phone || !password || !jobPosition || !vacancy || !eventName) {
            if (companyLogo) fs.unlinkSync(companyLogo);
            return res.status(400).json({ message: "Missing fields" });
        }

        if (!companyLogo) {
            return res.status(400).json({ message: "Please provide company profile" });
        }

        const existingCompany = await Company.findOne({ email });

        if (existingCompany) {
            if (companyLogo) fs.unlinkSync(companyLogo);
            return res.status(400).json({ message: "Coompany with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newCompany = new Company({
            companyName,
            industry,
            companyAddress,
            country,
            state,
            city,
            email,
            phone,
            password : hashedPassword,
            jobPosition,
            vacancy,
            eventName,
            companyLogo,
        });

        await newCompany.save();

        res.status(201).json({ message: "Company created successfully" });

    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({
            message: "An error occurred while creating the company",
            error: error.message,
        });
    }
};