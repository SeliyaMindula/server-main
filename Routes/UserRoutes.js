const express  = require('express');
const router = express.Router();
const {
 addUser,
 createAccount,
 getUser,
 getAllUsers,
 getActiveUsers,
 getPendingUsers,
 getInactiveUsers,
 changeStatus,
 getUserById,
 login,
 update,
 checkAdminPassword,
 updatePassword,
 sendResetLink,
 resetPassword,
 GetAllBookingRequest,
 GetBookingRequestByID
}=require('../Controllers/UserControl');
const {upload} =require('../MiddleWare/Uploads');
const { ADMIN_SESSION_URL } = require('../Config');


router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', ADMIN_SESSION_URL); // Note: '*' should be replaced with the specific origin during production.
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


router.options('*', (req, res) => {
    console.log("Hello");
    return res.sendStatus(200);
});

router.get('/booking-table', GetAllBookingRequest)
router.get('/booking-request/:id', GetBookingRequestByID);


router.route('/add-user').post(addUser);
router.route('/create-account/:id').put(upload.single('avatar'),createAccount);
router.route('/get-token-user/:token').get(getUser);
router.route('/active').get(getActiveUsers);
router.route('/pending').get(getPendingUsers);
router.route('/inactive').get(getInactiveUsers);
router.route('/change-status/:id').put(changeStatus);
router.route('/login').post(login);
router.route('/check-password/:id').post(checkAdminPassword);
router.route('/change-password/:id').put(updatePassword);
router.route('/reset-link').post(sendResetLink);
router.route('/reset-password').post(resetPassword);
router.route('/:id').get(getUserById).put(upload.single('avatar'),update);
router.route('/').get(getAllUsers);


// 


module.exports=router