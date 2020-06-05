import LoginPage from './components/LoginPage';
import AuthAPI, {AuthorizerMaker, AuthAPIProvider} from './services/AuthAPI';
import AuthConfig from './services/AuthConfig';
import IAuthScheme from './models/IAuthScheme';
import IAuthorizer from './authorizers/IAuthorizer';
import withAuth from './components/WithAuth';
import CredentialsAuthorizer from './authorizers/CredentialAuthorizer';

export {AuthAPI, AuthorizerMaker, CredentialsAuthorizer, AuthAPIProvider, withAuth};
export type AuthScheme = IAuthScheme;
export type Authorizer = IAuthorizer;

// Module entry point
export default {
    AuthConfig: AuthConfig,
    AuthorizerMaker: AuthorizerMaker,
    AuthAPIProvider: AuthAPIProvider,
    name: "Auth"
}