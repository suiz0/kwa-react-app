import React from 'react';
import ReactDOM from 'react-dom';
import "./style/main.less";
import App from './App';
import {Bootstrap, AppProfile} from './modules/common';
import I18N from './modules/i18n';
import Config from './config/bootstrap';

I18N.configure(Config["i18nResources"]);
let context = new AppProfile();

ReactDOM.render(
  <React.StrictMode>
    <Bootstrap config={Config} profile={context} ready={(props)=>{return <App {...props.config} profile={props.profile} />}}/>
  </React.StrictMode>,
  document.getElementById('root')
);
