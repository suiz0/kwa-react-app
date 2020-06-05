import React from 'react';
import {load} from '../services/Config';
import AppProfile from '../services/AppProfile';

interface BootstrapComponentProps {
    ready: Function;
    profile: AppProfile;
    config: {}
}

class Bootstrap extends React.Component<BootstrapComponentProps, {config: {}, isloading: boolean}>
{
    constructor(props)
    {
        super(props);
        this.state = {
            config: this.props.config,
            isloading: true
        };
    }

    componentDidMount()
    {
        load()
        .then((config) => {
            this.setState({isloading: false, "config": config});
            this.props.profile.client = config.client;
        });
    }

    render()
    {
        if(!this.state.isloading)
            return this.props.ready({config:this.state.config, profile: this.props.profile});

        return <div>Loading...</div>;
    }
    
}

export default Bootstrap;