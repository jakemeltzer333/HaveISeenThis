import React from 'react';

import { Link } from 'react-router-dom';

import Auth from '../modules/Auth';

const SingleSeenMovie = props => {

    let url= props.posterResults.secure_base_url
    let imageSize= 'w185'
    let posterPath= props.seenMovie.poster
    let poster= `${url}${imageSize}${posterPath}`

    return (
        <div className='seen-movies-container'>
            <Link to = {`/movies/search/${props.seenMovie.api_id}`}
            onClick={() => {props.handleSingleMovie(props.seenMovie.api_id)}}><img className='seen-poster' src={poster} alt={props.seenMovie.title}/></Link>
                {Auth.isUserAuthenticated() ?
                <div className='delete-movie'> 
                    <button className='delete' onClick={() => props.deleteSeenMovie(props.seenMovie.id)}>No I Haven't! Delete!</button>
                </div> 
                : ''}
   
        </div>    
    )
}

export default SingleSeenMovie;