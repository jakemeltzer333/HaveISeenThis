import React, {Component} from 'react';

import SearchResult from './SearchResult.jsx'
import PopularMovie from './PopularMovie.jsx'

class Home extends Component {

   renderSearchedMovies = () => {
         if(this.props.searchLoaded) {
             return this.props.searchResults.map(searchedMovie => {
                 return (
                     <SearchResult key={searchedMovie.id} posterResults={this.props.posterResults} 
                      searchedMovie={searchedMovie} handleSingleMovie={this.props.handleSingleMovie}/>
                 )
             })
         }
    }  

   renderMoviesList = () => {
    if(this.props.apiDataLoaded) {
                return this.props.apiData.map(movie => {
                    return (
                       <PopularMovie key={movie.id} posterResults={this.props.posterResults}
                        movie={movie} handleSingleMovie={this.props.handleSingleMovie} />
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
               <input className='input' type='text' name='movieName' placeholder='Search for a Movie' 
                 value={this.props.movieName} onChange={this.props.handleInputChange}/>
               <input className='submit' type='submit' value='Search' />
             </form> 
             <div className="posters-container"> 
                {this.props.searchLoaded ? this.renderSearchedMovies() : this.renderMoviesList()}
            </div>
            </div>
       )
    }      
}

export default Home;