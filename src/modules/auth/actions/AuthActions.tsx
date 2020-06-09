import { authConstants } from '../../../data/constants';
import { AuthScheme, AuthorizerMaker, withAuth, AuthAPI, AuthAPIProvider} from '../../auth';
import General, {  Resource } from '../../common';
import {GetAuthHeaders} from '../services/AuthAPI'

export const getCurrentSchema = (auth:AuthAPI, resource:Resource, history:any) => async(dispatch:any)=>
{
    auth.getScheme()
            .then(
                response => { 
                    if(response.IsAuthorizePassword){
                        dispatch({type: authConstants.SET_AUTHORIZE_PASSWORD_SCHEME});
                        let authorizer = AuthorizerMaker();
                        if(!authorizer)
                        {
                            dispatch(RequestAuthentication());
                        }else{
                            dispatch(Authorize_Password(history, authorizer));
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
export const Authorize_Password = (history:any, authorizer?) => async(dispatch: any)=>
{
    let auth = AuthAPIProvider.create();
        auth.authorize(authorizer)
        .then(
        response =>{
            if(response.isvalid) {
                dispatch(SetValidApiKey(response.expiresat));
                dispatch(RemoveAuthentication());                   
                dispatch(SetExpirationTimeout(auth));
                history.push('/'); // This seems pretty wrong! 

            }else{
                dispatch(SetInValidApiKey());
                console.log('Invalid Response');
                General.RemoveItem("token")
                General.RemoveItem("auth.apikey");
                General.RemoveItem("auth.expiresat");
                history.push('/login');
            }
        }
        );
    //}
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
    console.log()
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