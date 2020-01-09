const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

io.on('connection', function(socket){
    console.log('User connected');

    socket.on('disconnect', function(){
        console.log('User disconnected');
    });
});

http.listen(PORT, function(){
    console.log(`Server running on *:${PORT}`);
});