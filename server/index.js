const location = require("./utils/coordenates");
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 3000;

const messages = [];
let users = [];

io.on("connection", function(socket) {
    const {
        id: socketId,
        handshake: {
            query: { id, username, slogan }
        }
    } = socket;
    const newUserConnected = {
        id,
        socketId,
        username: username,
        slogan: slogan
    };

    socket.emit("updatedUsers", users);
    io.emit("newUserConnected", newUserConnected);

    users.push(newUserConnected);

    console.log("New user connected", newUserConnected);

    

    socket.on("createMessage", function(message) {
        const date = new Date();
        messages.unshift({ id: date.getTime(), ...message });
        io.emit("newMessage", [...messages].reverse());
    });

    socket.on("setLocation", function(location) {
        console.log("S", location);
    });

    socket.on("disconnect", function() {
        users = users.filter(us => us.socketId != socket.id);
        io.emit("userDisconnected", socket.id);
        console.log("Socket disconnected", socket.id);
    });
});

http.listen(PORT, function() {
    console.log(`Server running on *:${PORT}`);
});
