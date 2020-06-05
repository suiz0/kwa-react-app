interface IConfiguration {
    services?:any,
    credential?:any,
    client: string,
    i18nResources:{}
}

const config:IConfiguration = {client: "none", i18nResources: {}};

function load() {
    return fetch('config.json')
    .then(response=> response.json())
    .then(newconfig => {
        for(let prop in newconfig)
        {
            config[prop] = newconfig[prop];
        }

        return config;
    });
}


export {load};
export default config;