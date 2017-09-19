import React from 'react';

const Footer = props => {

    return (
        <div className='footer'>
            <img className='api-logo' src='../../images/tmdblogo.png' />
            <h5 className='disclosure'>This product uses the TMDb API but is not endorsed or certified by TMDb.</h5>
        </div>
    )
}

export default Footer;