const Job = require('../../models/jobModel')

exports.createJob = async (req, res) => {
    const { jobTitle, company, location, skill, salaryRange, employmentType, experience, eduLevel, vacancy, deadline, status } = req.body

    try {
        if (!jobTitle || !company || !location || !skill || !salaryRange || !employmentType || !experience || !eduLevel || !vacancy || !deadline || !status) {
            return res.status(400).json({ message: "Missing fields" })
        }

        const newJob = new Job({ jobTitle, company, location, skill, salaryRange, employmentType, experience, eduLevel, vacancy, deadline, status })

        await newJob.save()

        res.status(201).json({ message: "Job created successfully" });

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while creating job",
            error: error.message,
        });
    }

}