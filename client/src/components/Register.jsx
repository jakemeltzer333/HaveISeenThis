import React from 'react'

const Register = props => {
    return (
        <form className= 'register' onSubmit={props.handleRegisterSubmit}>
            <input className = 'input' type='text' name='registerUserName' value={props.registerUserName}
            placeholder='Username' onChange={props.handleInputChange}/>
            <input className = 'input' type='password' name='registerPassword' value={props.registerPassword}
            placeholder='Password' onChange={props.handleInputChange} />
            <input className = 'input' type='text' name='registerEmail' value={props.registerEmail}
            placeholder='Email' onChange={props.handleInputChange} />
            <input className = 'input' type='text' name='registerName' value={props.registerName}
            placeholder='Name' onChange={props.handleInputChange} />
            <input className='submit' type='submit' value='Register' />
        </form>    
    )
}

export default Register;