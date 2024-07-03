const crypto = require('crypto');
const Room = require('../models/room');

const createRoom = (data) => {
    try {
        const room = Room.create({
            user1: data.username,
            user2: data.roomname,
            roomId: crypto.randomInt(0, 10000000),
        })

        return room;
        
    } catch (err) {
        console.log(err);

        res.status(401).json({
            message: "Some error occured",
            error: err
        })
    }
}

const getRoom = async (data) => {
    try {

        const room = await Room.findOne({
            $or: [
                { $and: [{ "user1": data.username }, { "user2": data.roomname}] }, 
                { $and: [{ "user1": data.roomname }, { "user2": data.username}] }
            ]
        })

        return room;

    } catch (err) {
        console.log(err);

        res.status(401).json({
            message: "Some error occured",
            error: err
        })
    }
}

module.exports = {
    createRoom,
    getRoom,
}