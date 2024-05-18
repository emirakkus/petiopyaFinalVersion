// controllers/petservicesController.js

// Örneğin, MongoDB kullanarak bir Model kullanılıyorsa, Model dosyasını buraya ekleyin
const Petservices = require('../models/petservicesModel'); // Dosya adını düzelt

exports.create = async (req, res) => {
  try {
    // Gelen verileri al
    const { name, email, reservationDate, reservationTime, service, hours } = req.body;

    // Veritabanında yeni bir pet servisi oluştur
    const newPetService = new Petservices({
      name,
      email,
      reservationDate,
      reservationTime,
      service,
      hours
    });

    // Veritabanına kaydet
    await newPetService.save();

    // Başarılı bir yanıt gönder
    res.status(201).json({ success: true, message: 'Pet service created successfully' });
  } catch (error) {
    // Hata durumunda uygun bir yanıt gönder
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
