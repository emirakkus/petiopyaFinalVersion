const express = require('express');
const router = express.Router();
const petservicesController = require('../controllers/petservicesController');
const Petservices = require('../models/petservicesModel'); // Dosya adını düzelt

// POST isteğini '/api/v1/petservices' adresine yönlendir
router.post('/', petservicesController.create);

router.get('/', async (req, res) => {
    try {
        // Tüm pet hizmetlerini bul
        const petServices = await Petservices.find();

        // Tüm pet hizmetlerini JSON formatında yanıtla
        res.status(200).json({
            status: 'success',
            data: petServices,
        });
    } catch (error) {
        // Hata durumunda hatayı JSON formatında yanıtla
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
});

module.exports = router;
