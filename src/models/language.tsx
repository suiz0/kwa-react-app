import {Resource} from '../modules/common';
import langData from '../data/languages.json';

class Language {

    url = "";
    resource;
    props = {
        active: '',
        languages: []
    }
    
    constructor(options) {

        this.url = "/terminology/language";
        this.resource = options.resource;
    }

    get(options?): Promise<any>
    {
        let opt = Object.assign({}, options ? options:{});
        Resource.mockData = langData;

        opt.type="get";
        opt.url= this.url;
        return this.resource.sendRequest(opt);
    }
}

const GetLanguage = (props?) => {
    let lang =  new Language(props?props:null);
    return lang.get();
}

export {Language as default, GetLanguage};