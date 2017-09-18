import React, { Component } from 'react';

import SingleSeenMovie from './SingleSeenMovie.jsx'

import Auth from '../modules/Auth';

import axios from 'axios';

class SeenMovies extends Component {
    constructor() {
        super();
        this.state = {
            seenMovieData: '',
            seenMovieDataLoaded: false,
        }
    }

    componentDidMount() {
        axios('/movies', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${Auth.getToken()}`,
                token: Auth.getToken(),
            }
        }).then(res => {
            this.setState({
                seenMovieData: res.data.movie,
                seenMovieDataLoaded: true,
            })
        })
    }

    renderSeenMoviesList = () => {
        if(this.props.seenMovieDataLoaded) {
            return this.props.seenMovieData.map(seenMovie => {
               return ( 
                <SingleSeenMovie key={seenMovie.id} 
                    seenMovie={seenMovie}
                    posterResults={this.props.posterResults}
                    handleSingleMovie={this.props.handleSingleMovie}/>
               )     
            })
        }
    }

    render() {
        return (
            <div className='seen-movies-container'>
                 {this.renderSeenMoviesList()}
            </div>    
        )
    }
}

export default SeenMovies;