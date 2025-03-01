const Notification = require('../../models/notificationModel')
const User = require('../../models/userModel')
const Event = require('../../models/eventModel')

exports.createNotify = async (req, res) => {
    try {
        const userId = req.user.userId;

        const { title, type, event, target, content, dateAndTime, channel, expDate } = req.body;

        if (!title || !type || !event || !content || !dateAndTime) {
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

exports.getAllNotify = async (req, res) => {
    try {
        const notifyList = await Notification.find()
        const userList = await User.find()
        const eventList = await Event.find()

        if (!notifyList.length) return res.status(404).json({ message: "No notification found" });

        const updatedData = notifyList.map((item, index) => {

            const user = userList.find(user => user._id.toString() === item.updatedBy?.toString());
            const event = eventList.find(evnt => evnt._id.toString() === item.event?.toString());

            return {
                id: item._id,
                no: index + 1,
                title: item.title,
                event: event ? event.name : "Unknown",
                'date and time': new Date(item.dateAndTime).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                }),
                'updated-by': user ? user.userName : "Unknown",
            };
        });

        return res.status(200).json(updatedData);

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching notification deatails",
            error: error.message
        });
    }
}

exports.viewNotify = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id not found' })
        }

        const notificationDetails = await Notification.findById(id)

        if (!notificationDetails) {
            return res.status(404).json({ message: "No notification found" });
        }

        return res.status(200).json(notificationDetails)

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching the notification detail",
            error: error.message
        });
    }
}

exports.deleteNotify = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id not found' });
        }

        const notificationData = await Notification.findById(id);

        if (!notificationData) {
            return res.status(404).json({ message: 'No notification found' });
        }

        await notificationData.deleteOne();
        res.status(200).json({ message: 'Notification deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}