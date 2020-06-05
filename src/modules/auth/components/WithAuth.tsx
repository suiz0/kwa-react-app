import React from 'react';
import {AuthAPIProvider} from '../services/AuthAPI';

const withAuth = (WrappedComponent) => {
    return class extends React.Component {
        constructor(props)
        {
            super(props);
        }
        render() {
            return (<WrappedComponent {...this.props} auth={AuthAPIProvider.create()}  />
            );
        }
    }
}

export default withAuth;