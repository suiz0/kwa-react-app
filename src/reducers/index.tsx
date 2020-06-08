import {combineReducers} from 'redux';
import {AppProfileReducer} from '../modules/common';
import AuthReducer from '../modules/auth/reducers/AuthReducer';

export{AuthReducer, combineReducers};
export default combineReducers({AppProfile: AppProfileReducer, AuthUser: AuthReducer});