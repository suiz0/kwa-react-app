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

export const getCurrentSchemaTest = (auth:AuthAPI) => async(dispatch:any)=>
{
    auth.getScheme()
            .then(
                response => { 
                    if(response.IsAuthorizePassword){
                        console.log('Un Si de Prueba');
                    }
                        
                }
            );
   
}

// Makes request with authorization headers
export const MakeRequest = (options, metadata) => (dispatch, getState)=> {

    const {isValidKey, authenticated, expireTimeout} = getState().authUser;
    const auth = AuthAPIProvider.create();

    if(isValidKey && authenticated) {
        if(Date.now() > expireTimeout){
            dispatch(RequestAuthentication);
            dispatch(SetInValidApiKey);
        }else{
            dispatch(IncreaseExpirationTimeout);
            auth.fetch(options)
            .then((response)=> {
                dispatch(success(response, metadata));
            })
            .catch(errorMsg=>error(errorMsg, metadata))
        }
    }

    function success(response, metadata) {return {type: "REQUEST_SUCCESS", data: response, ...metadata}}
    function error(error, metadata) {return {type: "REQUEST_ERROR", message: error, ...metadata}}
}

export const Authorize = (authorizer) => async(dispatch: any)=>
{
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
                    console.log('getPlatformSettings',response);
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

export const IncreaseExpirationTimeout = () => async(dispatch: any, getState)=>
{
    dispatch({ type: authConstants.INCREASE_TIMEOUT, 
        sessionExpire: Date.now() + getState().AuthUser.increaseTimeout });
}


export const ValidateExpirationTimeout = () => async(dispatch: any, getState)=>
{
    const {validetaApiExp, expireTimeout} = getState().AuthUser;
        if(validetaApiExp){
            console.log('Validating api key exp');
            if(Date.now() > expireTimeout){
                console.log('Expired Key. Start Abortion');
                General.RemoveItem("token")
                General.RemoveItem("auth.apikey");
                General.RemoveItem("auth.expiresat");
                dispatch({ 
                    type: authConstants.SET_UNAUTHENTICATED
                })
                const promise = new Promise((resolve, reject) => {
                    console.log('Session Expired, Call Aborted')
                     reject(new Error('Session Expired, Please Sign In again to restore your session'))
                }).catch(alert);
                dispatch(RequestAuthentication());
                return promise;
            }else{
                dispatch(IncreaseExpirationTimeout());
            }
              
        }
   
}