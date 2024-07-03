const {getUsers, users} = require('./getUsers');

const { getRoom, createRoom } = require('../controllers/room-controller');

let onlineUsers = [];

function socket(io) {
    io.on('connection', (socket) => {

        socket.on('user-online', (data) => {
            if(!onlineUsers.some((user) => user.userId === data.username)) {
                onlineUsers.push({userId: data.username, socketId: socket.id});
            }

            io.emit('online-users', onlineUsers);
        })

        socket.on('joined-user', async (data) =>{

            var room = await getRoom(data);

            if(!room) {
                room = await createRoom(data);
            }
            
            var user = {};
            user[socket.id] = data.username;

            if(users[room.roomId]){
                users[room.roomId].push(user);
            }
            else{
                users[room.roomId] = [user];
            }

            socket.join(room.roomId);

            io.to(room.roomId).emit('joined-user', {username: data.username, roomId: room.roomId});           
            io.emit('online-users', getUsers(users[room.roomId]));
        })

        socket.on('load-chat', (data) => {
            var rooms = Array.from(socket.rooms);
            var socketId = rooms[0];
            io.to(socketId).emit('chat', data);
        })
        
        socket.on('chat', (data) =>{
            io.to(data.roomId).emit('chat', data);
        })

        
        socket.on('typing', (data) => {
            socket.broadcast.to(data.roomname).emit('typing', data.username)
        })
        
        socket.on('disconnecting', ()=>{
            onlineUsers = onlineUsers.filter((user) => user.socketId != socket.id);
            io.emit('online-users', onlineUsers)
        })
    })
}

module.exports = socket;