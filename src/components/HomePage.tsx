import React from 'react';

const HomePage = (props) => {
    const content = (
      <div className="bx--grid">
        <div className="bx--row">
            <div className="bx--col">{props.t ? props.t('Home Page'): 'Home Page'}</div>
        </div>
      </div>
    )
  
    return content;
}

export default HomePage;