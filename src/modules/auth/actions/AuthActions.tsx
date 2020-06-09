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
                        }
                    }
                }
            );
}

export const Authorize_Password = (history:any, authorizer?) => async(dispatch: any)=>
{
    let auth = AuthAPIProvider.create();

   /* if(!authorizer) {
        const authorizer = AuthorizerMaker();
        if( !authorizer)
        {
          // user does not have any type of access item
          dispatch(SetInValidApiKey());
          history.push('/login'); 
          //APIKEY_NOT_VALID
        }
    }
    else 
    {*/
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