const fs = require('fs');
const path = require('path');

const Event = require('../../models/eventModel')
const EventUser = require('../../models/userEventModel');
const Role = require('../../models/roleModel');

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

exports.viewEvent = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id not found' })
        }

        const eventDetails = await Event.findById(id)

        if (!eventDetails) {
            return res.status(404).json({ message: "No event found" });
        }

        return res.status(200).json(eventDetails)

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching the event",
            error: error.message
        });
    }
}

exports.updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
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

        if (!id) {
            if (eventBanner) fs.unlinkSync(eventBanner);
            return res.status(400).json({ message: 'Id not found' });
        }

        const event = await Event.findById(id);

        if (!event) {
            if (eventBanner) fs.unlinkSync(eventBanner);
            return res.status(404).json({ message: 'Event not found' });
        }

        if (eventBanner && event.eventBanner) {
            try {
                fs.unlinkSync(event.eventBanner);
            } catch (err) {
                console.error('Error deleting old banner picture:', err);
            }
        }

        // Update event data
        const updateData = {
            name: name || event.eventName,
            type: type || event.eventName,
            location: location || event.eventName,
            startDate: startDate || event.eventName,
            endDate: endDate || event.eventName,
            description: description || event.eventName,
            companies: companies || event.eventName,
            info: info || event.eventName,
            coordinator: coordinator || event.eventName,
            agenda: agenda || event.eventName,
            participatingNo: participatingNo || event.eventName,
            vacancy: vacancy || event.eventName,
            status: status || event.eventName,
        };

        if (eventBanner) {
            updateData.eventBanner = eventBanner;
        }

        await Event.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        res.status(201).json({
            message: 'Event updated successfully'
        });

    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({
            message: 'An error occurred while updating the event',
            error: error.message
        });
    }
};

exports.listEvent = async (req, res) => {
    try {
        const data = await Event.find()

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No events found" });
        }

        const updatedData = data.map((item) => {
            return {
                label: item.name,
                value: item._id
            }
        })

        res.status(200).json({ data: updatedData })

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching the event",
            error: error.message
        });
    }
}

exports.createEventUser = async (req, res) => {
    try {
        const {
            name,
            email,
            event,
            role,
            qualification,
            gender,
            city,
            expertise,
            regDate,
            status,
            phone,
            linkedIn,
            experience, } = req.body;
        const resume = req.file ? req.file.path : null;

        if (!name || !email || !event || !role || !regDate || !status || !phone) {
            if (resume) fs.unlinkSync(resume);
            return res.status(400).json({ message: "Please fill in all required fields" });
        }

        console.log(resume);


        const newUser = new EventUser({
            name,
            email,
            event,
            role,
            qualification,
            gender,
            city,
            expertise,
            regDate,
            status,
            phone,
            linkedIn,
            experience,
            resume,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({
            message: "An error occurred while registering event user",
            error: error.message,
        });
    }
};

exports.viewAllEventUsers = async (req, res) => {
    try {
        const userList = await EventUser.find();

        if (!userList.length) {
            return res.status(404).json({ message: "No events found" });
        }

        const eventList = await Event.find();
        const roleList = await Role.find();

        const updatedData = userList.map((item, index) => {
            const event = eventList.find(event => event._id.toString() === item.event?.toString());

            const roleData = roleList.find((role) => role._id.toString() === item.role.toString());

            return {
                id: item._id,
                no: index + 1,
                name: item.name,
                email: item.email,
                event: event ? event.name : "Unknown Event",
                'reg-date': new Date(item.regDate).toLocaleDateString(),
                status: item.status,
                role: roleData ? roleData.name : "Unknown"
            };
        });

        return res.status(200).json(updatedData);

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching event users",
            error: error.message
        });
    }
};

exports.deleteEventUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id not found' });
        }

        const userList = await EventUser.findById(id);

        if (!userList) {
            return res.status(404).json({ message: 'No User found' });
        }

        if (userList.resume) {
            try {
                fs.unlinkSync(userList.resume);
                console.log('resume deleted successfully');
            } catch (err) {
                console.error('Error deleting resume:', err);
            }
        }

        await userList.deleteOne();
        res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

exports.viewEventUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id not found' })
        }

        const userDetails = await EventUser.findById(id)

        if (!userDetails) {
            return res.status(404).json({ message: "No user found" });
        }

        return res.status(200).json(userDetails)

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching the event",
            error: error.message
        });
    }
}

exports.updateEventUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            if (req.file) fs.unlinkSync(req.file.path);
            return res.status(400).json({ message: 'ID not provided' });
        }

        const eventData = await EventUser.findById(id);
        if (!eventData) {
            if (req.file) fs.unlinkSync(req.file.path);
            return res.status(404).json({ message: 'User not found' });
        }

        const {
            name,
            email,
            event,
            role,
            qualification,
            gender,
            city,
            expertise,
            regDate,
            status,
            phone,
            linkedIn,
            experience,
        } = req.body;

        let resume = eventData.resume; 
        if (req.file) {
            resume = req.file.path;
            if (eventData.resume) {
                try {
                    fs.unlinkSync(eventData.resume); 
                } catch (err) {
                    console.error('Error deleting old resume:', err);
                }
            }
        }

        const updateData = {
            name: name || eventData.name,
            email: email || eventData.email,
            event: event || eventData.event,
            role: role || eventData.role,
            qualification: qualification || eventData.qualification,
            gender: gender || eventData.gender,
            city: city || eventData.city,
            expertise: expertise || eventData.expertise,
            regDate: regDate || eventData.regDate,
            status: status || eventData.status,
            phone: phone || eventData.phone,
            linkedIn: linkedIn || eventData.linkedIn,
            experience: experience || eventData.experience,
            resume, 
        };

        const updatedUser = await EventUser.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedUser) {
            return res.status(500).json({ message: 'Failed to update user' });
        }

        res.status(201).json({ message: 'User updated successfully', user: updatedUser });

    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({
            message: 'An error occurred while updating the user',
            error: error.message
        });
    }
};