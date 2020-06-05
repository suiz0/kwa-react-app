import General from '..';

class Resource
{
    baseURL: string;
    GetHeadersHandler: Function = ()=>{};

    static timeout: number = 1000;
    static mockData:any;

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
        let timeout = options && options.timeout? options.timeout:1000;
        let customHeaders = this.GetHeadersHandler();

        if(!options.type) options.type = "GET";

        if(customHeaders)
        {
            if(!options.headers) options.headers ={};
            options.headers = Object.assign(options.headers, customHeaders);
        }

        let promise = new Promise((resolve, reject) => {
            // Clousure
            let mockData = Resource.mockData;
            this.logRequest(options);
            setTimeout(() => {
                resolve(mockData);
            }, timeout);
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