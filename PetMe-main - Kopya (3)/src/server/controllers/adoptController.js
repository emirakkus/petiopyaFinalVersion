const Pet = require('../models/adoptModel');

exports.addAdoptionRequest = async (req, res) => {
    try {
        // İstekten gelen bilgileri al
        const { name, email, firstaddress, phone } = req.body;

        // Yeni bir evcil hayvan sahiplenme isteği oluştur
        const newAdoptionRequest = await Pet.create({ name, email, address, phone });

        // Başarı durumunda 201 Created kodu ve oluşturulan veriyi yanıtla
        res.status(201).json({
            status: 'success',
            data: {
                name: newAdoptionRequest.name,
                email: newAdoptionRequest.email,
                address: newAdoptionRequest.address,
                phone: newAdoptionRequest.phone
            }
        });
    } catch (error) {
        // Hata durumunda 500 Internal Server Error kodu ve hata mesajını yanıtla
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};
