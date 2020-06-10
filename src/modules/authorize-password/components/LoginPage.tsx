import React from 'react';
import General, {AppProfile, Config} from '../../common';
import { Modal, Form, TextInput, InlineNotification } from 'carbon-components-react';
import {withTranslation, WithTranslation} from 'react-i18next';
import AuthAPI, {AuthAPIProvider} from '../../auth/services/AuthAPI';
import CredentialsAuthorizer from '../authorizers/CredentialAuthorizer';
import AuthConfig from '../../auth/services/AuthConfig';
import {Authorize } from '../../auth/store/actions/AuthActions';

class LoginPage extends React.Component<WithTranslation & any> {

    form;
    unload=false;
    state = {
        user: '',
        password: '',
        isLoading: false,
        validationErrors: {},
        hasInvalidCredentials: false
    }

    constructor(props)
    {
        super(props);
        this.form = React.createRef();

        this.resetValidationError = this.resetValidationError.bind(this);
    }

    componentWillUnmount()
    {
        this.unload = true;
    }

    componentDidUpdate(prevProps) {
        if (!this.unload) {
            if(prevProps.authUser !== this.props.authUser) {
                this.setState({isLoading: false});
                if(!this.props.authUser.isValidKey) this.setState({hasInvalidCredentials: true});
            }
        }
      }

    onClose = () => {
        this.props.dispatch({type:"AUTH_LOGIN_CANCEL"});
    }

    // Validate form inputs
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
        this.setState({isLoading: true, hasInvalidCredentials: false});
        if(this.validate()) 
        {
            this.props.dispatch(Authorize(new CredentialsAuthorizer({credential:this.state, resource: AppProfile.Resources[AuthConfig.servicekey]})));
        }
        else{
            this.setState({isLoading: false});
        }
    }

    resetValidationError(ev)
    {
        const errors = 
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
        subtitle={this.props.t('Username') + ": " + Config.credential.user + ' ' + this.props.t('Password') + ": " + Config.credential.password}
        title={this.props.t("Try")} className="bx--inline-notification-full-width" />
         {this.state.hasInvalidCredentials?
        <InlineNotification
        hideCloseButton={true}
        kind="error"
        subtitle={this.props.t("Invalid Credentials")}
        title={this.props.t("Ooops!")} className="bx--inline-notification-full-width" />: ""}
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