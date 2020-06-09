import React, {useEffect, useState} from 'react';
import {getCurrentSchemaTest} from '../modules/auth/actions/AuthActions'


const HomePage = (props) => {
  console.log('Home',props);
  const isAuth = props.authUser.authenticated;

    const content = (
      <div className="bx--grid">
        <div className="bx--row">
            <div className="bx--col">{props.t ? props.t('Home Page'): 'Home Page'}</div>         
        </div>
        {isAuth&&<div> <button onClick={() => props.dispatch(getCurrentSchemaTest(props.auth))}>Llamar de prueba</button>  </div>}
      </div>
    )
  
    return content;
}

export default HomePage;