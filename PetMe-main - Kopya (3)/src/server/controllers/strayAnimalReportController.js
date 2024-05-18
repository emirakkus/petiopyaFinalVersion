const geoip = require('geoip-lite');
const AnimalReport = require('../models/strayAnimalReportModel');
const catchAsync = require('../utils/catchAsync');

exports.addReportAnimal = catchAsync(async (req, res, next) => {
    const { pname, email, address, contact, role , animalConditionDiscription, rescueStatus } = req.body;

    // IP adresini almak için farklı bir yöntem kullanabiliriz 
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const geo = geoip.lookup(ip);
    // Eğer IP bulunamazsa varsayılan bir değer atayabiliriz
    const fetchedLongitude = geo ? geo.ll[0] : null;
    const fetchedLatitude = geo ? geo.ll[1] : null;

    // Türkiye saatine göre tarih ve saat bilgisini al
    const reportedDate = new Date().toLocaleString('tr-TR');

    const newAnimalReport = await AnimalReport.create({
        pname,
        email,
        address,
        contact,
        animal:role,
        animalConditionDiscription,
        reportedDate, // Türkiye saatine göre tarih ve saat
        rescueStatus
    });

    res.status(201).send({
        message: "success",
        data: {
            newAnimalReport
        }
    });
});

exports.getAllReports = catchAsync(async (req, res, next) => {
    const AllAnimalReports = await AnimalReport.find();

    res.status(200).json({
        message: 'success',
        data: {
            AllAnimalReports,
        },
    });
});

exports.getAnimalReportById = catchAsync(async (req, res, next) => {
    const SingleAnimalReport = await AnimalReport.findById(req.params.id);

    res.status(200).json({
        message: 'success',
        data: {
            SingleAnimalReport,
        },
    });
});

exports.deleteAnimalReport = catchAsync(async (req, res, next) => {
    await AnimalReport.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message: 'success',
    });
});
