import AuthAPI, {AuthorizerMaker, AuthAPIProvider} from './services/AuthAPI';
import AuthConfig from './services/AuthConfig';
import IAuthScheme from './models/IAuthScheme';
import IAuthorizer from './authorizers/IAuthorizer';
import withAuth from './components/WithAuth';

export {AuthAPI, AuthorizerMaker, AuthAPIProvider, withAuth};
export type AuthScheme = IAuthScheme;
export type Authorizer = IAuthorizer;

// Module entry point
export default {
    AuthConfig: AuthConfig,
    AuthorizerMaker: AuthorizerMaker,
    AuthAPIProvider: AuthAPIProvider,
    name: "Auth"
}