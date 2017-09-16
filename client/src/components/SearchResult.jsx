import React from 'react';

import { Link } from 'react-router-dom';

const SearchResult = props => {
         let url= props.posterResults.secure_base_url
         let imageSize= 'w185'
         let posterPath= props.searchedMovie.poster_path
         let poster= `${url}${imageSize}${posterPath}`

         
        return (
                 <div className='movie-poster-result'>
                <Link to={`/movies/${props.searchedMovie.id}`} 
                    onClick={() => {props.handleSingleMovie(props.searchedMovie.id)}}><img src={poster} alt ={props.searchedMovie.title}/></Link>
                 </div>    
             )
        

}

export default SearchResult;