import React, {useEffect, useState} from 'react';
import {
  Header,
  HeaderName,
  Content,
  HeaderNavigation,
  HeaderMenu,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderMenuItem
} from "carbon-components-react/lib/components/UIShell";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  RouteComponentProps
} from "react-router-dom";

import {withTranslation} from 'react-i18next';

import Components from './components';
import { AuthScheme, AuthorizerMaker, withAuth} from './modules/auth';
import General, { withResources } from './modules/common';
import Models, {Language} from './models';
import I18N from './modules/i18n';
import LoginPage from './modules/auth/components/LoginPage';


const App = (props) => {
  const [lang, setLang] =  useState(props.lang);
  const [langs, setLangs] = useState([]);

  useEffect(() => {
    // componentDidMount
    General.Mediator.subscribe("auth:login:close", () => {
      props.history.push('/');
    });

    Models.GetLanguage({resource: props.resources["aperture"]})
    .then((response)=> {
      setLang(response.active);
      setLangs(response.languages);
    });

    props.auth.getScheme()
    .then((response: AuthScheme) => {
      if(response.IsAuthorizePassword)
      {
        let authorizer = AuthorizerMaker();
        if( !authorizer)
        {
          // user does not have any type of access item
          props.history.push('/login');
        } 
        else 
        {
          return props.auth.authorize(authorizer)
          .then(()=>{
            props.resources["aperture"].sendRequest({url: "/test/headers"})
          })
        }
      }
    });
  }, []);

  useEffect(() => {
    I18N.setLang(lang);
  },[lang]);

  return (
    <div className="container">
        <Header aria-label="Contoso">
          <HeaderName href="#" prefix="Kwan">
            [{props.profile.client}]
          </HeaderName>
          <HeaderNavigation aria-label="Kwan [Contoso]">
            <HeaderMenu aria-label={"lang" + props.i18n.language} menuLinkName={"lang(" + lang + ")"}>
              {langs.map((lang, i) => <HeaderMenuItem  key={i} aria-label={lang} onClick={()=>{setLang(lang)}}>{lang}</HeaderMenuItem>)}
            </HeaderMenu>
          </HeaderNavigation>
          <HeaderGlobalBar aria-label="system actions">
            <HeaderGlobalAction aria-label="admin option" >
              <Components.AdminOption {...props} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>
        <Content>
        <Switch>
          <Route exact path="/">
            <Components.HomePage {...props} />
          </Route>
          <Route path="/login">
            <LoginPage {...props}/>
          </Route>
        </Switch>
        </Content>
  </div>
  );
}


const AppWithRouter = withRouter(App);
const AppWithResources = withResources(AppWithRouter);
const AppwithAuth = withAuth(AppWithResources);
const AppContainer = (props) => {
  return <Router>
      <AppwithAuth {...props} />
    </Router>
}

export default withTranslation()(AppContainer);
