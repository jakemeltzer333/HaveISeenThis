import React, { Component } from 'react';

class Credits extends Component {
    renderCastList = () => {
        if(this.props.movieCreditsDataLoaded) {
            return this.props.movieCreditsData.cast.map(actor => {
                return (
                    <div className='cast'>
                        <p>{actor.name}: {actor.character}</p>
                    </div>    
                )
            })
        }
    }

    renderCrewList = () => {
        if(this.props.movieCreditsDataLoaded) {
            return this.props.movieCreditsData.crew.map(crewMember => {
                return (
                    <div className='crew'>
                        <p>{crewMember.job}: {crewMember.name}</p>
                    </div>    
                )
            })
        }
    }

    render () {
        return (
            <div className='cast-container'>
                {this.renderCastList()}
                <h5 className='credits'>Crew: </h5>{this.renderCrewList()}
            </div>    
        )
    }
}

export default Credits;