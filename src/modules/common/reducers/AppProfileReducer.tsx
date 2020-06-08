import profile from '../services/AppProfile';

let initialState = new profile();

export default (state, action) => {
    switch(action.type)
    {
        case "SET_LANG":
            console.log("applying profile state");
            return {
                ...state,
                lang: action.lang
            };

        default:
            return initialState;
    }
}