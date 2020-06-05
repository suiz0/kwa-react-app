import React from 'react';
import ReactDOM from 'react-dom';
import "./style/main.less";
import App from './App';
import Bootstrap from './config/bootstrap';
import I18N from './modules/i18n';

I18N.configure(Bootstrap.i18nResources);

ReactDOM.render(
  <React.StrictMode>
    <App {...Bootstrap.AppProfile} />
  </React.StrictMode>,
  document.getElementById('root')
);
