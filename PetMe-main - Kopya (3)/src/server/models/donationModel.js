const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
        phone: {
            type: String,
        },
        petName: {
            type: String,
        },
        petType: {
            type: String,
        },
        petColor: {
            type: String,
        },
        petBreed: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        petImage: {
            type: String, // Dosya yolunu saklamak için String tipinde
        },
    }
);

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
