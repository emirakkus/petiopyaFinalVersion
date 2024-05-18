const Pet = require('./models/petModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Donation = require('./models/donationModel');

exports.addDonation = catchAsync(async (req, res, next) => {
    try {
        // Resmin yüklendiğinden emin olun
        if (!req.file) {
            return next(new AppError('No image uploaded', 400));
        }

        // Resmin yüklendiği yolu alın
        const petImage = req.file.path;

        // Evcil hayvan nesnesini oluşturun
        const pet = await Pet.create({
            name: req.body.petName,
            image: req.body.image || null,
            breed: req.body.breed,
            color: req.body.color,
            location: req.body.location,
            species: req.body.species,
            gender: req.body.gender,
        });

        // Bağış nesnesini oluşturun
        const donation = await Donation.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            pet: pet.id,
            petName: req.body.petName,
            petBreed: req.body.breed,
            petColor: req.body.color,
            petType: req.body.species,
            petImage: petImage,
        });

        // Başarılı yanıtı gönderin
        res.status(201).json({
            message: 'success',
            data: {
                pet,
                donation
            },
        });
    } catch (error) {
        // Hata durumunda hatayı işleyin
        return next(new AppError('Error adding donation', 500));
    }
});
