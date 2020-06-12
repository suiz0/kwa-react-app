import contants from '../ProfileConstants';

const setLang = lang => dispatch => {
    dispatch({type: contants.SET_LANG, lang: lang});
};

const startLoading = dispatch => {
    dispatch({type: contants.START_LOADING});
};

const stopLoading = dispatch => {
    dispatch({type: contants.STOP_LOADING});
}

export default {
    setLang,
    startLoading,
    stopLoading
}