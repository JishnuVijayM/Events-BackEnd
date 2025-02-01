const Job = require('../../models/jobModel')

exports.createJob = async (req, res) => {
    const { jobTitle, company, location, skill, salaryRange, employmentType, experience, eduLevel, vacancy, deadline, status } = req.body

    try {
        if (!jobTitle || !company || !location || !skill || !salaryRange || !employmentType || !experience || !eduLevel || !vacancy || !deadline || !status) {
            return res.status(400).json({ message: "Please fill in all required fields" })
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

exports.getAllJobs = async (req, res) => {
    try {
        const jobList = await Job.find()

        if (!jobList.length) return res.status(404).json({ message: "No jobs found" });

        const updatedData = jobList.map((item, index) => {
            return {
                id: item._id,
                no: index + 1,
                'job title': item.jobTitle,
                'company name': item.company,
                'recruitment event': 'pending',
                'location': item.location,
                'candidates applied': 'pending',
                vacancies: item.vacancy,
                status: item.status
            };
        });

        return res.status(200).json(updatedData);

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching job deatails",
            error: error.message
        });
    }
}

exports.viewJob = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id not found' })
        }

        const jobDetail = await Job.findById(id)

        if (!jobDetail) {
            return res.status(404).json({ message: "No job found" });
        }

        return res.status(200).json(jobDetail)

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching the job detail",
            error: error.message
        });
    }
}

exports.updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const { jobTitle, company, location, skill, salaryRange, employmentType, experience, eduLevel, vacancy, deadline, status } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Id not found' });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            id,
            { jobTitle, company, location, skill, salaryRange, employmentType, experience, eduLevel, vacancy, deadline, status, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(201).json({
            message: 'Job updated successfully',
        });

    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while updating the job',
            error: error.message
        });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id not found' });
        }

        const jobData = await Job.findById(id);

        if (!jobData) {
            return res.status(404).json({ message: 'No Job found' });
        }

        await jobData.deleteOne();
        res.status(200).json({ message: 'Job deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}