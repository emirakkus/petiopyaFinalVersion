// routes/contactUsRoutes.js

const express = require('express');
const router = express.Router();
const Contact = require('../models/contactusModel'); // Doğru model dosyasını require edin

router.post('/', async (req, res) => {
    try {
        const newContact = await Contact.create(req.body);
        res.status(200).json({
            status: 'success',
            data: {
                contact: newContact,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({
            status: 'success',
            data: {
                contacts: contacts,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
});

module.exports = router;
