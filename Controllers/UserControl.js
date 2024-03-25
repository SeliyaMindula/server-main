const User = require('../Models/User');
const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { logMessage } = require('../MiddleWare/Logging');
const sendMail = require('../MiddleWare/SendEmail');
const jwt = require('jsonwebtoken');
const Log = require('../Models/Log');
const { use } = require('../Routes/UserRoutes');
//add user
const addUser = asyncHandler(async (req, res) => {
    const { email, role, department, user } = req.body;
    const generateToken = () => {
        return uuidv4();
    }
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Month is zero-based
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    try {
        const createdAt = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        const token = generateToken();
        const user = { email, role, department, status: 'pending', token, createdAt }
        const isEmail = await User.isEmail(email);
        console.log(isEmail);
        if (isEmail) {
            return res.status(400).json({ error: 'This email already exits!' });
        }
        const result = await User.addUser(user);
        if (result) {
            const message = `<p>Hello,</p>
            <p>We are excited to welcome you to our platform! To get started, please complete your profile by clicking the link below:</p>
            <p><a href="http://127.0.0.1:3000/create-account/${token}" target="_blank">Complete Your Profile</a></p>
            
            <p>Thank you!</p>
                `;

            const subject = 'Invitation to Complete Your Profile'
            const mailResponse = await sendMail(email, subject, message);

            const status = mailResponse.Messages[0].Status;
            if (status === "success") {
                return res.status(200).json({ message: 'New user adding successfully!' })
            } else {
                res.status(400).json({ error: 'Unable to send email.' });
            }
            const userIP = req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress;
            const data = {
                activity: 'New user invitation sent',
                email: email,
                ip: userIP,
                activityBy: user
            }
            await Log.createLog(data);
            return null;

        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' });
    }
});

//create account
const createAccount = asyncHandler(async (req, res) => {

    try {
        const { username, fullName, emp_no, password, token } = req.body;
        const id = req.params.id;
        const pictureFile = req.file;
        const avatar = pictureFile ? pictureFile.filename : '';

        // encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);
        const values = { username, fullName, emp_no, passwd: hashedPassword, image: avatar, status: 'active', id };
        const userToken = await User.getToken(id);
        const isActive = await User.isActive(id);
        const userResult = await User.getUserById(id);
        if (userToken.error) {
            console.log("Token Error:", userToken);
            res.json({ error: userToken.error });
            return null;
        }
        if (userToken.length > 0 && isActive) {
            if (token.trim() === userToken[0].token.trim()) {
                const result = await User.createAccount(values);
                if (result === 1) {
                    const userIP = req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress;
                    const data = {
                        activity: 'New user creation',
                        email: userResult[0].email,
                        ip: userIP,
                        activityBy: fullName
                    }
                    await Log.createLog(data);
                    logMessage(message);
                    res.status(200).json({ message: 'You account has been created!' });
                } else {
                    res.json({ error: 'Account creation failed!' });
                }

            }
            console.log('token not true')
        } else {
            console.log("token get error")
            res.json({ error: 'This link is invalid!' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' });
    }

});

//get single user
const getUser = asyncHandler(async (req, res) => {
    const token = req.params.token;
    try {
        const result = await User.getUser(token);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' });
    }
});

//get all users
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const result = await User.getUsers();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' });
    }
});
//get all users
const getActiveUsers = asyncHandler(async (req, res) => {
    try {
        const result = await User.getActiveUsers();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' });
    }
});
//get all users
const getPendingUsers = asyncHandler(async (req, res) => {
    try {
        const result = await User.getPendingUsers();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' });
    }
});
//get all users
const getInactiveUsers = asyncHandler(async (req, res) => {
    try {
        const result = await User.getInactiveUsers();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' });
    }
});

//change status
const changeStatus = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    const values = { status, id };

    try {
        const response = await User.changeStatus(values);
        if (response === 1) {
            res.status(200).json({ message: "Status changed!" });
        } else {
            res.json({ error: "Status cannot change!" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' });
    }
});
//get  user by Id
const getUserById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const result = await User.getUserById(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' });
    }
});

//login fn
const login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        const response = await User.userLogin(email);
        console.log(response)
        if (response.length > 0) {
            const isPasswordMatch = await bcrypt.compare(password, response[0].passwd)
            if (isPasswordMatch) {
                const userIP = req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress;

                const data = {
                    activity: 'New user login',
                    email: email,
                    ip: userIP,
                    activityBy: response[0].full_name
                }
                const logRes = await Log.createLog(data);

                res.status(200).json({ message: "Login successful", user: response[0] });
            } else {
                res.status(400).json({ error: "Password missed match" });
            }
        } else {
            res.status(400).json({ error: "Email invalid" });
        }



    } catch (error) {
        res.status(500).json({ error: "Internal server Error" })
        console.log(error)
    }
});

// update
const update = asyncHandler(async (req, res) => {
    try {
        const { email, username, full_name, role, department, contact } = req.body;

        const id = req.params.id;
        const response = await User.getUserById(id);
        const currentPicture = response[0].image;
        const picture = req.file;
        const image = picture ? picture.filename : currentPicture;

        const values = { email, username, full_name, role, department, contact, image, id };
        const result = await User.updateAccount(values);

        if (result === 1) {
            res.status(200).json({ message: 'You account has been updated!' });
        } else {
            res.json({ error: 'Account update failed!' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' });
    }
});
//check password 
const checkAdminPassword = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const { password } = req.body;
        console.log(password)
        const result = await User.getUserById(id);

        if (await bcrypt.compare(password, result[0].passwd)) {
            res.status(200).json({ message: 'password match' });
            return
        }
        res.status(401).json({ message: 'password  didn\'t match' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error!' })
    }
});

// update password
const updatePassword = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = { password: hashedPassword, id };
        const result = await User.updatePassword(data);
        if (result === 1) {
            res.status(200).json({ message: 'New password updated!' });
            return
        }
        res.status(400).json({ error: 'New password update error!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
});

//send reset link
const sendResetLink = asyncHandler(async (req, res) => {
    // Secret key for signing and verifying tokens

    try {
        const { email } = req.body;

        const isEmail = await User.isEmail(email);

        if (isEmail) {
            const userResponse = await User.getUserByEmail(email);
            const id = userResponse[0].id;

            const resetToken = generateResetToken(email);
            //console.log('reset token',resetToken)
            const message = `Click the following link to reset your password.<br/>
                <a href="http://127.0.0.1:3000/reset-password/${resetToken}/${id}">Click here.</a>
                <br/>
                Thank you!
                `;

            const subject = 'Password reset Link'
            const mailResponse = await sendMail(email, subject, message);

            const status = mailResponse.Messages[0].Status;
            if (status === "success") {
                res.status(200).json({ message: 'Password reset link sent to your email.' });
            } else {
                res.status(400).json({ error: 'Unable to send email.' });
            }
            return null;

        }
        res.status(404).json({ error: 'This email cannot found. Please enter valid email.' });



    } catch (error) {

    }
});
//reset password
const resetPassword = asyncHandler(async (req, res) => {
    try {
        const { token, id, password } = req.body;
        const isToken = verifyResetToken(token);
        if (isToken !== null) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const data = { password: hashedPassword, id };
            const result = await User.updatePassword(data);
            if (result === 1) {
                res.status(200).json({ message: 'New password updated!' });
                return
            }
            res.status(400).json({ error: 'New password update error!' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
});

const generateResetToken = (email) => {
    const secretKey = 'visionarydv.com';
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
    return token;
};
// Verify Token
const verifyResetToken = (token) => {
    const secretKey = 'visionarydv.com';
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        // Token verification failed
        return null;
    }
};

const GetAllBookingRequest = asyncHandler(async (req, res) => {
    logMessage('Get all booking request');
    try {
        const response = await User.GetAllBookingRequest();
        // console.log(`Hello: ${response}`);
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'An error occurred' });
    }
})

const GetBookingRequestByID = asyncHandler(async (req, res) => {
    const {id} = req.params;

    let responseData = {
        formData: '',
        pricing: ''
    }

    // get form Data
    try{
        const formData = await User.GetBookingFormData(id);
        responseData.formData = formData[0];

        // get pricing
        const pricing = await User.GetBookingPricing(formData[0].booking_id);
        console.log("Booking ID: ", formData[0].booking_id);
        console.log(pricing);

        const groupedPricing = [];

        pricing.map(item => {
            const date = item.date;
            

            const index = groupedPricing.findIndex(x => {
                const match = x.date.toString() === date.toString();
                return match
            });
            
            
            
            
            if(index === -1 || groupedPricing.length === 0){
                
                groupedPricing.push({
                    date: date,
                    options: [item]
                });
            }
            else{
                groupedPricing[index].options.push(item);
            }
            
        });



        responseData.pricing = groupedPricing;

        res.status(200).json(responseData);
    }
    catch(error){
        console.log(error);
        return res.status(400).json({ message: 'An error occurred' });
    }
    
})
    

module.exports = {
    addUser,
    GetBookingRequestByID,
    GetAllBookingRequest,
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
    resetPassword
}