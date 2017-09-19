import React from 'react';

import { Link } from 'react-router-dom';

const SingleSeenMovie = props => {

    let url= props.posterResults.secure_base_url
    let imageSize= 'w185'
    let posterPath= props.seenMovie.poster
    let poster= `${url}${imageSize}${posterPath}`

    return (
        <div className='seen-movies-container'>
            <Link to = {`/movies/search/${props.seenMovie.api_id}`}
            onClick={() => {props.handleSingleMovie(props.seenMovie.api_id)}}><img className='seen-poster' src={poster} alt={props.seenMovie.title}/></Link>
        </div>    
    )
}

export default SingleSeenMovie;