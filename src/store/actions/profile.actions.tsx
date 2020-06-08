import { resolve } from "url";

const setLang = lang => dispatch => {
        return new Promise((resolve, reject) => {
            dispatch({type:"SET_LANG", lang: lang});
            resolve();
        });
};

const setLangs = (langs: []) => {

}

export default {
    setLang
}