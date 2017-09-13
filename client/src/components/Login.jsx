import React from 'react';

const Login = props => {
    return (
        <form className= 'login' onSubmit={this.handleLoginSubmit}>
            <input type='text' name='loginUserName' value={props.loginUserName}
            placeholder='Username' onChange={props.handleInputChange}/>
            <input type='password' name='loginPassword' value={props.loginPassword}
            placeholder='Password' onChange={props.handleInputChange} />
            <input type='submit' value='Log In' />
        </form>    
    )
}

export default Login;