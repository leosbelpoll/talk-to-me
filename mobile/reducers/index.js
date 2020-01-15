import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import configurationsReducer from './configurationsReducer';

export default combineReducers({
    users: usersReducer,
    configurations: configurationsReducer
})