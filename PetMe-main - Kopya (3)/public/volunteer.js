const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Volunteer = mongoose.model('Volunteer', {
  name: String,
  email: String,
  address: String,
  city: String,
  state: String,
  country: String,
  number: String,
});

app.post('/api/v1/volunteers', async (req, res) => {
  try {
    const { name, email, address, city, state, country, number } = req.body;
    const volunteer = new Volunteer({ name, email, address, city, state, country, number });
    await volunteer.save();
    res.status(201).send('Volunteer kaydedildi');
  } catch (err) {
    console.error(err);
    res.status(500).send('Volunteer kaydedilirken bir hata oluştu: ' + err.message);

  }
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
