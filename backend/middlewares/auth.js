const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const jwtSecret = process.env.SECRET;

const register =  async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);

        fetch('http://localHost:4000/api/create-user', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: req.body.username,
                email: req.body.email,
                password: hash
            })
        })
        .then(res => res.json())
        .then((data) => {       
            if(!data.userExist) {
                const maxAge = 3*60*60;
                const token = jwt.sign(
                    { id: data._id, username: req.body.username },
                    jwtSecret,
                    {
                        expiresIn: maxAge,
                    }
                );

                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: maxAge*100000,
                });

                res.status(200).json({
                    message: "User successfully created",
                })

            } else {
                res.status(403).json({
                    message: "User already exists",
                })
            }
        })

    } catch (err) {
        console.log(err);

        res.status(401).json({
            message: "Some error occured",
            error: err,
        })
    }

}

const login = (req, res, next) => {

    const { username, password } = req.body;

    try {
        fetch(`http://localHost:4000/api/get-user/?username=${username}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })
        .then(res => res.json())
        .then((data) => {
            bcrypt.compare(password, data.password).then(function (result) { 
                if (result) {
                    const maxAge = 3*60*60;
                    const token = jwt.sign(
                        {id: data._id, username: req.body.username},
                        jwtSecret,
                        {
                            expiresIn: maxAge,
                        }
                    );

                    res.cookie('jwt', token, {
                        httpOnly: true,
                        maxAge: maxAge*100000,
                    });
                    
                    res.status(201).json({
                        message: "Login Successful",
                    });
                } else {
                    res.status(403).json({
                        message: "Login Failed"
                    });
                }
            })
        })
    } catch (err) {
        console.log(err);

        res.status(400).json({
            message: "An error occurred",
            error: err,
        })
    }
}

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(token) {
            jwt.verify(token, jwtSecret, (err, decodedToken) => {
                if(err) {
                    return res.status(401).json({ message: "Not authorized" })
                } else {
                    next();
                }
            })
        } else {
            return res.status(401).json({
                message: "Not authorized, token not avaliable"
            })
        }
    } catch (err) {
        console.log(err);
        
        res.status(400).json({
            message: "Some error Occurred"
        })
    }
}

module.exports = {
    register,
    login,
    isAuthenticated
}