const config = {};

function load() {
    return fetch('config.json')
    .then(response=> response.json())
    .then(newconfig => {
        for(let prop in config)
        {
            delete config[prop];
        }

        for(let prop in newconfig)
        {
            config[prop] = newconfig[prop];
        }

        return config;
    });
}


export {load};
export default config;