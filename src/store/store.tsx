import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import AuthReducer from '../modules/auth/store/reducers/AuthReducer'


const initialState = {};
const middleware = [thunk];
//this is for redux devtool purpose
declare global {
interface Window {
 __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
}
}

const reducer = combineReducers({
 authUser: AuthReducer
});
const store = {}//createStore(reducer, initialState, compose(applyMiddleware(...middleware), (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) as any));
const StoreMaker = (reducers, initialState, enhancers? ) => {
    let store = createStore(reducers, initialState, enhancers || applyMiddleware(...middleware));
    return store;
}

export default store;
export {StoreMaker}