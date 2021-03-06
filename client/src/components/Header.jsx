import React from 'react';
import Nav from './Nav.jsx';

const Header = props => {
    return (
        <div className= 'header'>
           <h1 className='app-name'>SeenIt?</h1> 
            <Nav logoutUser={props.logoutUser}/>
        </div>    
    )
}

export default Header;