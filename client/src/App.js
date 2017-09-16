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
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Header from './components/Header';
import Home from './components/Home';
import SingleMovie from './components/SingleMovie';


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
      apiData: null,
      apiDataLoaded: false,
      movieName: '',
      searchResults: '',
      searchLoaded: false,
      movieData: '',
      movieDataLoaded: false,
      movieId: '',
    }
  }

  componentDidMount() {
    axios.get('/movies').then(res => {
      console.log(res.data.results);
      this.setState({
        apiData: res.data.results,
        apiDataLoaded: true,
      })
    }).catch(err => console.log(err));
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
          shouldFireRedirect: true,
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
          shouldFireRedirect: true,
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

  handleMovieSearch = (e) => {
    e.preventDefault();
    axios('/movies', {
      method: 'POST',
      data: {
        movieName: this.state.movieName,
      }
    }).then(res => {
      console.log(res)
      this.setState({
        searchResults: res.data.results,
        searchLoaded: true,
      })
    })
  }

  handleSingleMovie = (movieId) => {
    axios(`/movies/${movieId}`, {
      method: 'GET',
      data: {
        movieId: this.state.movieId,
      }
    }).then(res => {
      console.log(res);
      this.setState({
        movieData: res.data,
        movieDataLoaded: true,
        movieId
      })
    })
  }

  render() {
    return (
      <Router>
      <div className="App">
        <Header logoutUser={this.logoutUser} />
        <Route exact path='/movies' render ={() => 
          <Home apiData={this.state.apiData} apiDataLoaded={this.state.apiDataLoaded} 
                movieName={this.state.movieName} movieId={this.state.movieId} searchResults={this.state.searchResults} searchLoaded={this.state.searchLoaded} 
                handleMovieSearch={this.handleMovieSearch} handleInputChange={this.handleInputChange} handleSingleMovie={this.handleSingleMovie}/>} 
          />
        <Route exact path={`/movies/${this.state.id}`} render ={() =>
          <SingleMovie apiData={this.state.apiData} apiDataLoaded={this.state.apiDataLoaded}
                      movieName={this.state.movieName} movieData={this.state.movieData} movieDataLoaded={this.state.movieDataLoaded} 
                      handleMovieSearch={this.handleMovieSearch} handleInputChange={this.handleInputChange} handleSingleMovie={this.handleSingleMovie} />}
          />  
        <Route exact path='/register' render={() => 
              <Register auth= {this.state.auth}
                registerUserName = {this.state.registerUserName}
                registerPassword = {this.state.registerPassword}
                registerEmail = {this.state.registerEmail}
                registerName = {this.state.registerName}
                handleInputChange = {this.handleInputChange}
                handleRegisterSubmit = {this.handleRegisterSubmit} />              
              } />
        <Route exact path='/login' render={() => 
            !this.state.auth ? (
                              <Login auth= {this.state.auth}
                              loginUserName= {this.state.loginUserName}
                              loginPassword= {this.state.loginPassword}
                              handleInputChange= {this.handleInputChange}
                              handleLoginSubmit= {this.handleLoginSubmit} 
                              />
                              ) : (
                                < Redirect to='/profile'/>
                              )}
        />
         <Route exact path ='/profile' render={() => 
            this.state.auth ? <Profile auth={this.state.auth} resetFireRedirect={this.resetFireRedirect} /> : <Redirect to="/login"/> 
        } />
        {this.state.shouldFireRedirect ? <Redirect push to={'/'} /> : ''}
      </div>
      </Router>
    );
  }
}

export default App;
