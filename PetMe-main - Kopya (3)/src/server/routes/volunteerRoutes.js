const express = require('express');
const volunteerController = require('../controllers/volunteerController');
const router = express.Router();

router.post('/', volunteerController.addVolunteer);
router.get('/', volunteerController.getAllVolunteers);
router.get('/:id', volunteerController.getVolunteer);
router.delete('/:id', volunteerController.deleteVolunteer);

module.exports = router;
