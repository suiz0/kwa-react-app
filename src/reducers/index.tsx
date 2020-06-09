import {combineReducers} from 'redux';
import AppReducer from '../store/reducers/AppReducer';
import AuthReducer from '../modules/auth/store/reducers/AuthReducer';

export{AuthReducer, combineReducers};
export default combineReducers({AppProfile: AppReducer, AuthUser: AuthReducer});