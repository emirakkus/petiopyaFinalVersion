const express = require('express');
const router = express.Router();
const Adopt = require('../models/adoptModel'); // Doğru model dosyasını require edin

router.post('/', async (req, res) => {
    try {
        const newAdoptRequest = await Adopt.create(req.body);
        res.status(200).json({
            status: 'success',
            data: {
                adoptRequest: newAdoptRequest,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
});
router.get('/', async (req, res) => {
    try {
        // Tüm adopt isteklerini veritabanından alın
        const adoptRequests = await Adopt.find();

        // Başarılı bir yanıt gönderin
        res.status(200).json({
            status: 'success',
            data: {
                adoptRequests: adoptRequests,
            },
        });
    } catch (error) {
        // Hata durumunda uygun bir hata yanıtı gönderin
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
});
module.exports = router;
