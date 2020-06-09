import { authConstants } from '../../../data/constants';
import { AuthScheme, AuthorizerMaker, withAuth, AuthAPI} from '../../auth';
import General, {  Resource } from '../../common';
import {GetAuthHeaders} from '../services/AuthAPI'

export const getCurrentSchema = (auth:AuthAPI, resource:Resource, history:any) => async(dispatch:any)=>
{
    auth.getScheme()
            .then(
                response => { 
                    if(response.IsAuthorizePassword){
                        dispatch({type: authConstants.SET_AUTHORIZE_PASSWORD_SCHEME});
                        dispatch(Authorize_Password(auth, resource, history));
                    }
                        
                }
            );
   
}

export const getCurrentSchemaTest = (auth:AuthAPI) => async(dispatch:any)=>
{
    console.log('Test');
    auth.getScheme()
            .then(
                response => { 
                    if(response.IsAuthorizePassword){
                        console.log('Un Si de Prueba');
                    }
                        
                }
            );
   
}

export const Authorize_Password = (auth:AuthAPI, resource:Resource, history:any) => async(dispatch: any)=>
{
    const authorizer = AuthorizerMaker();        
        if( !authorizer)
        {
          // user does not have any type of access item
          dispatch(SetInValidApiKey());
          history.push('/login'); 
          //APIKEY_NOT_VALID
        } 
        else 
        {
           auth.authorize(authorizer)
          .then(
            response =>{
                if(response.isvalid) {
                    dispatch(SetValidApiKey(response.expiresat));
                    General.RemoveItem("token")
                    General.SetItem("auth.apikey", response.key);
                    General.SetItem("auth.expiresat", response.expiresat);
                    dispatch(RemoveAuthentication());
                    console.log("Applying Auth Headers for subsequent requests");                       
                    resource.setGetHeaders(GetAuthHeaders());        
                    dispatch(SetExpirationTimeout(auth))   
                    Resource.interceptors.validateExpiration= ()=> {
                        console.log('Setting interceptor for validation')
                        dispatch(ValidateExpirationTimeout());
                      }

                }else{
                    dispatch(SetInValidApiKey());
                    console.log('Invalid Response');   
                    General.RemoveItem("token")
                    General.RemoveItem("auth.apikey");
                    General.RemoveItem("auth.expiresat");
                    history.push('/login');
                }
                //props.history.push('/login');    
                //props.resources["aperture"].sendRequest({url: "/test/headers"})
            }          
          );
        }
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
    console.log('Last State' ,getState());
    console.log('Interceptor ValidateExpirationTimeout called');
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
                    setTimeout(() => {
                        reject('Session Expired, Call Aborted');
                    }, Resource.timeout);
                });
               // dispatch(Authorize_Password();
                return promise;
            }else{
                dispatch(IncreaseExpirationTimeout());
            }
              
        }
   
}