import { resolve } from "url";

const setLang = lang => dispatch => {
    dispatch({type:"SET_LANG", lang: lang});
};

const setLangs = (langs: []) => dispatch => {
    dispatch({type: "SET_LANGS", langs: [...langs]});
}

export default {
    setLang,
    setLangs
}