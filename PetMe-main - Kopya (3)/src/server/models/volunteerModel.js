const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    address: String,
    city: String,
    state: String,
    country: String,
    contactNumber: String
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = Volunteer;
