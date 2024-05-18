const Volunteer = require('../models/volunteerModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.addVolunteer = catchAsync(async (req, res, next) => {
    const { fullName, email, address, city, state, country, contactNumber } = req.body;
    
    // Verileri boş olup olmadığını kontrol edin ve boş olmayanları kullanarak yeni bir volunteer oluşturun
    const volunteerData = {};
    if (fullName) volunteerData.fullName = fullName;
    if (email) volunteerData.email = email;
    if (address) volunteerData.address = address;
    if (city) volunteerData.city = city;
    if (state) volunteerData.state = state;
    if (country) volunteerData.country = country;
    if (contactNumber) volunteerData.contactNumber = contactNumber;

    const volunteer = await Volunteer.create(volunteerData);

    res.status(201).json({
        status: 'success',
        data: {
            volunteer
        }
    });
});

exports.getAllVolunteers = catchAsync(async (req, res, next) => {
    const volunteers = await Volunteer.find();

    res.status(200).json({
        status: 'success',
        results: volunteers.length,
        data: {
            volunteers,
        },
    });
});

exports.getVolunteer = catchAsync(async (req, res, next) => {
    const volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer) {
        return next(new AppError('No volunteer found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            volunteer,
        },
    });
});

exports.deleteVolunteer = catchAsync(async (req, res, next) => {
    const volunteer = await Volunteer.findByIdAndDelete(req.params.id);

    if (!volunteer) {
        return next(new AppError('No volunteer found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null,
    });
});
