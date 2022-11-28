const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    user: {
        type: String
    },
    pwd: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    blocked: {
        type: Boolean,
        default: false
    },
    rules: [
        {type: String}
    ],
    email: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);