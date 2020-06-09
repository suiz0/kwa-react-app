import Models from '../../models';

const setLang = lang => dispatch => {
    dispatch({type:"SET_LANG", lang: lang});
};

const getLangs = (resource) => dispatch => {
    Models.GetLanguage({resource: resource})
    .then((response) => {
      dispatch({type: "GET_LANGS", lang: response.active, langs: [...response.languages]});
    });
}

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
    getLangs,
    startLoading,
    stopLoading,
    getUIplugins
}