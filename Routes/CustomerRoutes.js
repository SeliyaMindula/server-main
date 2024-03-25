const express = require('express');
const router = express.Router();
const session = require('express-session');
const cors = require('cors');

const { CustomerLogin, CreateCustomerAccount, customerCheckAuth, Logout, SendResetLink, PasswdReset, SendAccountActivatingLink, ActivateAccount, CheckActivation, GetVenues, GetVenueByID, BookingRequest, GetAllBookingRequest } = require('../Controllers/CustomerController');
const { CUSTOMER_SESSION_URL } = require('../Config');
const { upload3 } = require('../MiddleWare/Uploads');

// const corsOptions = {
//     origin: 'http://localhost:5173',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTION',
//     allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
//     credentials: true,
// };

// router.use(cors(corsOptions));


router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', CUSTOMER_SESSION_URL); // Note: '*' should be replaced with the specific origin during production.
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

router.use(session({
    secret: 'hbfhba4ighbfoi87se9ybvhge8ryhbv8&%$%@#$#&jhskidagsoiuh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        // secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

router.options('*', (req, res) => res.sendStatus(200));

router.route('/login')
    .post(CustomerLogin)

router.route('/logout')
    .get(Logout)

router.route('/register')
    .post(CreateCustomerAccount)

router.route('/auth')
    .get(customerCheckAuth)

router.route('/forgot-password/:email')
    .get(SendResetLink)

router.route('/passwd-reset/:token/:id')
    .post(PasswdReset)

    router.route('/activation-link/:email')
    .post(SendAccountActivatingLink)

    router.route('/acc-activate/:token/:id')
    .post(ActivateAccount)
    
    router.route('/check-activation')
    .post(CheckActivation)

    router.route('/venues')
    .get(GetVenues)

    router.route('/venue/:id')
    .get(GetVenueByID)



    // ------- VENUE BOOKING ROUTES -------
    router.post('/venue-booking', upload3.fields([{ name: 'VAT_copy', maxCount: 1 }]), BookingRequest)
    

module.exports = router