import IAuthorizer from "./IAuthorizer";
import {Resource} from '../../common';
import AuthorizeResponse from '../data/authorize.json'
import AuthorizeError from '../data/authorizeError.json'
import {Config} from '../../common';

class CredentialsAuthorizer implements IAuthorizer{
    credential: any;
    resource;
    constructor(props) {
        this.credential = props.credential;
        this.resource = props.resource;
    }

    authorize(): Promise<any> {
        let options = {
            url: "/users/authorize",
            type: "post"
        };


        Resource.mockData = AuthorizeError;console.log(Config);
        if(this.credential.user === Config.credential.user && 
        this.credential.password === Config.credential.password)

        {
            Resource.mockData = AuthorizeResponse;
        }
        
        console.log("Sending credential login request");
        return this.resource.sendRequest(options);
    }
    
}

export default CredentialsAuthorizer;