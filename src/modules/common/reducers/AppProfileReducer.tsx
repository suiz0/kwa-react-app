import profile from '../services/AppProfile';
import {authConstants} from '../../../data/constants';

let initialState = new profile();

export default (state, action) => {
    let newState;
    switch(action.type)
    {
        case "SET_LANG":
            newState = {
                ...state,
                lang: action.lang
            };
            break;
        
        case "GET_LANGS":
            newState = {
                ...state,
                langs: action.langs,
                lang: action.lang
            };
            break;
        case "START_LOADING":
            newState = {
                ...state,
                isLoading: true
            };
            break;

        case authConstants.ADD_REQUEST_VALIDATION:
            newState = {
                ...state,
                goto: '/login'
            }
            break;
        case "STOP_LOADING":
            newState = {
                ...state,
                isLoading: false
            }
            break;
        case "GET_PLUGINS":
                newState = {
                    ...state,
                    Resources: {plugins: 'plugins'}
                }
                break;
            
        default:
            newState= !state ? initialState: state;

    }

    return newState;
}