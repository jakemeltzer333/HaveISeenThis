import React from 'react';

import logo from '../images/tmdblogo.png'

const Footer = props => {

    return (
        <div className='footer'>
            <img className='api-logo' src={logo} />
            <h5 className='disclosure'>This product uses the TMDb API but is not endorsed or certified by TMDb.</h5>
        </div>
    )
}

export default Footer;