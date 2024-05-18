const Contact = require('../models/contactusModel');

exports.addContactMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newContact = await Contact.create({ name, email, message });

        res.status(201).json({
            status: 'success',
            data: {
                name: newContact.name,
                email: newContact.email,
                message: newContact.message
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};
