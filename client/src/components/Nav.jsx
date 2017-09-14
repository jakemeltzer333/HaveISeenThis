import React from 'react';

import { Link } from 'react-router-dom';
import Auth from '../modules/Auth';

const Nav = props => {
    return (
        <div className= 'nav'>
            <ul>
                <li><Link to = '/'>Home</Link></li>
                {!Auth.isUserAuthenticated() ? <li> 
                    <Link to = '/login'>Login</Link>
                </li> : ''}
                {!Auth.isUserAuthenticated() ? <li>
                    <Link to = '/register'>Register</Link>
                    </li> : ''}
                {Auth.isUserAuthenticated() ? <li>
                    <Link to = '/movies'>Seen Movies</Link>
                    </li> : ''}    
                {Auth.isUserAuthenticated() ? <li>
                    <Link to = '/' onClick={props.logoutUser}>Logout</Link>
                    </li> : ''}
                   
            </ul>    
        </div>    
    )
}

export default Nav;