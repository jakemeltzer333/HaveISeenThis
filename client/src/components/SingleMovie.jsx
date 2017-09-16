import React from 'react';

const SingleMovie = props => {

    let url= props.posterResults.secure_base_url
    let imageSize= 'w185'
    let posterPath= props.movieData.poster_path
    let poster= `${url}${imageSize}${posterPath}`

    return (
        <div className='single-movie-container'>
            <img className='single-poster' src={poster}/>
            <h1 className='movie-title'>{props.movieData.title}</h1>
            <h5 className='tagline'>Tagline: {props.movieData.tagline}</h5>
            <h5 className='synopsis-header'>Synopsis:</h5> <p className='synopsis'>{props.movieData.overview}</p>
            <h5 className='runtime'>Runtime: {props.movieData.runtime} Minutes</h5>
            <h5 className='release-date'>Release Date: {props.movieData.release_date}</h5>
        </div>    
    )
}

export default SingleMovie;