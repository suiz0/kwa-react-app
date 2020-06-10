import profile from '../../services/AppProfile';
import actions from '../ProfileConstants';
//import {authConstants} from '../../../../data/constants';

const initialState = new profile();

export default (state, action) => {
    let newState;
    switch(action.type)
    {
        case actions.SET_LANG:
            newState = {
                ...state,
                lang: action.lang
            };
            break;
        
        /*case "GET_LANGS":
            newState = {
                ...state,
                langs: action.langs,
                lang: action.lang
            };
            break;*/
        case actions.START_LOADING:
            newState = {
                ...state,
                isLoading: true
            };
            break;

        /*case authConstants.ADD_REQUEST_VALIDATION: // This needs to be moved to the app folder
            newState = {
                ...state,
                goto: '/login'
            }
            break;*/
        case "STOP_LOADING":
            newState = {
                ...state,
                isLoading: false
            }
            break;      
        default:
            newState= !state ? initialState: state;

    }

    return newState;
}