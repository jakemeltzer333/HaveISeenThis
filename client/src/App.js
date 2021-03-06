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
import Footer from './components/Footer';


class App extends Component {
  constructor() {
    super();
    //initial states 
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
      movieCreditsData: '',
      movieCreditsDataLoaded: false,
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
  }

  //renders the index_search api call from the backend and displays new movie posters 
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

  //allows for user to type into the search input 
  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  //allows users to be able to log in 
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

  //allows users to be able to register 
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

  //allows user to log out
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

  //when user inputs a movie's name, this method makes an api call to return posters for similar search
  //results 
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

  //when user clicks on a poster, this method directs user to movie's single page and renders 
  //data pulled from api  
  handleSingleMovie(movieId) {
    axios.get(`/movies/search/${movieId}`, {
      
    }).then(res => {
      console.log(res.data.response);
      console.log(res.data.credits_response);
      this.setState({
        movieData: res.data.response,
        movieDataLoaded: true,
        movieId: res.data.response.id,
        movieCreditsData: res.data.credits_response,
        movieCreditsDataLoaded: true,
      })
    })
  }

  //allows user to save a movie to their seen movies and inserts it into the database 
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
                       movieCreditsData={this.state.movieCreditsData}
                       movieCreditsDataLoaded={this.state.movieCreditsDataLoaded}  
                       handleSeenMovies={this.handleSeenMovies}
                        />}
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
                  seenMovieData={this.state.seenMovieData} 
                  seenMovieDataLoaded={this.state.seenMovieDataLoaded}
                  movieData={this.state.movieData} 
                  movieDataLoaded={this.state.movieDataLoaded}
                  posterResults={this.state.posterResults}
                  handleSeenMovies={this.handleSeenMovies}
                  handleSingleMovie={this.handleSingleMovie}
                  /> : <Redirect to="/login"/> 
        } />
        <Footer />
        {this.state.shouldFireRedirect ? <Redirect push to={'/'} /> : ''}
      </div>
      </Router>
    );
  }
}

export default App;
