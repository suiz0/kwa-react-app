const setLang = lang => dispatch => {
    dispatch({type:"SET_LANG", lang: lang});
};

const startLoading = dispatch => {
    dispatch({type: "START_LOADING"});
};

const stopLoading = dispatch => {
    dispatch({type: "STOP_LOADING"});
}

const getUIplugins = dispatch => {
    dispatch({type: "GET_PLUGINS"});
}

export default {
    setLang,
    startLoading,
    stopLoading,
    getUIplugins
}