import IAuthorizer from "./IAuthorizer";
import { Resource } from "../../common";
import AuthorizeResponse from '../data/authorize.json'

class KeyAuthorizer implements IAuthorizer {
    key;
    resource;
    
    constructor(props)
    {
        this.key = props.key;
        this.resource = props.resource;
    }

    authorize(): Promise<any> {
        let options = {
            url: '/key',
            type: 'get'
        };

        Resource.mockData = AuthorizeResponse;
        return this.resource.sendRequest(options);
    }
    
}

export default KeyAuthorizer;