const bcrypt = require("bcryptjs");

const HashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

const ComparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

module.exports = { HashPassword, ComparePassword }