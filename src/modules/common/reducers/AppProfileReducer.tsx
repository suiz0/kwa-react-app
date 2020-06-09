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
        
        case "SET_LANGS":
            newState = {
                ...state,
                langs: action.langs
            };
            break;
        default:
            newState= !state ? initialState: state;
            
    }

    return newState;
}