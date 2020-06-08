import { authConstants } from '../../../data/constants';


export const RemoveAuthentication = () => (dispatch: any)=>
{
    dispatch({ type: authConstants.REMOVE_REQUEST_VALIDATION });
}