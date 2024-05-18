const mongoose = require('mongoose');

// Evcil hayvan sahiplenme istekleri için şema tanımla
const adoptionSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    address: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    }
}, {
    timestamps: true // Oluşturma ve güncelleme tarihlerini otomatik olarak izle
});

// Modeli oluştur ve dışa aktar
const Adoption = mongoose.model('Adoption', adoptionSchema);

module.exports = Adoption;
