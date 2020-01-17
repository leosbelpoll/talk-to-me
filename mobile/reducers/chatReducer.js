import {
    IO_START,
    IO_CONNECTED,
    IO_MESSAGE,
    IO_FAIL,
    IO_DISCONNECTED,
    IO_NEW_USER_CONNECTED,
    IO_USER_DISCONNECTED,
    IO_UPDATED_USERS,
    IO_UPDATED_ROOMS,
    IO_JOIN,
    IO_LEAVE
} from "../actions/types";

const initState = {
    status: null,
    loading: false,
    error: null,
    user: null,
    messages: [],
    users: [],
    rooms: []
};

const ioStart = state => {
    return {
        ...state,
        loading: true,
        error: null,
        messages: []
    };
};

const ioConnected = state => {
    return {
        ...state,
        status: "connect",
        loading: false,
        error: null,
        user: null
    };
};

const ioJoin = (state, { user }) => {
    return {
        ...state,
        status: "join",
        loading: false,
        error: null,
        user
    };
};

const ioLeave = state => {
    return {
        ...state,
        status: "leave",
        loading: false,
        error: null,
        user: null
    };
};

const ioMessage = (state, { messages }) => {
    return {
        ...state,
        messages
    };
};

const ioUpdatedUsers = (state, { users }) => {
    return {
        ...state,
        users: users.filter(us => us.id != state.user.id)
    };
};

const ioNewUserConnected = (state, { user }) => {
    return {
        ...state,
        users: user.id === state.user.id ? state.users : [user, ...state.users]
    };
};

const ioUserDisconnected = (state, { socketId }) => {
    console.log("userDisconn", socketId);
    
    return {
        ...state,
        users: state.users.filter(us => us.socketId != socketId)
    };
};

const ioUpdatedRooms = (state, { rooms }) => {
    return {
        ...state,
        rooms
    };
};

const ioFail = (state, { error }) => {
    return {
        ...state,
        error
    };
};

const ioDisconnected = state => {
    return {
        ...state,
        status: "disconnect",
        loading: false,
        error: null,
        user: null,
        messages: [],
        users: []
    };
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case IO_START:
            return ioStart(state, action);
        case IO_CONNECTED:
            return ioConnected(state, action);
        case IO_JOIN:
            return ioJoin(state, action);
        case IO_LEAVE:
            return ioLeave(state, action);
        case IO_MESSAGE:
            return ioMessage(state, action);
        case IO_UPDATED_USERS:
            return ioUpdatedUsers(state, action);
        case IO_NEW_USER_CONNECTED:
            return ioNewUserConnected(state, action);
        case IO_USER_DISCONNECTED:
            return ioUserDisconnected(state, action);
        case IO_UPDATED_ROOMS:
            return ioUpdatedRooms(state, action);
        case IO_FAIL:
            return ioFail(state, action);
        case IO_DISCONNECTED:
            return ioDisconnected(state, action);
        default:
            return state;
    }
};

export default reducer;
