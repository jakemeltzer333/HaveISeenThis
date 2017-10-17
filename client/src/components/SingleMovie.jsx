import React from 'react';
import Auth from '../modules/Auth';
import { Link } from 'react-router-dom';

const SingleMovie = props => {

    let url= props.posterResults.secure_base_url
    let imageSize= 'w300'
    let posterPath= props.movieData.poster_path
    let poster= `${url}${imageSize}${posterPath}`

    return (
        <div className='single-movie-container'> 
            <img className='single-poster' src={poster} alt=''/>
           <div className='movie-info'> 
            <h1 className='movie-title'>{props.movieData.title}</h1>
            <h5 className='tagline'>Tagline: {props.movieData.tagline}</h5>
            <h5 className='synopsis-header'>Synopsis:</h5> <p className='synopsis'>{props.movieData.overview}</p>
            <h5 className='genre'>Genre: {props.movieData.genres[0].name}</h5>
            <h5 className='runtime'>Runtime: {props.movieData.runtime} Minutes</h5>
            <h5 className='release-date'>Release Date: {props.movieData.release_date}</h5>
            <div className='seen-movie'>    
            {!Auth.isUserAuthenticated() ? 
                <i className="fa fa-check-circle fa-2x" aria-hidden="true"><Link to = '/login'> <h4 className='seen-it'>Hey, I've Seen This Movie!</h4> </Link></i>
                : <i className="fa fa-check-circle fa-2x" aria-hidden="true"><Link to='/movies' 
                        onClick={() => props.handleSeenMovies()}> <h4 className='seen-it'>Hey, I've Seen This Movie!</h4></Link></i>}
                <h4 className='seen-it'>Date Added: <input className='input' type='date' /></h4>        
            </div>
        </div>     
        </div>    
    )
}

export default SingleMovie;