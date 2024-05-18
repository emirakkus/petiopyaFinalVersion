const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Kullanıcı şema tanımı
const loginSchema = new Schema({
    Username: { type: String, required: true, unique: true },
    Password: { type: String, required: true } // Şifre alanı eklendi
});

// Kullanıcı modeli oluşturulması
const Login = mongoose.model('Login', loginSchema);

module.exports = Login;
