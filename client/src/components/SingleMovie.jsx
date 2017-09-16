import React from 'react';

const SingleMovie = props => {
    return (
        <div>
            <h1>{props.movieData.title}</h1>
            <h5>Tagline: {props.movieData.tagline}</h5>
            <p>Synopsis: {props.movieData.overview}</p>
            <h5>Runtime: {props.movieData.runtime} Minutes</h5>
            <h5>Release Date: {props.movieData.release_date}</h5>
        </div>    
    )
}

export default SingleMovie;