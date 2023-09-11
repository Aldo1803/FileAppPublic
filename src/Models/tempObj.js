const mongoose = require('mongoose');

var tempObjSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true
    },
    file: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 300
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('TempObj', tempObjSchema);
