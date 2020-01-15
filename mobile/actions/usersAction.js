import { FETCH_USERS, ERROR } from "./types";

export const fetchUsers = () => dispatch => {

    // some logic

    return dispatch({
        type: FETCH_USERS,
        payload: [
            {username: "Freya", id: "1", slogan: "Jsbd    hjsdb  sdsds sdsdaf fgfg"},
            {username: "Valentina", id: "2", slogan: "Poejh sn djsnd s dsj djs dss dnbsd"},
            {username: "Ohio", id: "3", slogan: "Cdd sdjs djshdsdhsd as ajshajhs"},
            {username: "Tomas", id: "4", slogan: "ksd sjd as ajshajhs"},
            {username: "Leito", id: "5", slogan: "bla djshdsdhsd as ajshajhs"}
        ]
    });
};

export const setError = () => dispatch => {

    // some logic

    return dispatch({
        type: ERROR,
        payload: {
            message: "Some fake ERROR for now"
        }
    });
};
