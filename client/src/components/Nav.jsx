import React from 'react';

import { Link } from 'react-router-dom';
import Auth from '../modules/Auth';

const Nav = props => {
    return (
        <div className= 'nav-container'>
            <ul className='nav'>
                <li className='nav-item'><Link to = '/'>Home</Link></li>
                {!Auth.isUserAuthenticated() ? <li className='nav-item'> 
                    <Link to = '/login'>Login</Link>
                </li> : ''}
                {!Auth.isUserAuthenticated() ? <li className='nav-item'> 
                    <Link to = '/register'>Register</Link>
                    </li> : ''}
                {Auth.isUserAuthenticated() ? <li className='nav-item'>
                    <Link to = '/profile'>Profile</Link>
                    </li> : ''}    
                {Auth.isUserAuthenticated() ? <li className='nav-item'>
                    <Link to = '/movies'>Seen Movies</Link>
                    </li> : ''}    
                {Auth.isUserAuthenticated() ? <li className='nav-item'>
                    <Link to = '/' onClick={props.logoutUser}>Logout</Link>
                    </li> : ''}
                   
            </ul>    
        </div>    
    )
}

export default Nav;