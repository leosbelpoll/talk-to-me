import { FETCH_USERS, ERROR } from "../actions/types";

const initialState = {
    users: [
        {username: "Freya", id: "1", slogan: "My first slogan"},
        {username: "Valentina", id: "2", slogan: "I will change my slogan too"},
        {username: "Ohio", id: "3", slogan: "Cdd sdjs djshdsdhsd as ajshajhs"},
    ],
    error: {}
};

export default function (state = initialState, { type, payload }){
    switch(type){
        case FETCH_USERS:
            return {
                ...state,
                users: payload,
            }
        case ERROR:
            return {
                ...state,
                error: payload
            }
        default:
            return state;
    }
}