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
        case authConstants.ADD_REQUEST_VALIDATION:
            return {
                ...state,
                goto: '/login'
            }
            break;
        default:
            return AppProfileReducer(state, action);
            break;
    }
}