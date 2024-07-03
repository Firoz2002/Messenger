const jwt = require('jsonwebtoken');
const User = require('../models/user');

require('dotenv').config();
const jwtSecret = process.env.SECRET;

const profilePic = [
    'https://img.icons8.com/officel/16/user.png',
    'https://img.icons8.com/officel/80/guest-male.png',
    'https://img.icons8.com/color/96/person-female.png',
    'https://img.icons8.com/officel/80/person-female--v1.png',
    'https://img.icons8.com/officel/80/person-female--v2.png',
    'https://img.icons8.com/officel/80/administrator-male.png'
];

const createUser = (req, res, next) => {
    const {username, email, password} = req.body;

    try {
        User.findOne({
            $or: [
                {username: username}, {email: email}
            ]
        })
        .then((data) => {
            if(data) {
                res.send({
                        userExist: true
                })
            } else {
                User.create({
                    username,
                    email,
                    password,
                    profile: profilePic[Math.abs(Math.random()*6)],
                })
                .then((data) => {
                    res.send(data);
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

const getUser = (req, res, next) => {

    const username = req.query.username;

    try {
        User.findOne({
           username
        })
        .then((data) => {
            if(data) {
                res.send(data);
            } else {
                res.send({
                    userExist: false
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

const findUser = (req, res, next) => {

    const username = req.query.username;

    try {
        User.findOne({
           username
        })
        .then((data) => {
            if(data) {
                res.status(201).json({
                    userExist: true,
                    isFriend: data.friendsList.some((friend) => friend.friendName === jwt.verify(req.cookies.jwt, process.env.SECRET).username),
                    message: "Successfully fetched user",
                    username: data.username,
                })
            } else {
                res.status(403).json({
                    userExist: false,
                    message: "User does not exist"
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
    createUser,
    getUser,
    findUser
}

