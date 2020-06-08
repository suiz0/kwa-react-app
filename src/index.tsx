import React from 'react';
import ReactDOM from 'react-dom';
import "./style/main.less";
import App from './App';
import {Bootstrap, AppProfile} from './modules/common';
import I18N from './modules/i18n';
import Config from './config/bootstrap';
import { Provider } from 'react-redux';
import  store  from './store/store';

I18N.configure(Config["i18nResources"]);
let context = new AppProfile();

ReactDOM.render(
  <Provider store={store}>
    <Bootstrap config={Config} profile={context} ready={(props)=>{return <App {...props.config} profile={props.profile} />}}/>
  </Provider>,
  document.getElementById('root')
);
