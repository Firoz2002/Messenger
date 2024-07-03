const jwt = require('jsonwebtoken');
const Message = require('../models/message');

require('dotenv').config();
const jwtSecret = process.env.SECRET;

const saveMessage = async(req, res, next) => {
    const {sendTo, message} = req.body;

    const username = jwt.verify(req.cookies.jwt, process.env.SECRET).username;
    
    try {
        await Message.create({      
            sendBy: username,
            sendTo,
            message
        }).then(data => res.status(200).json({
            message: "Succesfully saved message",
            data
            })
        )
    } catch (err) {
        console.log(err);

        res.status(401).json({
            message: "Some error occured",
            error: err,
        })
    }
}

const getMessages = async(req, res, next) => {

    const fromUser = jwt.verify(req.cookies.jwt, process.env.SECRET).username;
    const toUser = req.query.to;

    var arr = [];
    try {
        var msgs = await Message.find({
            $and: [
                { $or: [{ "sendBy": toUser }, { "sendTo": toUser}] }, 
                { $or: [{ "sendBy": fromUser }, { "sendTo": fromUser}] }
            ]
        })
        .sort({$natural: -1}).limit(20);

        msgs.forEach( function(err, index) {
            arr.push({
                sendTo: msgs[index].sendTo,
                sendBy: msgs[index].sendBy,
                message: msgs[index].message,
                timestamp: msgs[index].createdAt
            });
        })
        arr = arr.reverse();
        res.send(arr);
        
    } catch (err) {
        console.log(err);

        res.status(401).json({
            message: "Some error occured",
            error: err
        })
    }
}

module.exports = {
    saveMessage,
    getMessages
}