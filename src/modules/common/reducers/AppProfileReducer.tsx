import profile from '../services/AppProfile';

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
        default:
            newState= !state ? initialState: state;
            
    }

    return newState;
}