import IAuthorizer from "./IAuthorizer";

class TokenAuthorizer implements IAuthorizer {

    token;

    constructor(props)
    {
        this.token = props.token;
    }

    authorize(): Promise<any> {
        return Promise.resolve();
    }

}

export default TokenAuthorizer;