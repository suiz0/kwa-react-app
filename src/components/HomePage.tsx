import React from 'react';
import PluginsTable from '../modules/common/components/PluginsTable';


const HomePage = (props) => {
  const isAuth = props.authUser.authenticated;

    const content = (
      <div className="bx--grid">
        <div className="bx--row">
        {isAuth?<PluginsTable {...props}/>:
            <div className="bx--col">{props.t ? props.t('Home Page'): 'Home Page'}</div>   
          }      
        </div>
        
      </div>
    )
  
    return content;
}

export default HomePage;