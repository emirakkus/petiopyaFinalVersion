const express = require('express');
const AnimalReport = require('../models/strayAnimalReportModel');

const router = express.Router();

// POST route for adding animal report
router.post('/', async (req, res) => {
    try {
        const newReport = await AnimalReport.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                report: newReport,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message,
        });
    }
});

// DELETE route for deleting animal report by ID
router.delete('/:id', async (req, res) => {
    try {
        await AnimalReport.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message,
        });
    }
});

// GET route for getting animal report by ID
router.get('/:id', async (req, res) => {
    try {
        const report = await AnimalReport.findById(req.params.id);
        if (!report) {
            return res.status(404).json({
                status: 'error',
                message: 'Report not found',
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                report,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message,
        });
    }
});

// GET route for getting all animal reports
router.get('/', async (req, res) => {
    try {
        const allReports = await AnimalReport.find();
        res.status(200).json({
            status: 'success',
            data: {
                reports: allReports,
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
