import profile from '../../services/AppProfile';
import actions from '../ProfileConstants';

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
        case actions.START_LOADING:
            newState = {
                ...state,
                isLoading: true
            };
            break;
        case actions.STOP_LOADING:
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