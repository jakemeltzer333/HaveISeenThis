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
        this.deleteSeenMovie = this.deleteSeenMovie.bind(this);
    }
    // renders poster images of all seen movies on page load. Can only happen if user is logged in
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
    //function to allow for each seen movie component to appear on the page 
    renderSeenMoviesList() {
        if(this.state.userMovieDataLoaded) {
            return this.state.userMovieData.map(seenMovie => {
               return ( 
                <SingleSeenMovie key={seenMovie.id} 
                    seenMovie={seenMovie}
                    userMovieData={this.state.userMovieData}
                    userMovieDataLoaded={this.state.userMovieDataLoaded}
                    posterResults={this.props.posterResults}
                    handleSingleMovie={this.props.handleSingleMovie}
                    deleteSeenMovie={this.deleteSeenMovie}/>
               )     
            })
        }
    }

      //user can delete a seen movie 
    deleteSeenMovie(id) {
        console.log(id)
        console.log('Movie deleted')
        axios.delete(`/movies/${id}`, {
        headers: {
            'Authorization': `Token ${Auth.getToken()}`,
            token: Auth.getToken(),
            }
        }).then(res=> {
            const deletedSeenMovieData = [...this.state.userMovieData]
            for (let i = 0; i < deletedSeenMovieData.length; i++) {
            if(deletedSeenMovieData[i].id === id) {
                deletedSeenMovieData.splice(i, 1);
            }
            }
            this.setState({
            userMovieData: deletedSeenMovieData,
            })
        })
    }

    render() {
        return (
            <div className='seen-movies-container'>
                <h1 className='seen-movies-header'>You've Seen All These Movies!</h1>
                <div className='posters-container'>
                 {this.renderSeenMoviesList()}
                </div> 
            </div>    
        )
    }
}

export default SeenMovies;