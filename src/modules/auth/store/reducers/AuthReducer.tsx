import { authConstants } from '../../../../data/constants'

const initialState = {
 isAuthorizePassword: false,
 authenticated: false,
 isValidKey: false,
 requestAuthentication: true,
 validetaApiExp: false,
 expireTimeout: 0,
 increaseTimeout: 0
}

export default function (state = initialState, action:any) {
    switch (action.type) {
        case authConstants.SET_AUTHORIZE_PASSWORD_SCHEME:
            return {
                ...state,
                isAuthorizePassword: true
            };
        case authConstants.SET_AUTHENTICATED:
        return {
            ...state,
            authenticated: true
        };
        case authConstants.SET_UNAUTHENTICATED:
            return initialState;
        case authConstants.APIKEY_VALID:
        return {
            ...state,
            isValidKey:true,
            expireTimeout: action.sessionExpire
        };
        case authConstants.APIKEY_NOT_VALID:
        return {
            ...state,
            isValidKey:false
        };
        case authConstants.ADD_REQUEST_VALIDATION:
        return {
            ...state,
            requestAuthentication: true
        };
        case authConstants.REMOVE_REQUEST_VALIDATION:
        return {
            ...state,
            authenticated: true,
            requestAuthentication: false
        };
        case authConstants.VALIDATE_APIKEY_EXP:
            return {
            ...state,
            validetaApiExp: true
            };
        case authConstants.SET_EXPIRATION_TIMEOUT:
            return {
            ...state,
            increaseTimeout: action.timeout
            };   
        case authConstants.INCREASE_TIMEOUT:
            return {
            ...state,
            expireTimeout: action.sessionExpire
            };           
        default:
            return state;
    }
}