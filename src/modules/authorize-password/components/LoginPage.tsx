import React from 'react';
import General, {AppProfile} from '../../common';
import { Modal, Form, TextInput } from 'carbon-components-react';
import {withTranslation, WithTranslation} from 'react-i18next';
import AuthAPI, {AuthAPIProvider} from '../../auth/services/AuthAPI';
import CredentialsAuthorizer from '../authorizers/CredentialAuthorizer';
import AuthConfig from '../../auth/services/AuthConfig';
import { threadId } from 'worker_threads';
import store from '../../../store/store'


class LoginPage extends React.Component<WithTranslation> {

    form;
    authRequired;

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

        this.resetValidationError = this.resetValidationError.bind(this);
        this.authRequired = store.getState().authUser.requestAuthentication;    
    }

    onClose = () => {
        General.Mediator.publish("auth:login:close");
    }

    validate()
    {
        let ctrl: any;
        let isValid = true;
        const validationErrors = {};
        for(ctrl in this.form.current)
        {
            if(this.form.current[ctrl] && this.form.current[ctrl].nodeName && this.form.current[ctrl].nodeName === "INPUT")
                if(!this.form.current[ctrl].checkValidity()) {
                    const ctrlID = this.form.current[ctrl].id;
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
            this.setState({isLoading: false});
        }
    }

    resetValidationError(ev)
    {
        let errors = 
        {
            ...this.state.validationErrors,
            [ev.target.id]:null
        };

        this.setState({"validationErrors": errors});
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
            <div>
                {
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
                    onFocus={this.resetValidationError}
                />
            
                <TextInput
                    id="password"
                    invalid={this.state.validationErrors["password"]? true: false}
                    required
                    invalidText={this.props.t("Invalid password.")}
                    labelText={this.props.t("Password") as string}
                    placeholder={this.props.t("Enter your password")}
                    type="password"
                    onChange={this.setPassword}
                    onFocus={this.resetValidationError}
                />
        </form>
   </Modal>
   }
   </div>
        )
    }
}

export default withTranslation()(LoginPage);