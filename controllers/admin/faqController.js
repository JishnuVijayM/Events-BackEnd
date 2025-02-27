const Faq = require('../../models/faqModel')
const User = require('../../models/userModel')

exports.createFaq = async (req, res) => {
    try {
        const userId = req.user.userId;

        const { question, answer } = req.body;

        if (!question || !answer) {
            return res.status(400).json({ message: "Please fill in all required fields" });
        }

        const faq = new Faq({
            question,
            answer,
            updatedBy: userId
        });

        await faq.save();

        res.status(201).json({
            message: "Faq created successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while creating the faq",
            error: error.message
        });
    }
};

exports.getAllFaq = async (req, res) => {
    try {
        const faqList = await Faq.find()
        const userList = await User.find()

        if (!faqList.length) return res.status(404).json({ message: "No faq found" });

        const updatedData = faqList.map((item, index) => {

            const user = userList.find(user => user._id.toString() === item.updatedBy?.toString());

            return {
                id: item._id,
                no: index + 1,
                question: item.question,
                answer: item.answer,
                'updated-by': user ? user.userName : "Unknown",
                'updated-date': new Date(item.updatedAt).toLocaleDateString(),
            };
        });

        return res.status(200).json(updatedData);

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching faq deatails",
            error: error.message
        });
    }
}

exports.viewFaq = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id not found' })
        }

        const faqDetail = await Faq.findById(id)

        if (!faqDetail) {
            return res.status(404).json({ message: "No faq found" });
        }

        return res.status(200).json(faqDetail)

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching the faq detail",
            error: error.message
        });
    }
}

exports.updateFaq = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Id not found' });
        }

        const updateFaq = await Faq.findByIdAndUpdate(
            id,
            { question, answer, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!updateFaq) {
            return res.status(404).json({ message: 'Faq not found' });
        }

        res.status(201).json({
            message: 'Faq updated successfully',
        });

    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while updating the faq',
            error: error.message
        });
    }
};

exports.deleteFaq = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id not found' });
        }

        const faqData = await Faq.findById(id);

        if (!faqData) {
            return res.status(404).json({ message: 'No Faq found' });
        }

        await faqData.deleteOne();
        res.status(200).json({ message: 'Faq deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}