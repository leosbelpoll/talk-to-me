const location = require("./utils/coordenates")
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

const messages = [];
const users = [];

io.on('connection', function(socket){
    console.log('Socket connected', socket.id, socket.handshake.query);
    const { id, handshake } = socket;
    users.unshift({
        id,
        username: handshake.query.username,
        slogan: handshake.query.slogan
    });

    io.emit("updatedUsers", users);

    socket.on('createMessage', function(message){
        const date = new Date();
        messages.unshift({ id: date.getTime(), ...message });
        io.emit("newMessage", [...messages].reverse() );
    });

    socket.on('setLocation', function(location){
        console.log('S', location);
    });

    socket.on('disconnect', function(socket){
        console.log('Socket disconnected', socket.id);
    });
});

http.listen(PORT, function(){
    console.log(`Server running on *:${PORT}`);
});