const mongoose = require('mongoose');
const config = require('../config/db');

const UserScheme = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('user', UserScheme);
module.exports = User