import {authConstants} from '../../data/constants';
import {AppProfileReducer} from '../../modules/common';

export default (state, action) => {
    switch(action.type) {
        case "GET_LANGS":
            return {
                ...state,
                langs: action.langs,
                lang: action.lang
            };
            break;
        case "AUTH_LOGIN_LOAD":
        case authConstants.ADD_REQUEST_VALIDATION:
            return {
                ...state,
                path: '/login'
            }
            break;
        case "AUTH_LOGIN_CANCEL":
        case authConstants.REMOVE_REQUEST_VALIDATION:
            return {
                ...state,
                path:'/'
            }
            break;
        default:
            return AppProfileReducer(state, action);
            break;
    }
}