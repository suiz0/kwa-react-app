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

const AuthAPIProvider: {instance: null | AuthAPI, create: Function} = {
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
    

    // Get Auth Scheme
    getScheme(options?): Promise<AuthScheme> {
        let opts = Object.assign({}, options||{});

        if(this.resource===null) this.resource = AppProfile.Resources[AuthConfig.servicekey];

        opts.type="get";
        opts.url = "/authorizationplugin/";
        General.Resource.mockData = scheme;
        return this.resource.sendRequest(opts);
    }

    getPlatformSettings(options?): Promise<any> {
        let opts = Object.assign({}, options||{});

        if(this.resource===null) this.resource = AppProfile.Resources[AuthConfig.servicekey];
        opts.type="get";
        opts.url = "/platformsettings/";
        General.Resource.mockData = platformSettings;
        return this.resource.sendRequest(opts);
    }



    // Validate current session
    public authorize(authorizer: IAuthorizer) 
    {
        return authorizer.authorize()
        .catch((response) => {
            return {isValid: false, message: response.message};
        });
    }
}

export {AuthorizerMaker, AuthAPIProvider, GetAuthHeaders}
export default AuthAPI;