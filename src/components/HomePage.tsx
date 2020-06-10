import React from 'react';
import PluginsTable from '../modules/common/components/PluginsTable';
import ProfileActions from '../store/actions/AppActions'


const HomePage = (props) => {
  const isAuth = props.authUser.authenticated;

    const content = (
      <div className="bx--grid">
        <div className="bx--row">
            <div className="bx--col"> 
             {isAuth?
             <div><PluginsTable {...props}/>
             <button onClick={() => props.dispatch(ProfileActions.getUIplugins(props.resources["aperture"]))}>Reload Table </button>
             </div>
             :props.t ? props.t('Home Page'): 'Home Page'}
             </div>                   
        </div>
        
      </div>
    )
  
    return content;
}

export default HomePage;