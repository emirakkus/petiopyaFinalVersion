const Form = require('../models/formModel');

// POST a new form submission
exports.submitForm = async (req, res) => {
    const formData = new Form({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        eventName: req.body.eventName
    });

    try {
        const newForm = await formData.save();
        res.status(201).json(newForm);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
