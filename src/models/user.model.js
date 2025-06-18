const mongoose = require('mongoose');
// const bycrpt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstname: {},
    lastname: {},
    email: {},
    password: {},
    role: {},
});

const User = mongoose.model('Spend-Sense-User', userSchema);

module.exports = User;
