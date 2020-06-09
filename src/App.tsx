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
import AuthorizePassword from './modules/authorize-password/';
//REDUX 
import {getCurrentSchema} from './modules/auth/actions/AuthActions';
import ProfileActions from './store/actions/profile.actions';
import { connect } from "react-redux";

const App = (props:any) => {

  Resource.interceptors.request = ()=> {
    props.dispatch(ProfileActions.startLoading);
  }

  Resource.interceptors.response = ()=> {
    props.dispatch(ProfileActions.stopLoading);
  }

  useEffect(() => {
    // componentDidMount
    General.Mediator.subscribe("auth:login:close", () => {
      props.history.push('/');
    });
 
    // Get terminology
    props.dispatch(ProfileActions.getLangs(props.resources["aperture"]));
    
    _getSchema(props.auth, props.resources["aperture"], props.history);
    
  }, []);
  
  useEffect(() => {
    I18N.setLang(props.profile.lang);
  },[props.profile.lang]);


  const _getSchema =(auth:AuthAPI, resource:Resource, history:any) =>{
   props.dispatch(getCurrentSchema(auth, resource, history));
  }

  return (
    <div className="container">
        { props.profile.isLoading? <InlineLoading className="bx--inline-loading--top-fixed" description={props.t('loading...')} /> : ""}
        <Header aria-label={props.client}>
          <HeaderName href="#" prefix="Kwan">
            [{props.client}]
          </HeaderName>
          <HeaderNavigation aria-label="Kwan [Contoso]">
            <HeaderMenu aria-label={"lang" + props.i18n.language} menuLinkName={"lang(" + props.profile.lang + ")"}>
              {props.profile.langs.map((lang, i) => <HeaderMenuItem  key={i} aria-label={lang} onClick={()=>{props.dispatch(ProfileActions.setLang(lang))}}>{lang}</HeaderMenuItem>)}
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
            <AuthorizePassword.LoginPage {...props}/>
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

//Connect app to the store(AppProfile)
const mapStateToProps = state => {
  return {
    profile: state.AppProfile,
    langs: state.AppProfile.langs
  };
};

export default connect(mapStateToProps)(withTranslation()(AppContainer));
