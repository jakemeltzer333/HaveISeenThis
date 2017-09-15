import React, {Component} from 'react';

import { Link } from 'react-router-dom';

class Home extends Component {
   
   renderSearchedMovies() {
      if(this.props.searchLoaded) {
       return this.props.searchResults.map(searchedMovie => {
        return <p>{searchedMovie.title}</p>})
      }
    }  

   renderMoviesList() {
    if(this.props.apiDataLoaded) {
                return this.props.apiData.map(movie => {
                    return <p>{movie.title}</p>
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