const fs = require('fs');
const path = require('path');

const Event = require('../../models/eventModel')

exports.createEvent = async (req, res) => {
    try {
        const {
            name,
            type,
            location,
            startDate,
            endDate,
            description,
            companies,
            info,
            coordinator,
            agenda,
            participatingNo,
            vacancy,
            status,
        } = req.body;

        const eventBanner = req.file ? req.file.path : null;
        // const userId = req.user.userId;

        if (!name || !type || !startDate || !endDate || !description || !companies || !participatingNo || !vacancy || !status) {
            if (eventBanner) fs.unlinkSync(eventBanner);
            return res.status(400).json({ message: "Please fill in all required fields" });
        }

        if (!eventBanner) {
            return res.status(400).json({ message: "Please provide event banner" });
        }

        const newEvent = new Event({
            name,
            type,
            location,
            startDate,
            endDate,
            description,
            companies,
            info,
            coordinator,
            agenda,
            participatingNo,
            vacancy,
            status,
            eventBanner
        });

        await newEvent.save();

        res.status(201).json({ message: "Event created successfully" });

    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({
            message: "An error occurred while creating event",
            error: error.message,
        });
    }
};

exports.viewAllEvents = async (req, res) => {
    try {
        const eventList = await Event.find()

        if (!eventList.length) {
            return res.status(404).json({ message: "No events found" });
        }

        const updatedData = eventList.map((item, index) => {
            return {
                id: item._id,
                no: index + 1,
                name: item.name,
                type: item.type,
                location: item.location,
                'start-date': new Date(item.startDate).toLocaleDateString(),
                'end-date': new Date(item.endDate).toLocaleDateString(),
                participants: item.participatingNo,
                status: item.status
            };
        });

        return res.status(200).json(updatedData);

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching event list",
            error: error.message
        });
    }
}

exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id not found' });
        }

        const eventList = await Event.findById(id);

        if (!eventList) {
            return res.status(404).json({ message: 'No Events found' });
        }

        if (eventList.eventBanner) {
            try {
                fs.unlinkSync(eventList.eventBanner);
                console.log('banner deleted successfully');
            } catch (err) {
                console.error('Error deleting banner:', err);
            }
        }

        await eventList.deleteOne();
        res.status(200).json({ message: 'Event deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};