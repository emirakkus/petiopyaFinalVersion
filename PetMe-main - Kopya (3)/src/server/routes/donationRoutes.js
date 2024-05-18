const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Donation = require('../models/donationModel');
// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'donationpet'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// POST endpoint for adding a new donation
router.post('/', upload.single('petImage'), async (req, res) => {
    try {
        // Check if a file is uploaded
        if (!req.file) {
            return res.status(400).json({
                status: 'error',
                message: 'No file uploaded',
            });
        }

        // File path
        const filePath = req.file.path;

        // Create a new donation with the file path
        const newDonation = await Donation.create({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            phone: req.body.phone,
            petName: req.body.petName,
            petType: req.body.petType,
            petColor: req.body.petColor,
            petBreed: req.body.petBreed,
            petImage: filePath,
        });

        return res.status(201).json({
            status: 'success',
            data: {
                donation: newDonation,
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
});

// GET endpoint for retrieving all donations
router.get('/', async (req, res) => {
    try {
        const donations = await Donation.find();
        res.status(200).json({
            status: 'success',
            data: {
                donations,
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
});





module.exports = router;
