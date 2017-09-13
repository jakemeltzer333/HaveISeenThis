import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';

import Auth from './modules/Auth';


class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: Auth.isUserAuthenticated(),
      shouldFireRedirect: false,
      loginUserName: '',
      loginPassword: '',
      registerUserName: '',
      registerPassword: '',
      registerEmail: '',
      registerName: '',
    }
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleLoginSubmit = (e) => {
    e.preventDefault();
    axios.post('/login', {
      username: this.state.loginUserName,
      password: this.state.loginPassword,
    }).then(res => {
      console.log(res);
      if (res.data.token) {
        Auth.authenticateToken(res.data.token);
        this.setState({
          auth: Auth.isUserAuthenticated(),
          loginUserName: '',
          loginPassword: '',
        })
      }
    }).catch(err => {
      console.log(err);
    })
  }

  handleRegisterSubmit = (e) => {
    e.preventDefault();
    axios.post('/users', {
      user: {
        username: this.state.registerUserName,
        password: this.state.registerPassword,
        email: this.state.registerEmail,
        name: this.state.registerName,
      }
    }).then(res => {
      if (res.data.token) {
        Auth.authenticateToken(res.data.token);
        this.setState({
          auth: Auth.isUserAuthenticated(),
        })
      }
    }).catch(err => {
      console.log(err);
    })
  }

  resetFireRedirect = () => {
    if (this.state.shouldFireRedirect) {
      this.setState({
        shouldFireRedirect: false,
      })
    }
  }

  logoutUser = () => {
    axios.delete('/logout', {
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken()
      }
    }).then(res => {
      Auth.deauthenticateUser();
      this.setState({
        auth: Auth.isUserAuthenticated(),
        loginUserName: '',
        loginPassword: '',
      })
    })
  }

  render() {
    return (
      <Router>
      <div className="App">
        <Route exact path = '/login' render={() => 
        !this.state.auth ? (<LoginForm auth= {this.state.auth}
                              loginUserName= {this.state.loginUserName}
                              loginPassword= {this.state.loginPassword}
                              handleInputChange= {this.handleInputChange}
                              handleLoginSubmit= {this.handleLoginSubmit} />
          ) : (
            < Redirect to='/profile'/>
          )}
        />
         <Route exact path = '/profile' render={() => 
         this.state.auth ? <Profile auth={this.state.auth} resetFireRedirect={this.resetFireRedirect} /> : <Redirect to="/login"/> 
        } />
      </div>
      </Router>
    );
  }
}

export default App;