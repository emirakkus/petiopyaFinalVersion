const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    pname: String,
    email: String,
    address: String,
    contact: String,
    animal: String, // Yeni eklenen alan
    animalConditionDiscription: String,
    reportedDate: String, // Türkiye saatine göre tarih ve saat
    rescueStatus: String,
});

const AnimalReport = mongoose.model('AnimalReport', animalSchema);

module.exports = AnimalReport;
