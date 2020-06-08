import { authConstants } from '../../../data/constants';
import { AuthScheme, AuthorizerMaker, withAuth, AuthAPI} from '../../auth';
import General, {  Resource } from '../../common';
import GetAuthHeaders from '../services/AuthAPI'
//=>async(dispatch, getState)
export const getCurrentSchema = (auth:AuthAPI, resource:Resource, history:any) => async(dispatch:any, getState)=>
{
    auth.getScheme()
            .then(
                response => { 
                    if(response.IsAuthorizePassword){
                        console.log(getState());
                        dispatch({type: authConstants.SET_AUTHORIZE_PASSWORD_SCHEME});
                        dispatch(Authorize_Password(auth, resource, history));
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
                    dispatch(SetValidApiKey());
                    General.RemoveItem("token")
                    General.SetItem("auth.apikey", response.key);
                    General.SetItem("auth.expiresat", response.expiresat);
                    dispatch(RemoveAuthentication());
                    console.log("Applying Auth Headers for subsequent requests");
                    //resource.setGetHeaders(GetAuthHeaders);        
                    dispatch(SetExpirationTimeout(auth))    
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
export const SetValidApiKey = () => async(dispatch: any)=>
{
    dispatch({ type: authConstants.APIKEY_VALID });
}

export const SetInValidApiKey = () => async(dispatch: any)=>
{
    dispatch({ type: authConstants.APIKEY_NOT_VALID });
}

export const RemoveAuthentication = () => async(dispatch: any)=>
{
    dispatch({ type: authConstants.REMOVE_REQUEST_VALIDATION });
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
                }
            );
   
}