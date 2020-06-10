import Models from '../../models';
import {ProfileActions} from '../../modules/common';

const getLangs = (resource) => dispatch => {
    Models.GetLanguage({resource: resource})
    .then((response) => {
      dispatch({type: "GET_LANGS", lang: response.active, langs: [...response.languages]});
    });
}

const loadLogin = dispatch => {
  dispatch({type: "AUTH_LOGIN_LOAD"});
}

export default {
    ...ProfileActions,
    getLangs,
    loadLogin
}