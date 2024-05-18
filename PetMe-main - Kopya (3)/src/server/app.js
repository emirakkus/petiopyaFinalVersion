const express = require('express');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const errorController = require('./controllers/errorController');
const petRouter = require('./routes/petRoutes');
const volunteerRouter = require('./routes/volunteerRoutes');
const donationRouter = require('./routes/donationRoutes');
const contactUsRouter = require('./routes/contactusRoutes');
const strayAnimalReportRouter = require('./routes/strayAnimalReportRoutes');
const adoptRouter = require('./routes/adoptRoutes'); // Adopt rotasını ekleyin
const loginRouter = require('./routes/loginRoutes');
const blogRoutes = require('./routes/blogRoutes');
const formRoutes = require('./routes/formRoutes');
const petservicesRoutes=require('./routes/petservicesRoutes');
dotenv.config({ path: path.join(__dirname, 'config.env') });

const app = express();
const PORT = process.env.PORT || 3005;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING.replace(
    '<PASSWORD>',
    encodeURIComponent(process.env.DATABASE_PASSWORD)
);

mongoose
    .connect(DB_CONNECTION_STRING, {
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

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize());
app.use(xss());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
    max: 1000,
    windowMs: 15 * 60 * 1000, // 15 minutes
    message: 'Too many requests from this IP, please try again in 15 minutes',
});
app.use('/api/v1', limiter);

// Routes
app.use('/api/v1/pet', petRouter);
app.use('/api/v1/volunteers', volunteerRouter);
app.use('/api/v1/donation', donationRouter);
app.use('/api/v1/reportAnimal', strayAnimalReportRouter);
app.use('/api/v1/contactus', contactUsRouter);
app.use('/api/v1/adopt', adoptRouter); // Adopt rotasını ekleyin
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/posts', blogRoutes);
app.use('/api/v1/forms', formRoutes);
app.use('/api/v1/petservices', petservicesRoutes);
// Error handling
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(errorController);

// Server
const server = app.listen(PORT, () => {
    console.log(`App running at port ${PORT}...`);
});

// Global error handling
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err);
    console.log('Shutting down...');
    server.close(() => {
        process.exit(1);
    });
});

process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION:', err);
    console.log('Shutting down...');
    server.close(() => {
        process.exit(1);
    });
});
