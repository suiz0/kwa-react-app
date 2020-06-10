import General from '../../common';
import scheme from '../data/scheme.json';
import platformSettings from '../data/platformsettings.json';
import AuthScheme from '../models/IAuthScheme';
import IAuthorizer from '../authorizers/IAuthorizer';
import TokenAuthorizer from '../authorizers/TokenAuthorizer';
import KeyAuthorizer from '../authorizers/KeyAuthorizer';
import AuthConfig from '../services/AuthConfig';
import {AppProfile} from '../../common';

// Factory Method
const AuthorizerMaker = (): IAuthorizer | null => {
    //General.SetItem('token', 'hardtoken'); //REMOVE THIS LATER
    //General.RemoveItem('auth.apikey'); //REMOVE THIS LATER
    //General.RemoveItem('token'); //REMOVE THIS LATER
    switch(true) {
        case General.GetItem('auth.apikey') != null:
            return new KeyAuthorizer({key: General.GetItem('auth.apikey'), resource: AppProfile.Resources[AuthConfig.servicekey]});
            break;
        case General.GetItem('token') != null:
            return new TokenAuthorizer({token:General.GetItem('token'), resource: AppProfile.Resources[AuthConfig.servicekey]});
            break;
        default:
            return null;
    }

    return null;
}

const AuthAPIProvider: {instance: null | AuthAPI, create:(options?:any)=>AuthAPI} = {
    instance: null,
    create: function(options): AuthAPI {
        if(this.instance === null)
        {
            this.instance = new AuthAPI(options);
        }
        return this.instance;
    }
}
 const GetAuthHeaders = () => {
    return {"Authorizaton": "VENAFI" + General.GetItem("auth.apikey")};
}



// Auth API Service class
class AuthAPI
{
    resource;

    constructor(props)
    {
        this.resource = props? props.resource:null;
    }

    fetch(options) {
        return this.resource.sendRequest(options);
    }

    // Get Auth Scheme
    getScheme(options?): Promise<AuthScheme> {
        const opts = Object.assign({}, options||{});

        if(this.resource===null) this.resource = AppProfile.Resources[AuthConfig.servicekey];

        opts.type="get";
        opts.url = "/authorizationplugin/";
        General.Resource.mockData = scheme;
        return this.resource.sendRequest(opts);
    }

    getPlatformSettings(options?): Promise<any> {
        const opts = Object.assign({}, options||{});

        if(this.resource===null) this.resource = AppProfile.Resources[AuthConfig.servicekey];
        opts.type="get";
        opts.url = "/platformsettings/";
        General.Resource.mockData = platformSettings;
        console.log('MockedData', General.Resource.mockData);
        return this.resource.sendRequest(opts);
    }



    // Validate current session
    public authorize(authorizer: IAuthorizer) 
    {
        return authorizer.authorize()
        .then((response)=>{
            General.RemoveItem("token")
            General.SetItem("auth.apikey", response.key);
            General.SetItem("auth.expiresat", response.expiresat);

            console.log("Applying Auth Headers for subsequent requests");
            this.resource.setGetHeaders(GetAuthHeaders());

            return response;
        })
        .catch((response) => {
            return {isValid: false, message: response.message};
        });
    }
}

export {AuthorizerMaker, AuthAPIProvider, GetAuthHeaders}
export default AuthAPI;