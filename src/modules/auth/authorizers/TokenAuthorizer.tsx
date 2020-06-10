import IAuthorizer from "./IAuthorizer";
import {Resource} from '../../common';
import AuthorizeResponse from '../data/authorize.json'
import AuthorizeError from '../data/authorizeError.json'


class TokenAuthorizer implements IAuthorizer {

    token;
    resource;

    constructor(props)
    {
        this.token = props.token;
        this.resource = props.resource;
    }

     GetTokenHeaders = () => {
        return {"Authorizaton": "BEARER" + this.token};
    }

    authorize(): Promise<any> {
        const options = {
            url: '/authenticationToken/session',
            type: 'post',
            headers: this.GetTokenHeaders()
        };

        Resource.mockData = AuthorizeResponse;
        this.resource.setGetHeaders(this.GetTokenHeaders());
        return this.resource.sendRequest(options);
    }

}

export default TokenAuthorizer;