const express = require('express');
const loginController = require('../controllers/loginController');
const router = express.Router();

// Kullanıcı girişi için POST isteği
router.post('/', loginController.login);

module.exports = router;
