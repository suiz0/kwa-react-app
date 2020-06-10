import {Resource} from '../modules/common';
import plugins from '../data/uiplugins.json';


class UIPlugins {

    url = "";
    resource;
    props = {
        rows: [],
        headers: []
    }
    
    constructor(options) {

        this.url = "/uiplugins";
        this.resource = options.resource;
    }

    get(options?)
    {
        const opt = Object.assign({}, options ? options:{});
        Resource.mockData = plugins;

        opt.type="get";
        opt.url= this.url;
        return opt;
    }
}

const GetUIPlugins = (props?) => {
    const plugins =  new UIPlugins(props?props:null);
    return plugins.get();
}

export {UIPlugins as default, GetUIPlugins};