import { authConstants } from '../../../data/constants'

const initialState = {
 authenticated: false,
 credentials: {},
 isValidKey: false,
 requestAuthentication: true,
 validetaApiExp: false
}

export default function (state = initialState, action:any) {
    switch (action.type) {
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
        default:
            return state;
    }
}