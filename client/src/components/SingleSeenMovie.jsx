import React from 'react';

import { Link } from 'react-router-dom';

const SingleSeenMovie = props => {

    let url= props.posterResults.secure_base_url
    let imageSize= 'w185'
    let posterPath= props.seenMovieData.poster
    let poster= `${url}${imageSize}${posterPath}`

    return (
        <div className='seen-movies-container'>
            <h1>You've Seen All These Movies!</h1>
            <Link to = {`/movies/${props.seenMovie.id}`}
            onClick={() => {props.handleSingleMovie(props.seenMovie.id)}}><img className='seen-poster' src={poster} alt={props.seenMovie.title}/></Link>
        </div>    
    )
}

export default SingleSeenMovie;