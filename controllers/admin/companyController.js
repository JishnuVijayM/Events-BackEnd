const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const Company = require('../../models/companyModel')

exports.createCompany = async (req, res) => {
    try {

        const { companyName, industry, companyAddress, country, state, city, email, phone, password, jobPosition, vacancy, eventName } = req.body;
        const companyLogo = req.file ? req.file.path : null;

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
            return res.status(400).json({ message: "Company with this email already exists" });
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
            password: hashedPassword,
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

exports.getAllCompany = async (req, res) => {
    try {
        const companyList = await Company.find();

        if (!companyList.length) {
            return res.status(404).json({ message: "No data found" });
        }


        const updatedData = companyList.map((item, index) => {

            return {
                id: item._id,
                no: index + 1,
                'company name': item.companyName,
                industry: item.industry,
                'recruitment event': item.eventName,
                'job position': item.jobPosition,
                'candidates applied': 'Unknown',
                'event date': new Date().toLocaleString(),
                status: 'Active'
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

exports.viewCompany = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id not found' })
        }

        const companyDetail = await Company.findById(id)

        if (!companyDetail) {
            return res.status(404).json({ message: "No company found" });
        }

        return res.status(200).json(companyDetail)

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching the company",
            error: error.message
        });
    }
}

exports.deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id not found' });
        }

        const companyList = await Company.findById(id);

        if (!companyList) {
            return res.status(404).json({ message: 'No Company found' });
        }

        if (companyList.companyLogo) {
            try {

                fs.unlinkSync(companyList.companyLogo);
                console.log('company logo deleted successfully');
            } catch (err) {
                console.error('Error deleting company logo:', err);
            }
        }

        await companyList.deleteOne();
        res.status(200).json({ message: 'Company deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

exports.updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const { companyName, industry, companyAddress, country, state, city, email, phone, jobPosition, vacancy, eventName } = req.body;
        const newCompanyLogo = req.file ? req.file.path : null;

        if (!id) {
            if (newCompanyLogo) fs.unlinkSync(newCompanyLogo);
            return res.status(400).json({ message: 'Id not found' });
        }

        const company = await Company.findById(id);

        if (!company) {
            if (newCompanyLogo) fs.unlinkSync(newCompanyLogo);
            return res.status(404).json({ message: 'Company not found' });
        }

        // Check if the email is being updated and ensure it's unique
        if (email && email !== company.email) {
            const existingCompany = await Company.findOne({ email });
            if (existingCompany) {
                if (newCompanyLogo) fs.unlinkSync(newCompanyLogo);
                return res.status(400).json({ message: 'Email already exists' });
            }
        }

        // Handle company logo replacement
        if (newCompanyLogo) {
            if (company.companyLogo && fs.existsSync(company.companyLogo)) {
                try {
                    fs.unlinkSync(company.companyLogo);
                } catch (err) {
                    console.error('Error deleting old company logo', err);
                }
            }
        }

        const updateData = {
            companyName: companyName || company.companyName,
            industry: industry || company.industry,
            companyAddress: companyAddress || company.companyAddress,
            country: country || company.country,
            state: state || company.state,
            city: city || company.city,
            email: email || company.email,
            phone: phone || company.phone,
            jobPosition: jobPosition || company.jobPosition,
            vacancy: vacancy || company.vacancy,
            eventName: eventName || company.eventName,
        };

        if (newCompanyLogo) {
            updateData.companyLogo = newCompanyLogo;
        }

        await Company.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        res.status(201).json({
            message: 'Company updated successfully'
        });

    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({
            message: 'An error occurred while updating the company',
            error: error.message
        });
    }
};
