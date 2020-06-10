class Resource
{
    baseURL: string;
    GetHeadersHandler: any;

    static timeout = 1000;
    static mockData:any;
    static interceptors = {
        request: function(){console.log("Before requesr")},
        response: function(){console.log("After response")},
        validateExpiration: function(){console.log("validate response")}
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

        const customHeaders = this.GetHeadersHandler;
        if(!options.type) options.type = "GET";

        if(customHeaders)
        {
            if(!options.headers) options.headers ={};
            options.headers = Object.assign(options.headers, customHeaders);
        }

        Resource.interceptors.request();
        const promise = new Promise((resolve, reject) => {
            // Clousure
            const mockData = Resource.mockData;
            this.logRequest(options);
            setTimeout(() => {
                Resource.interceptors.response();
                Resource.interceptors.validateExpiration();
               
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
            for(const key in options.headers) console.log(key + ":" + options.headers[key]);
        }
    }
}

export default Resource;