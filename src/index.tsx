import React from 'react';
import ReactDOM from 'react-dom';
import "./style/main.less";
import App from './App';
import {Bootstrap, AppProfile} from './modules/common';
import I18N from './modules/i18n';
import Config from './config/bootstrap';
import { Provider } from 'react-redux';
import  store,{StoreMaker}  from './store/store';
import AppReducers from './reducers';

I18N.configure(Config["i18nResources"]);
let context = new AppProfile();

ReactDOM.render(
  <Bootstrap config={Config} profile={context} ready={(props)=>{return <Provider store={StoreMaker(AppReducers, props.profile)}><App {...props.config} /> </Provider>}}/>,
  document.getElementById('root')
);
