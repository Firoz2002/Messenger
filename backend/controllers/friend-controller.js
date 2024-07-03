const jwt = require('jsonwebtoken');

const User = require('../models/user');

require('dotenv').config();
const jwtSecret = process.env.SECRET;

const addFriend = (req, res, next) => {

    try {
        User.findByIdAndUpdate( req.body.sentBy._id ,
            { $push: { friendsList: { friendId: req.body.sentTo._id, friendName: req.body.sentTo.username } } }
        )
        .then((data) => {
            User.findByIdAndUpdate(req.body.sentTo._id ,
                { $push: { friendsList: { friendId: req.body.sentBy._id, friendName: req.body.sentBy.username } } }
            )
            .then((data) => {
                res.status(200).json({
                    status: "Friend added successfully"
                })
            })
        })
    } catch (err) {
        console.log(err);

        res.status(401).json({
            message: "Some error occured",
            error: err
        })
    }
}

const getFriends = (req, res, next) => {
    
    const username = jwt.verify(req.cookies.jwt, process.env.SECRET).username;

    try {
        User.findOne({
            username: username
        })
        .then((data) => {
            const friendsList = [];

            data.friendsList.forEach(friend => {
                friendsList.push(friend.friendName);
            });
            res.send(friendsList);
        })
    } catch (err) {
        console.log(err);

        res.status(401).json({
            message: "Some error occured",
            error: err
        })
    }
}

module.exports = {
    addFriend,
    getFriends
}
