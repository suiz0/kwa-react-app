import React, {useEffect, useState} from 'react';
import {
  Header,
  HeaderName,
  Content,
  HeaderNavigation,
  HeaderMenu,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderMenuItem,
} from "carbon-components-react/lib/components/UIShell";

import {InlineLoading} from 'carbon-components-react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  RouteComponentProps
} from "react-router-dom";

import {withTranslation} from 'react-i18next';

import Components from './components';
import { AuthScheme, AuthorizerMaker, withAuth, AuthAPI} from './modules/auth';
import General, { withResources,AppProfile, Resource } from './modules/common';
import Models, {Language} from './models';
import I18N from './modules/i18n';
import LoginPage from './modules/auth/components/LoginPage';
import IAuthorizer from './modules/auth/authorizers/IAuthorizer';
//REDUX 
import {useDispatch} from 'react-redux';
import {RemoveAuthentication, SetExpirationTimeout, getCurrentSchema} from './modules/auth/actions/AuthActions';
import store from './store/store';

const App = (props:any) => {
  const [langs, setLangs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [appProfile , setAppProfile] = useState(props.profile);
  const dispatch = useDispatch()


  Resource.interceptors.request = () => {
    setIsLoading(true);
  };

  Resource.interceptors.response = () =>{
    setIsLoading(false);
  }

  useEffect(() => {
    // componentDidMount
    General.Mediator.subscribe("auth:login:close", () => {
      props.history.push('/');
    });

    Models.GetLanguage({resource: props.resources["aperture"]})
    .then((response)=> {
      setAppProfile({lang: response.active});
      setLangs(response.languages);
    });
    _getSchema(props.auth, props.resource, props.history);
  }, []);

  useEffect(() => {
    I18N.setLang(appProfile.lang);
  },[appProfile.lang]);


  const _getSchema =(auth:AuthAPI, resource:Resource, history:any) =>{
   dispatch(getCurrentSchema(auth, resource, history))
  }
  return (
    <div className="container">
        { isLoading? <InlineLoading className="bx--inline-loading--top-fixed" description={props.t('loading...')} /> : ""}
        <Header aria-label="Contoso">
          <HeaderName href="#" prefix="Kwan">
            [{props.profile.client}]
          </HeaderName>
          <HeaderNavigation aria-label="Kwan [Contoso]">
            <HeaderMenu aria-label={"lang" + props.i18n.language} menuLinkName={"lang(" + appProfile.lang + ")"}>
              {langs.map((lang, i) => <HeaderMenuItem  key={i} aria-label={lang} onClick={()=>{setAppProfile({"lang": lang})}}>{lang}</HeaderMenuItem>)}
            </HeaderMenu>
          </HeaderNavigation>
          <HeaderGlobalBar aria-label="system actions">
            <HeaderGlobalAction aria-label="admin option" isActive onClick={()=>{ props.history.push('/login')}}> 
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
