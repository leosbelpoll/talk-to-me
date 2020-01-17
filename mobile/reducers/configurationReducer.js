import { SET_RECEIVE_NOTIFICATIONS, ERROR } from "../actions/types";

const initialState = {
    receiveNotifications: false
};

export default function(state = initialState, { type, payload }) {
    switch (type) {
        case SET_RECEIVE_NOTIFICATIONS:
            return {
                ...state,
                users: payload
            };
        case ERROR:
            return {
                ...state,
                error: payload
            };
        default:
            return state;
    }
}
