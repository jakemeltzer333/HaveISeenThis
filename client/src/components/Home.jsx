import React, {Component} from 'react';

class Home extends Component {

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
           <div>
                {this.renderMoviesList()}
            </div>
       )
    }      
}

export default Home;