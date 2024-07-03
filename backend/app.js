const cors = require('cors');
const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const connect = require('./config/database');

require('dotenv').config();
const port = process.env.PORT || 4000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(require("./routes/route"));

const server = app.listen(port, async () => {
    try {
        console.log(`Server Running on PORT: ${port}`);
        await connect();
        console.log('Mongodb connected');
    } catch (error) {
        console.log(error);
    }
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});
require('./utils/socket')(io); 