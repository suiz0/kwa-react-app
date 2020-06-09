import General from '..';
import store from '../../../store/store';
import { rejects } from 'assert';
import {IncreaseExpirationTimeout, RequestAuthentication, SetInValidApiKey} from '../../auth/actions/AuthActions'

class Resource
{
    baseURL: string;
    GetHeadersHandler: any;

    static timeout: number = 1000;
    static mockData:any;
    static interceptors = {
        request: ()=>{},
        response: ()=>{}
    };

    constructor(options)
    {
        this.baseURL = options ? options.baseURL : null;
    }

    setGetHeaders(fn)
    {
        this.GetHeadersHandler = fn;
    }

    sendRequest(options): Promise<any>
    {
        const {isValidKey, authenticated, expireTimeout} = store.getState().authUser;
        if(isValidKey && authenticated){
            if(Date.now() > expireTimeout){
                store.dispatch(RequestAuthentication);
                store.dispatch(SetInValidApiKey);
                const promise = new Promise((resolve, reject) => {
                    console.log('Session Expired, Call Aborted')
                    setTimeout(() => {
                        reject('Session Expired, Call Aborted');
                    }, Resource.timeout);
                });
                return promise;
            }else{
                store.dispatch(IncreaseExpirationTimeout);
            }
              
        }
        let customHeaders = this.GetHeadersHandler;

        if(!options.type) options.type = "GET";

        if(customHeaders)
        {
            if(!options.headers) options.headers ={};
            options.headers = Object.assign(options.headers, customHeaders);
        }

        Resource.interceptors.request();
        let promise = new Promise((resolve, reject) => {
            // Clousure
            let mockData = Resource.mockData;
            this.logRequest(options);
            setTimeout(() => {
                Resource.interceptors.response();
                resolve(mockData);
            }, Resource.timeout);
        });

        return promise;
    }

    logRequest(options) {
        console.log("Sending " + options.type.toUpperCase() + " request to " + this.baseURL + options.url);
        if(options.headers)
        {
            console.log("With headers:");
            for(let key in options.headers) console.log(key + ":" + options.headers[key]);
        }
    }

    
}

export default Resource;