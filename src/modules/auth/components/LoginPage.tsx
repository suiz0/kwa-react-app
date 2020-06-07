import React from 'react';
import General, {AppProfile} from '../../common';
import { Modal, Form, TextInput } from 'carbon-components-react';
import {withTranslation, WithTranslation} from 'react-i18next';
import AuthAPI, {AuthAPIProvider} from '../services/AuthAPI';
import CredentialsAuthorizer from '../authorizers/CredentialAuthorizer';
import AuthConfig from '../services/AuthConfig';


class LoginPage extends React.Component<WithTranslation> {

    form;

    state = {
        user: '',
        password: '',
        isLoading: false,
        validationErrors: {}
    }

    constructor(props)
    {
        super(props);
        this.form = React.createRef();
    }

    onClose = () => {
        General.Mediator.publish("auth:login:close");
    }

    validate()
    {
        let ctrl: any;
        let isValid = true;
        let validationErrors = {};
        for(ctrl in this.form.current)
        {
            if(this.form.current[ctrl] && this.form.current[ctrl].nodeName && this.form.current[ctrl].nodeName === "INPUT")
                if(!this.form.current[ctrl].checkValidity()) {
                    let ctrlID = this.form.current[ctrl].id;
                    validationErrors[ctrlID] = "Invalid";
                    this.setState({"validationErrors": validationErrors})
                    isValid = false;
                }
        }
        return isValid;
    }

    onSend = () => {
        this.setState({isLoading: true});
        if(this.validate()) 
        {
            this.props['auth'].authorize(new CredentialsAuthorizer({credential:this.state, resource: AppProfile.Resources[AuthConfig.servicekey]}))
            .then((authorized) => {
                this.setState({isLoading: false});
                if(authorized.isvalid)
                {
                    this.onClose();
                }
                else{
                    console.log("Error authenticating");
                }
            });
        }
        else{

        }
    }

    setUser = (ev) => {
        this.setState({user: ev.target.value});
    }

    setPassword = (ev) => {
        this.setState({password: ev.target.value});
    }

    render()
    {
        return (
            <Modal open 
    primaryButtonText={this.props.t("Send")}
    secondaryButtonText={this.props.t("Cancel")}
    modalHeading = {this.props.t("Identify yourself")}
    modalLabel={this.props.t("Login")}
    onRequestClose={this.onClose}
    onRequestSubmit={this.onSend}
    primaryButtonDisabled={this.state.isLoading}
    hasForm
    >
        <form ref={this.form}>
                <TextInput
                    id="user"
                    required
                    invalid={this.state.validationErrors["user"]? true: false}
                    invalidText={this.props.t("Invalid username.")}
                    labelText={this.props.t("Username") as string}
                    placeholder={this.props.t("Enter your username")}
                    onChange= {this.setUser}
                />
            
                <TextInput
                    id="password"
                    invalid={this.state.validationErrors["user"]? true: false}
                    required
                    invalidText={this.props.t("Invalid password.")}
                    labelText={this.props.t("Password") as string}
                    placeholder={this.props.t("Enter your password")}
                    type="password"
                    onChange={this.setPassword}
                />
        </form>
   </Modal>
        )
    }
}

export default withTranslation()(LoginPage);