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
import SeenMovies from './components/SeenMovies';
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
      posterResults: '',
      searchLoaded: false,
      movieData: '',
      movieDataLoaded: false,
      movieId: '',
      seenMovieData: '',
      seenMovieDataLoaded: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this)
    this.resetFireRedirect = this.resetFireRedirect.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.handleMovieSearch = this.handleMovieSearch.bind(this);
    this.handleSingleMovie = this.handleSingleMovie.bind(this);
    this.handleSeenMovies = this.handleSeenMovies.bind(this);
    this.deleteSeenMovie = this.deleteSeenMovie.bind(this);
  }

  componentDidMount() {
    axios.get('/movies/search').then(res => {
      console.log(res.data.response.results);
      console.log(res.data.poster_response.images);
      this.setState({
        apiData: res.data.response.results,
        apiDataLoaded: true,
        posterResults: res.data.poster_response.images,
      })
    }).catch(err => console.log(err));
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleLoginSubmit(e) {
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

  handleRegisterSubmit(e) {
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

  resetFireRedirect() {
    if (this.state.shouldFireRedirect) {
      this.setState({
        shouldFireRedirect: false,
      })
    }
  }

  logoutUser() {
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

  handleMovieSearch(e) {
    e.preventDefault();
    axios('/movies/search', {
      method: 'PUT',
      data: {
        movieName: this.state.movieName,
      }
    }).then(res => {
      console.log(res)
      this.setState({
        searchResults: res.data.response.results,
        searchLoaded: true,
      })
    })
  }

  handleSingleMovie(movieId) {
    axios.get(`/movies/search/${movieId}`, {
      
    }).then(res => {
      console.log(res.data.response);
      this.setState({
        movieData: res.data.response,
        movieDataLoaded: true,
        movieId: res.data.response.id,

      })
    })
  }

  handleSeenMovies() {
    axios('/movies', {
      method: 'POST',
      data: {
        movie: {
          api_id: this.state.movieData.id,
          title: this.state.movieData.title,
          tagline: this.state.movieData.tagline,
          synopsis: this.state.movieData.overview,
          poster: this.state.movieData.poster_path,
          genre: this.state.movieData.genres[0].name,
          runtime: this.state.movieData.runtime,
          release_date: this.state.movieData.release_date
              }
      },
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      }
    }).then(res => {
      console.log(res.data.movie)
      this.setState({
        seenMovieData: res.data.movie,
        seenMovieDataLoaded: true,
        shouldFireRedirect: true,
      })
    })
  }

  deleteSeenMovie(id) {
    axios.delete(`/movies/${id}`)
      .then(res=> {
        const deletedSeenMovieData = [...this.state.seenMovieData]
        for (let i = 0; i < deletedSeenMovieData.length; i++) {
          if(deletedSeenMovieData[i].id === id) {
            deletedSeenMovieData.splice(i, 1);
          }
        }
        this.setState({
          seenMovieData: deletedSeenMovieData,
        })
      })
  }

  render() {
    return (
      <Router>
      <div className="App">
        <Header logoutUser={this.logoutUser} />
        <Route exact path='/' render ={() => 
          <Home apiData={this.state.apiData} 
                apiDataLoaded={this.state.apiDataLoaded} 
                movieName={this.state.movieName} 
                movieId={this.state.movieId} 
                posterResults={this.state.posterResults} 
                searchResults={this.state.searchResults} 
                searchLoaded={this.state.searchLoaded} 
                handleMovieSearch={this.handleMovieSearch} 
                handleInputChange={this.handleInputChange} 
                handleSingleMovie={this.handleSingleMovie}/>} 
          />
        <Route exact path={`/movies/search/${this.state.movieId}`} render ={() =>
          <SingleMovie movieData={this.state.movieData} 
                       movieDataLoaded={this.state.movieDataLoaded}
                       posterResults={this.state.posterResults}  
                       handleSingleMovie={this.handleSingleMovie}
                       handleSeenMovies={this.handleSeenMovies}
                       deleteSeenMovie={this.deleteSeenMovie} />}
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
                                < Redirect to='/'/>
                              )}
        />
         <Route exact path ='/movies' render={() => 
            this.state.auth ?
                <SeenMovies auth={this.state.auth} 
                  resetFireRedirect={this.resetFireRedirect} 
                  seenMovieData={this.state.seenMovieData} 
                  seenMovieDataLoaded={this.state.seenMovieDataLoaded}
                  movieData={this.state.movieData} 
                  movieDataLoaded={this.state.movieDataLoaded}
                  movieId={this.state.movieId}
                  posterResults={this.state.posterResults}
                  handleSeenMovies={this.handleSeenMovies}
                  handleSingleMovie={this.handleSingleMovie}
                  /> : <Redirect to="/login"/> 
        } />
        {this.state.shouldFireRedirect ? <Redirect push to={'/'} /> : ''}
      </div>
      </Router>
    );
  }
}

export default App;
