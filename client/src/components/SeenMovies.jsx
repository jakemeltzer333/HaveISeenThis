import React from 'react';

import { Link } from 'react-router-dom';

const SeenMovies = props => {

    let url= props.posterResults.secure_base_url
    let imageSize= 'w185'
    let posterPath= props.movieData.poster_path
    let poster= `${url}${imageSize}${posterPath}`

    return (
        <div className='seen-movies-container'>
            <h1>You've Seen All These Movies!</h1>
            <Link to = {`/movies/${props.movieData.id}`}><img className='seen-poster' src={poster} alt={props.seenMovieData.title}/></Link>
        </div>    
    )
}

export default SeenMovies;