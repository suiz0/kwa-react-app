import React from 'react';
import {AuthAPIProvider} from '../services/AuthAPI';

// Registers auth service and passed down as a property
const withAuth = (WrappedComponent) => {
    return class extends React.Component {
        constructor(props)
        {
            super(props);         
        }
        render() {
            // The provider uses the auth config key to identify the resource to attach
            return (<WrappedComponent {...this.props} auth={AuthAPIProvider.create()}  />
            );
        }
    }
}

export default withAuth;