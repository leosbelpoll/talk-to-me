import { SET_RECEIVE_NOTIFICATIONS, ERROR } from "./types";

export const setReceiveNotifications = () => dispatch => {
    // some logic

    return dispatch({
        type: SET_RECEIVE_NOTIFICATIONS,
        payload: false
    });
};

export const setError = () => dispatch => {
    // some logic

    return dispatch({
        type: ERROR,
        payload: {
            message: "Some fake configuration ERROR for now"
        }
    });
};
