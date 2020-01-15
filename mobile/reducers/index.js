import { combineReducers } from 'redux';
import chatReducer from './chatReducer';
import configurationsReducer from './configurationsReducer';

export default combineReducers({
    chat: chatReducer,
    configurations: configurationsReducer
})