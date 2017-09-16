import React from 'react';

const Login = props => {
    return (
        <form className= 'login' onSubmit={props.handleLoginSubmit}>
            <input className = 'input' type='text' name='loginUserName' value={props.loginUserName}
            placeholder='Username' onChange={props.handleInputChange}/>
            <input className = 'input' type='password' name='loginPassword' value={props.loginPassword}
            placeholder='Password' onChange={props.handleInputChange} />
            <input className='submit' type='submit' value='Log In' />
        </form>    
    )
}

export default Login;