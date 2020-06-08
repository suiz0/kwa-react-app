import { authConstants } from '../../../data/constants'

const initialState = {
 isAuthorizePassword: false,
 authenticated: false,
 credentials: {},
 isValidKey: false,
 requestAuthentication: true,
 validetaApiExp: false,
 expireTimeout: 0
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
            isValidKey:true
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
            expireTimeout: action.timeout
            };           
        default:
            return state;
    }
}