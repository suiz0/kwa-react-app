import React from 'react';
import {load} from '../services/Config';
import AppProfile from '../services/AppProfile';

declare type callback = (props:any) =>any

interface BootstrapComponentProps {
    ready: callback;
    profile: AppProfile;
    config: any
}

class Bootstrap extends React.Component<BootstrapComponentProps, {config: any, isloading: boolean, profile: AppProfile}>
{
    constructor(props)
    {
        super(props);
        this.state = {
            config: this.props.config,
            isloading: true,
            profile: this.props.profile
        };
    }

    componentDidMount()
    {
        load()
        .then((config) => {
            const profile = {
                ...this.state.profile,
                client: config.client
            }
            this.setState({isloading: false, "config": config, "profile": profile});
        });
    }

    render()
    {
        // When configuration is loaded executes ready method
        if(!this.state.isloading)
        {
            return this.props.ready({config:this.state.config, profile: this.state.profile});
        }

        // While configuration is loaded prints Loading "indicator"
        return <div>Loading...</div>;
    }
}

export default Bootstrap;