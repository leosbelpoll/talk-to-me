import socketIO from "socket.io-client";

import {
    IO_START,
    IO_CONNECTED,
    IO_MESSAGE,
    IO_FAIL,
    IO_DISCONNECTED,
    IO_UPDATED_USERS,
    IO_UPDATED_ROOMS,
    IO_JOIN,
    IO_LEAVE,
    IO_NEW_USER_CONNECTED,
    IO_USER_DISCONNECTED
} from "./types";

let io;

export const ioStart = () => {
    return {
        type: IO_START
    };
};

export const ioConnected = () => {
    return {
        type: IO_CONNECTED
    };
};

export const ioJoin = user => {
    return {
        type: IO_JOIN,
        user
    };
};

export const ioLeave = () => {
    return {
        type: IO_LEAVE
    };
};

export const ioMessage = messages => {
    return {
        type: IO_MESSAGE,
        messages
    };
};

export const ioUpdatedUsers = users => {
    return {
        type: IO_UPDATED_USERS,
        users
    };
};

export const ioNewUserConnected = user => {
    return {
        type: IO_NEW_USER_CONNECTED,
        user
    };
};

export const ioUserDisconnected = socketId => {
    return {
        type: IO_USER_DISCONNECTED,
        socketId
    };
};

export const ioUpdatedRooms = rooms => {
    return {
        type: IO_UPDATED_ROOMS,
        rooms
    };
};

export const ioFail = error => {
    return {
        type: IO_FAIL,
        error
    };
};

export const ioDisconnected = () => {
    return {
        type: IO_DISCONNECTED
    };
};

export const onConnect = (url, user) => {
    io = socketIO.connect(url, { query: user });
    return dispatch => {
        dispatch(ioStart());
        io.on("connect_failed", err => {
            io.disconnect();
            dispatch(ioDisconnected());
            dispatch(ioFail(err));
        });
        io.on("connect_error", err => {
            io.disconnect();
            dispatch(ioDisconnected());
            dispatch(ioFail(err.message));
        });
        dispatch(ioConnected());
        dispatch(ioJoin(user));
    };
};

export const onJoin = user => {
    return dispatch => {
        dispatch(ioStart());
        io.emit("join", user, error => {
            if (error) {
                dispatch(ioFail(error));
            } else {
                dispatch(ioJoin(user));
            }
        });
    };
};

export const onLeave = user => {
    return dispatch => {
        io.emit("leave", user, error => {
            if (error) {
                dispatch(ioFail(error));
            } else {
                dispatch(ioLeave());
            }
        });
    };
};

export const onCreateMessage = (room, data) => {
    io.emit("createMessage", {
        room,
        data
    });
};

export const onNewMessage = cb => {
    console.log("Entre onNewMessage");
    return dispatch => {
        io.on("newMessage", messages => {
            dispatch(ioMessage(messages));
            if (cb) {
                cb();
            }
        });
    };
};

export const onUpdatedUsers = () => {
    return dispatch => {
        io.on("updatedUsers", users => {
            return dispatch(ioUpdatedUsers(users));
        });
    };
};

export const onNewUserConnected = () => {
    return dispatch => {
        io.on("newUserConnected", user => {
            return dispatch(ioNewUserConnected(user));
        });
    };
};

export const onUserDisconnected = () => {
    return dispatch => {
        io.on("userDisconnected", socketId => {
            return dispatch(ioUserDisconnected(socketId));
        });
    };
};

export const onUpdatedRooms = () => {
    return dispatch => {
        io.on("updatedRooms", rooms => {
            return dispatch(ioUpdatedRooms(rooms));
        });
    };
};

export const onDisconnect = () => {
    return dispatch => {
        io.disconnect();
        dispatch(ioDisconnected());
    };
};
