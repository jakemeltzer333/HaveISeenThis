import React, { Component } from 'react';

import SingleSeenMovie from './SingleSeenMovie.jsx'

import Auth from '../modules/Auth';

import axios from 'axios';

class SeenMovies extends Component {
    constructor() {
        super();
        this.state = {
            userMovieData: '',
            userMovieDataLoaded: false,
        }
        this.renderSeenMoviesList = this.renderSeenMoviesList.bind(this);
    }

    componentDidMount() {
        axios('/movies', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${Auth.getToken()}`,
                token: Auth.getToken(),
            }
        }).then(res => {
            console.log(res.data.movies)
            this.setState({
                userMovieData: res.data.movies,
                userMovieDataLoaded: true,
            })
        }).catch(err => console.log(err));
    }

    renderSeenMoviesList() {
        if(this.state.userMovieDataLoaded) {
            return this.state.userMovieData.map(seenMovie => {
               return ( 
                <SingleSeenMovie key={seenMovie.id} 
                    seenMovie={seenMovie}
                    userMovieData={this.state.userMovieData}
                    userMovieDataLoaded={this.state.userMovieDataLoaded}
                    posterResults={this.props.posterResults}
                    handleSingleMovie={this.props.handleSingleMovie}/>
               )     
            })
        }
    }

    render() {
        return (
            <div className='seen-movies-container'>
                <h1>You've Seen All These Movies!</h1>
                <div className='poster-container'>
                 {this.renderSeenMoviesList()}
                </div> 
            </div>    
        )
    }
}

export default SeenMovies;