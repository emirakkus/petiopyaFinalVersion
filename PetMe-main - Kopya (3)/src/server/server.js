const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const petRouter = require('./routes/petRoutes');
const volunteersRouter = require('./routes/volunteerRoutes');
const donationRouter = require('./routes/donationRoutes');
const strayAnimalReportRouter = require('./routes/strayAnimalReportRoutes');
const contactUsRouter = require('./routes/contactusRoutes');
const adoptRouter = require('./routes/adoptRoutes'); // Adopt rotasını ekledik
const loginRouter = require('./routes/loginRoutes');
const blogRoutes = require('./routes/blogRoutes');
const formRoutes = require('./routes/formRoutes');
const petservicesRoutes=require('./routes/petservicesRoutes');
const AppError = require('./utils/appError');
const errorController = require('./controllers/errorController');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();

dotenv.config({ path: path.join(__dirname, 'config.env') });

// MongoDB'ye bağlanma
mongoose
    .connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('DB connection established');
    })
    .catch((err) => {
        console.log('DB CONNECTION FAILED');
        console.log('ERR: ', err);
    });

app.enable('trust proxy');

app.use(cors({ credentials: true, origin: process.env.REMOTE }));
app.options(process.env.REMOTE, cors());

console.log(`ENV = ${process.env.NODE_ENV}`);
app.use(morgan('dev'));

const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: '!!! Too many requests from this IP, Please try again in 1 hour !!!',
});

app.use('/api/v1', limiter);

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(req.requestTime);
    if (req.cookies) console.log(req.cookies);
    next();
});

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

app.use(mongoSanitize());
app.use(xss());
app.use(compression());

app.use('/api/v1/AnimalReportImage', express.static('public/Images/RportedAnimals'));
app.use('/api/v1/volunteers', volunteersRouter);
app.use('/api/v1/pet', petRouter);
app.use('/api/v1/donation', donationRouter);
app.use('/api/v1/reportAnimal', strayAnimalReportRouter);
app.use('/api/v1/contactus', contactUsRouter);
app.use('/api/v1/adopt', adoptRouter); // Adopt rotasını ekledik
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/posts', blogRoutes);
app.use('/api/v1/forms', formRoutes);
app.use('/api/v1/petservices', petservicesRoutes);
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(errorController);

const port = process.env.PORT || 3005;
const server = app.listen(port, () => {
    console.log(`App running at port ${port}...`);
});

process.on('uncaughtException', (err) => {
    console.log(`UNCAUGHT EXCEPTION -> ${err.name} - ${err.message}`);
    console.log('App SHUTTING DOWN...');
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.log(`UNHANDLED REJECTION -> ${err.name} - ${err.message}`);
    console.log(err);
    console.log('App SHUTTING DOWN...');
    server.close(() => {
        process.exit(1);
    });
});
