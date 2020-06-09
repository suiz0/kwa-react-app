import Models from '../../models';
import {ProfileActions} from '../../modules/common';

const getLangs = (resource) => dispatch => {
    Models.GetLanguage({resource: resource})
    .then((response) => {
      dispatch({type: "GET_LANGS", lang: response.active, langs: [...response.languages]});
    });
}

export default {
    ...ProfileActions,
    getLangs
}