import React, { Component } from 'react';

class Cast extends Component {
    renderCastList = () => {
        if(this.props.movieCreditsDataLoaded) {
            return this.props.movieCreditsData.cast.map(actor => {
                console.log('this function works');
                return (
                    <div className='cast'>
                        <p>{actor.name}: {actor.character}</p>
                    </div>    
                )
            })
        }
    }

    render () {
        return (
            <div className='cast-container'>
                {this.renderCastList()}
            </div>    
        )
    }
}

export default Cast;