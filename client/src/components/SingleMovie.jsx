import React from 'react';

const SingleMovie = props => {

    let url= props.posterResults.secure_base_url
    let imageSize= 'w185'
    let posterPath= props.movieData.poster_path
    let poster= `${url}${imageSize}${posterPath}`

    return (
        <div>
            <img src={poster}/>
            <h1>{props.movieData.title}</h1>
            <h5>Tagline: {props.movieData.tagline}</h5>
            <h5>Synopsis:</h5> <p>{props.movieData.overview}</p>
            <h5>Runtime: {props.movieData.runtime} Minutes</h5>
            <h5>Release Date: {props.movieData.release_date}</h5>
        </div>    
    )
}

export default SingleMovie;