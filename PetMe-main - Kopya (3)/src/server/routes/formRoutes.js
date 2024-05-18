const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const Form = require('../models/formModel');

// POST a new form submission
router.post('/', formController.submitForm);

// GET all form submissions
router.get('/', async (req, res) => {
    try {
        const forms = await Form.find();

        res.status(200).json({
            status: 'success',
            data: forms,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
});

module.exports = router;
