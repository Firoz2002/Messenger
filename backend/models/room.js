const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    user1: {
        type: String,
        require: true,
    },
    user2: {
        type: String,
        require: true,
    },
    roomId: {
        type: String,
        require: true,
        unique: true,
    }
}, {timestamps: true});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;