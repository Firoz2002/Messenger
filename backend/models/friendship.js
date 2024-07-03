const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    sentBy: {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            username: {
                type: String,
                required: true
            }
    },
    sentTo: {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            username: {
                type: String,
                required: true
            }
    },
    status: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Request = mongoose.model('FriendRequest', friendshipSchema);
module.exports = Request;