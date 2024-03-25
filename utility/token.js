const jwt = require('jsonwebtoken');

const GenerateResetToken = (email) => {
    const secretKey = 'visionarydv.com';
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
    return token;
};

module.exports = {GenerateResetToken};