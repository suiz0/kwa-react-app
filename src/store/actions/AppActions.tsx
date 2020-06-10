import Models from '../../models';
import {ProfileActions} from '../../modules/common';
import {MakeRequest} from '../../modules/auth/store/actions/AuthActions';

const getLangs = (resource) => dispatch => {
    Models.GetLanguage({resource: resource})
    .then((response) => {
      dispatch({type: "GET_LANGS", lang: response.active, langs: [...response.languages]});
    });
}

const getUIplugins = (resource) => (dispatch) => {
  dispatch(MakeRequest(Models.GetUIPlugins({resource: resource}), {reducer: "pluginlist"}))
}


const loadLogin = dispatch => {
  dispatch({type: "AUTH_LOGIN_LOAD"});
}

export default {
    ...ProfileActions,
    getLangs,
    getUIplugins,
    loadLogin
}