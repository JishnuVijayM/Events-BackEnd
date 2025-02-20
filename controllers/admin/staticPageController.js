const Page = require('../../models/staticPageModel')
const User = require('../../models/userModel')

exports.createPage = async (req, res) => {
    try {
        const userId = req.user.userId;

        const {
            name,
            title,
            pageSlug,
            content,
            keyword,
            description,
        } = req.body;

        if (!name || !title || !content) {
            return res.status(400).json({ message: "Please fill in all required fields" });
        }

        const page = new Page({
            name,
            title,
            pageSlug,
            content,
            keyword,
            description,
            updatedBy: userId
        });

        await page.save();

        res.status(201).json({
            message: "Page created successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while creating the page",
            error: error.message
        });
    }
};

exports.getAllPages = async (req, res) => {
    try {
        const pageList = await Page.find()
        const userList = await User.find()

        if (!pageList.length) return res.status(404).json({ message: "No jobs found" });

        const updatedData = pageList.map((item, index) => {

            const user = userList.find(user => user._id.toString() === item.updatedBy?.toString());

            return {
                id: item._id,
                no: index + 1,
                name: item.name,
                title: item.title,
                slug: item.pageSlug,
                'updated-by': user ? user.userName : "Unknown",
                'updated-date': new Date(item.updatedAt).toLocaleDateString(),
            };
        });

        return res.status(200).json(updatedData);

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching page deatails",
            error: error.message
        });
    }
}

exports.viewPage = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id not found' })
        }

        const pageDetails = await Page.findById(id)

        if (!pageDetails) {
            return res.status(404).json({ message: "No page found" });
        }

        return res.status(200).json(pageDetails)

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching the page detail",
            error: error.message
        });
    }
}

exports.updatePage = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const {
            name,
            title,
            pageSlug,
            content,
            keyword,
            description,
        } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Id not found' });
        }

        const updatedPage = await Page.findByIdAndUpdate(
            id,
            {
                name,
                title,
                pageSlug,
                content,
                keyword,
                description,
                updatedBy: userId
            },
            { new: true }
        );

        if (!updatedPage) {
            return res.status(404).json({ message: 'page not found' });
        }

        res.status(201).json({
            message: 'Static page updated successfully',
        });

    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while updating the page',
            error: error.message
        });
    }
};

exports.deletePage = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id not found' });
        }

        const pageData = await Page.findById(id);

        if (!pageData) {
            return res.status(404).json({ message: 'No Page found' });
        }

        await pageData.deleteOne();
        
        res.status(200).json({ message: 'Static Page deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}
