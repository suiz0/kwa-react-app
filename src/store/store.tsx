import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import AuthReducer from '../modules/auth/store/reducers/AuthReducer'
import AppReducer from '../store/reducers/AppReducer';

const middleware = [thunk];
//this is for redux devtool purpose
declare global {
interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}
}

const localReducers =  combineReducers({AppProfile: AppReducer, AuthUser: AuthReducer});
const composeEnhacer = typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const StoreMaker = (initialState, reducers?, enhancers? ) => {
    let store = createStore(
        reducers || localReducers, 
        initialState, 
        enhancers || 
        composeEnhacer(applyMiddleware(...middleware))
    );
    return store;
}

export {StoreMaker}