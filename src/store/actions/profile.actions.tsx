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

export default {
    setLang,
    getLangs
}