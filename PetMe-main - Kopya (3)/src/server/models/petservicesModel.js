const mongoose = require('mongoose');

// Petservices Şeması
const petservicesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  reservationDate: {
    type: Date,
    required: true
  },
  reservationTime: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true
  },
  hours: {
    type: Number,
    required: true
  }
});

// Model oluştur ve doğru şekilde export et
const Petservices = mongoose.model('Petservices', petservicesSchema);

module.exports = Petservices;
