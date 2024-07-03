const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sendBy: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    sendTo: {
        type: String,
        require: true
    }
}, {timestamps: true});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;