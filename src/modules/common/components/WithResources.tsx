import React from 'react';
import Resource from '../services/Resource';
import AppProfile from '../services/AppProfile';

const getResourceList = (services) => {
    let resources = {};
    services.forEach((service) => {
        if(!AppProfile.Resources[service.key])
            AppProfile.Resources[service.key] = new Resource({baseURL: service.url});
    });

    return AppProfile.Resources;
}

const withResources = (WrappedComponent) => { 
    return class extends React.Component {
        constructor(props)
        {
            super(props);
        }

        render() {
            return(<WrappedComponent {...this.props}  resources={getResourceList(this.props["services"])}/>)
        }
    }
}

export {getResourceList};
export default withResources;