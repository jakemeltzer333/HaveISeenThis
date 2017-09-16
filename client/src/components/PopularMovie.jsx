import React from 'react';

import { Link } from 'react-router-dom';

const PopularMovie = props => {
         let url= props.posterResults.secure_base_url
         let imageSize= 'w185'
         let posterPath= props.movie.poster_path
         let poster= `${url}${imageSize}${posterPath}`

         
        return (
                <div className='movie-poster-result'>
                <Link to={`/movies/${props.movie.id}`} 
                    onClick={() => {props.handleSingleMovie(props.movie.id)}}><img className='popular-poster' src={poster} alt ={props.movie.title}/></Link>
                 </div>    
             )
}

export default PopularMovie;