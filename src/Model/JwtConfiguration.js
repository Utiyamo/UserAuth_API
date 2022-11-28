const mongoose = require('mongoose');
const jwtSchema = new mongoose.Schema({
    key: {
        type: String
    },
    expiresTime: {
        type: Number,
        default: 1800
    }
});

module.exports = mongoose.model('jwtConfig', jwtSchema);