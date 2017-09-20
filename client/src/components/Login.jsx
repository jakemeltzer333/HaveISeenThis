import React from 'react';

const Login = props => {
    return (
        <form className= 'login' onSubmit={props.handleLoginSubmit}>
            <input className = 'login-input' type='text' name='loginUserName' value={props.loginUserName}
            placeholder='Username' onChange={props.handleInputChange}/>
            <input className = 'login-input' type='password' name='loginPassword' value={props.loginPassword}
            placeholder='Password' onChange={props.handleInputChange} />
            <input className='login-submit' type='submit' value='Log In' />
        </form>    
    )
}

export default Login;