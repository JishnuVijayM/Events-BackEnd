const Notification = require('../../models/notificationModel')

exports.createNotify = async (req, res) => {
    try {
        const userId = req.user.userId;

        const { title, type, event, target, content, dateAndTime, channel, expDate } = req.body;

        if (!title || !type|| !event|| !content|| !dateAndTime) {
            return res.status(400).json({ message: "Please fill in all required fields" });
        }

        const notification = new Notification({
            title,
            type,
            event,
            target,
            content,
            dateAndTime,
            channel,
            expDate,
            updatedBy: userId
        });

        await notification.save();

        res.status(201).json({
            message: "Notification created successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while creating the notification",
            error: error.message
        });
    }
};