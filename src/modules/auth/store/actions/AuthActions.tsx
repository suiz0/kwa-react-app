import { authConstants } from '../../../../data/constants';
import { AuthorizerMaker, AuthAPI, AuthAPIProvider} from '../..';
import General, {  Resource } from '../../../common';

export const getCurrentSchema = (auth:AuthAPI, resource:Resource) => async(dispatch:any)=>
{
    auth.getScheme()
    .then(response => { 
            if(response.IsAuthorizePassword){
                dispatch({type: authConstants.SET_AUTHORIZE_PASSWORD_SCHEME});
                const authorizer = AuthorizerMaker();

                if(!authorizer)
                {
                    dispatch(RequestAuthentication());
                } else
                {
                   dispatch(Authorize(authorizer));
                }
            }
        }
    );
}

// Makes request with authorization headers, once authenticated all subsequent API calls should call this
export const MakeRequest = (options, metadata) => async(dispatch, getState)=> {
    const {validetaApiExp, expireTimeout} = getState().AuthUser;
    const auth = AuthAPIProvider.create();
    if(validetaApiExp) {
        if(Date.now() > expireTimeout){
            General.RemoveItem("token")
            General.RemoveItem("auth.apikey");
            General.RemoveItem("auth.expiresat");
            dispatch({ 
                type: authConstants.SET_UNAUTHENTICATED
            })
            dispatch({type: "AUTH_LOGIN_LOAD"});
        }else{
            dispatch(IncreaseExpirationTimeout());
            auth.fetch(options)
            .then((response)=> {
                dispatch(success(response, metadata));
            })
            .catch(errorMsg=>error(errorMsg, metadata))
        }
    }

    function success(response, metadata) {return{type: "REQUEST_SUCCESS", data: response, ...metadata}}
    function error(error, metadata) {return {type: "REQUEST_ERROR", message: error, ...metadata}}
}
export const Authorize = (authorizer) => async(dispatch: any)=>
{
    //authorizer should have the instance created in factory, Key or Token authorizer
    const auth = AuthAPIProvider.create();

    auth.authorize(authorizer)
    .then(
    response =>{
        if(response.isvalid) {
            dispatch(SetValidApiKey(response.expiresat));
            dispatch(RemoveAuthentication());
            dispatch(SetExpirationTimeout(auth));

        }else{
            dispatch(SetInValidApiKey());
            dispatch({ 
                type: authConstants.SET_UNAUTHENTICATED
            })
            console.log('Invalid Response');
            General.RemoveItem("token")
            General.RemoveItem("auth.apikey");
            General.RemoveItem("auth.expiresat");
        }
    }
    );
}

export const SetValidApiKey = (expireTime) => async(dispatch: any)=>
{
    dispatch({ type: authConstants.APIKEY_VALID, 
        sessionExpire: Date.now() + expireTime });
}

export const SetInValidApiKey = () => async(dispatch: any)=>
{
    dispatch({ type: authConstants.APIKEY_NOT_VALID });
}

export const RemoveAuthentication = () => async(dispatch: any)=>
{
    dispatch({ type: authConstants.REMOVE_REQUEST_VALIDATION });
}

export const RequestAuthentication = () => async(dispatch: any)=>
{
    dispatch({ type: authConstants.ADD_REQUEST_VALIDATION });
}

export const SetExpirationTimeout = (auth:AuthAPI) => async(dispatch: any)=>
{
    auth.getPlatformSettings()
            .then(
                response => { 
                    //Prepare api key expiration for subsequent calls
                    dispatch({ 
                        type: authConstants.SET_EXPIRATION_TIMEOUT, 
                        timeout: response.timeout
                    })
                    dispatch({ 
                        type: authConstants.SET_AUTHENTICATED
                    })
                    dispatch({ 
                        type: authConstants.VALIDATE_APIKEY_EXP
                    })
                }
            );
   
}

export const IncreaseExpirationTimeout = () => (dispatch: any, getState)=>
{
    dispatch({ type: authConstants.INCREASE_TIMEOUT, 
        sessionExpire: Date.now() + getState().AuthUser.increaseTimeout });
}