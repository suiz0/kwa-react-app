import { authConstants } from '../../../../data/constants';
import { AuthScheme, AuthorizerMaker, withAuth, AuthAPI, AuthAPIProvider} from '../..';
import General, {  Resource } from '../../../common';
import {GetAuthHeaders} from '../../services/AuthAPI'

export const getCurrentSchema = (auth:AuthAPI, resource:Resource) => async(dispatch:any)=>
{
    auth.getScheme()
    .then(response => { 
            if(response.IsAuthorizePassword){
                dispatch({type: authConstants.SET_AUTHORIZE_PASSWORD_SCHEME});
                let authorizer = AuthorizerMaker();

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

// Makes request with authorization headers
export const MakeRequest = (options) => (dispatch, getState)=> {

    const {isValidKey, authenticated, expireTimeout} = getState().authUser;
    let auth = AuthAPIProvider.create();

    if(isValidKey && authenticated){
        if(Date.now() > expireTimeout){
            dispatch(RequestAuthentication);
            dispatch(SetInValidApiKey);
        }else{
            dispatch(IncreaseExpirationTimeout);
            auth.fetch(options)
            .then((response)=> {
                dispatch(success(response));
            })
            .catch(errorMsg=>error(errorMsg))
        }
    }

    function success(response) {return {type: "REQUEST_SUCCESS", data: response}};
    function error(error) {return {type: "REQUEST_ERROR", message: error}};
}

export const Authorize = (authorizer) => async(dispatch: any)=>
{
    let auth = AuthAPIProvider.create();

    auth.authorize(authorizer)
    .then(
    response =>{
        if(response.isvalid) {
            dispatch(SetValidApiKey(response.expiresat));
            dispatch(RemoveAuthentication());
            dispatch(SetExpirationTimeout(auth));

        }else{
            dispatch(SetInValidApiKey());
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

export const SetExpirationTimeout = (auth:AuthAPI) => (dispatch: any)=>
{
    auth.getPlatformSettings()
            .then(
                response => { 
                    dispatch({ 
                        type: authConstants.SET_EXPIRATION_TIMEOUT, 
                        timeout: response.timeout
                    });
                    dispatch({ 
                        type: authConstants.SET_AUTHENTICATED
                    });
                }
            );
   
}

export const IncreaseExpirationTimeout = (auth:AuthAPI) => (dispatch: any, getState)=>
{
    dispatch({ type: authConstants.INCREASE_TIMEOUT, 
        sessionExpire: Date.now() + getState().auth.increaseTimeout });
}