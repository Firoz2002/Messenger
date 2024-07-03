const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        min: 3,
        max: 30,
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true
    },
    profile: {
        type: String
    }, 
    friendsList: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            friendName: {
                type: String,
                default: ''
            }
        }
    ]
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;