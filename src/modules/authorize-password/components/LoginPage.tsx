import React from 'react';
import General, {AppProfile, Config} from '../../common';
import { Modal, Form, TextInput, InlineNotification } from 'carbon-components-react';
import {withTranslation, WithTranslation} from 'react-i18next';
import AuthAPI, {AuthAPIProvider} from '../../auth/services/AuthAPI';
import CredentialsAuthorizer from '../authorizers/CredentialAuthorizer';
import AuthConfig from '../../auth/services/AuthConfig';
import {Authorize_Password} from '../../auth/store/actions/AuthActions';

class LoginPage extends React.Component<WithTranslation & any> {

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
    }

    componentDidUpdate(prevProps)
    {
        if(this.props.authUser.authenticated) // this might change but for now is ok
            this.props.history.push('/');
    }

    onClose = () => {
        this.props.history.push('/');
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
            this.props.dispatch(Authorize_Password(this.props.history, new CredentialsAuthorizer({credential:this.state, resource: AppProfile.Resources[AuthConfig.servicekey]})));
            setTimeout(()=>{
                this.setState({isLoading: false});
            }, 1200);
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
         <InlineNotification
        hideCloseButton={true}
        iconDescription="describes the close button"
        kind="info"
        subtitle={this.props.t('User') + ": " + Config.credential.user + ' ' + this.props.t('Password') + ": " + Config.credential.password}
        title={this.props.t("Try")} className="bx--inline-notification-full-width" />
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