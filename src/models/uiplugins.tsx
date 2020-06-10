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

    get(options?): Promise<any>
    {
        console.log('If I am here I am good')
        const opt = Object.assign({}, options ? options:{});
        Resource.mockData = plugins;

        opt.type="get";
        opt.url= this.url;
        return this.resource.sendRequest(opt);
    }
}

const GetUIPlugins = (props?) => {
    const plugins =  new UIPlugins(props?props:null);
    return plugins.get();
}

export {UIPlugins as default, GetUIPlugins};