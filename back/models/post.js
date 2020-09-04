const mongoose = require('mongoose');
const config = require('../config/db');

const PostScheme = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    checked: {
        type: Boolean
    }
})

const Post = mongoose.model('post', PostScheme);
module.exports = Post
