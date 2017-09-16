import React, {Component} from 'react';

import { Link } from 'react-router-dom';

import SearchResult from './SearchResult.jsx'

class Home extends Component {

   renderSearchedMovies = () => {
         if(this.props.searchLoaded) {
             return this.props.searchResults.map(searchedMovie => {
                 return (
                     <SearchResult key={searchedMovie.id} posterResults={this.props.posterResults} searchedMovie={searchedMovie}/>
                 )
             })
         }
    }  

   renderMoviesList = () => {
    if(this.props.apiDataLoaded) {
                return this.props.apiData.map(movie => {
                    return (
                       <div className='popular-movie-info'> 
                        <h4><Link to={`/movies/${movie.id}`}
                            onClick={() => {this.props.handleSingleMovie(movie.id)}}>{movie.title}</Link></h4>
                        <p>Synopsis: {movie.overview}</p>
                        <p>Release Date: {movie.release_date}</p>
                       </div> 
                    )
                })
        } else {
            return <div><h3>Data Not Loading...</h3></div>
        }
   }
    
   render() { 
       return (
           <div className= 'movies-container'>
             <form className='movie-search' onSubmit={this.props.handleMovieSearch}>  
               <input type='text' name='movieName' placeholder='Search for a Movie' 
                 value={this.props.movieName} onChange={this.props.handleInputChange}/>
               <input type='submit' value='Search' />
             </form>  
                {this.props.searchLoaded ? this.renderSearchedMovies() : this.renderMoviesList()}
            </div>
       )
    }      
}

export default Home;