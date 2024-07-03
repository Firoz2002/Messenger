const jwt = require('jsonwebtoken');

const User = require('../models/user');
const FriendRequest = require('../models/friendship');

require('dotenv').config();
const jwtSecret = process.env.SECRET;

const sendFriendRequest = (req, res, next) => {

    const sentTo = req.body.username;
    const sentBy = jwt.verify(req.cookies.jwt, process.env.SECRET).username;

    try {
        User.find({
            $or: [{username: sentBy}, {username: sentTo}]
        })
        .then((data) => {
            const user1 = { _id: data[0]._id, username: data[0].username };
            const user2 = { _id: data[1]._id, username: data[1].username };
            FriendRequest.create({
                sentBy: (user1.username === sentBy) ? user1 : user2,
                sentTo: (user1.username === sentTo) ? user1 : user2,
                status: 'pending'
            })
            .then((data) => {
                res.status(200).json({
                    status: "Friend request sent successfully"
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

const getFriendRequests = (req, res, next) => {
    const username = jwt.verify(req.cookies.jwt, process.env.SECRET).username;

    try {
        FriendRequest.find({
            $or: [{ "sentBy.username": username }, { "sentTo.username": username}]
        })
        .then((data) => {
            res.status(200).json(data);
        })
    } catch (err) {
        console.log(err);

        res.status(401).json({
            message: "Some error occured",
            error: err
        })
    }
}

const updateFriendRequest = (req, res, next) => {

    const requestId = req.body.requestId;

    try {
        FriendRequest.findByIdAndUpdate({ 
                _id: requestId
            },{
                status: req.body.updateStatusTo
            })
        .then((data) => {
            if(data.status === 'accepted') {
                fetch('http://localhost:4000/api/add-friend', {
                    method: "POST",
                    headers: {
                      'Content-Type': 'application/json',
                      'Cookie': `jwt=${req.body.jwt}`
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        sentBy: data.sentBy,
                        sentTo: data.sentTo
                    })
                })
                .then(res => res.json())
                .then((data) => {
                    res.status(200).json(data);
                })
            }
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
    sendFriendRequest,
    getFriendRequests,
    updateFriendRequest,
}