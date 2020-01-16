import { combineReducers } from 'redux';
import chatReducer from './chatReducer';
import configurationReducer from './configurationReducer';

export default combineReducers({
    chat: chatReducer,
    configuration: configurationReducer
})