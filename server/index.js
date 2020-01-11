const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

io.on('connection', function(socket){
    console.log('Socket connected', socket.id, socket.handshake.query);

    socket.on('sendMessage', function(message){
        const date = new Date();
        io.emit("arrivedMessage", { ...message, id: date.getTime() });
    });

    socket.on('disconnect', function(socket){
        console.log('Socket disconnected', socket.id);
    });
});

http.listen(PORT, function(){
    console.log(`Server running on *:${PORT}`);
});