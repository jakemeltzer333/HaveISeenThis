# SeenIt?

## What is SeenIt?

Over the years, my father has kept a running list of movies he has seen in an Excel spreadsheet, and I always thought that was a good idea, but the way in which he did it was fairly stale. Inspired by that initial premise, I have set out to create a more visually dynamic method of keeping track of movies one has seen, with the ability to also pull up information about each specific movie with one click. Keep in mind this is the most basic version and will undergo further construction to add more features that will be elaborated on below.

## Technologies Used

This app was built with Ruby on Rails for the backend and React for the front end and styled with CSS. To pull all the movie information, I used (The Movie Database API)[https://developers.themoviedb.org/3/getting-started].

## Database Structure

I wound up using three tables for this project, one for users, one for the movies, and one to tie them together in order to save seen movies.

| Users          |
| -------------- | 
| username       | 
| password_digest| 
| session_token  | 
| email          | 


| Movies       |
| ------------ |
| title        |
| tagline      |
| synopsis     |
| poster       |
| genre        |
| runtime      |
| release_date |
| user_id      |
| api_id       |

| Seen Movies |
| ----------- |
| user_id     |
| movie_id    |

## Code Samples

```javascript
//allows user to save a movie to their seen movies and inserts it into the database 
  handleSeenMovies() {
    axios('/movies', {
      method: 'POST',
      data: {
        movie: {
          api_id: this.state.movieData.id,
          title: this.state.movieData.title,
          tagline: this.state.movieData.tagline,
          synopsis: this.state.movieData.overview,
          poster: this.state.movieData.poster_path,
          genre: this.state.movieData.genres[0].name,
          runtime: this.state.movieData.runtime,
          release_date: this.state.movieData.release_date
              }
      },
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      }
    }).then(res => {
      console.log(res.data.movie)
      this.setState({
        seenMovieData: res.data.movie,
        seenMovieDataLoaded: true,
        shouldFireRedirect: true,
      })
    })
  }
```

```ruby
# makes API call to render newly released movies upon initial page load
def index_search
        movie_key = Rails.application.secrets.api_key || ENV['api_key']
        poster_response = HTTParty.get("https://api.themoviedb.org/3/configuration?api_key=#{movie_key}")
        response = HTTParty.get("https://api.themoviedb.org/3/movie/now_playing?api_key=#{movie_key}&language=en-US&page=1")    
        render json: {response: response, poster_response: poster_response} 
end

 # makes API call to render info about individual movies
    def show_search
        movie_key = Rails.application.secrets.api_key || ENV['api_key']
        movie_id = params[:id]
        response = HTTParty.get("https://api.themoviedb.org/3/movie/#{movie_id}?api_key=#{movie_key}")
        render json: { response: response }
    end
```

## SeenIt? User Stories

When the page loads, a user will see a list of 20 posters of recently released films. The user will be able to click on any of these posters and they will be directed to a page with information about that specific movie. Users can also search for a movie by typing the movie's name into the search input above the posters. On submit, a bunch of results will return with posters of both the movie you intended to search for and others with similar titles. For example, if the user wants to search for 'Star Wars' but only types in 'star', the search will return posters for every Star Wars movie but also for Star Trek movies.

At the bottom of the single movie page, a user will see a link that says 'Hey! I've Seen This Movie!'. This link allows a movie to be saved to a user's 'Seen Movies' page. However, a user will not be able to save a movie unless they are logged in to their user account. If a user is not logged in, they will be redirected to the login form where they can input their username and password and subsequently be able to save a movie to their 'Seen Movies' page.

On the user's 'Seen Movies' page, their seen movies will be displayed in the same fashion as the movies are displayed on the main page and like the results on the main page, the user can click on a poster and be directed to that movie's individual page.

If a user has added a movie to their 'Seen Movies' that he or she has actually not seen, they have the ability to delete that movie from their list. All they have to do is hover over that under that movie's image and a delete button will appear, which on click will delete that movie from the user's database of seen movies.

## Future Improvements

Due to this being a project I had only a week to work on before submitting a version of it, there are several improvements that I would like to make. 

When a user goes to mark that he or she has seen the movie, I want to have an input field where they can mark either the date they saw it or when they specifically added so that down the road they can look back and see when they saw the movie.

I also want to be able to search for movies from any page instead of just the home page. I attempted to get this to work, but was having bugs, so I plan on going back to fixing those problems.

It will require another API call, but on a movie's single page, I would also like to display each film's director and primary cast members. As alluded to before, time constraints (and lack of sleep and sanity brought on by said lack of sleep) prevented me from getting to this while I focused on getting basic app functionality, but this is the thing I absolutely plan on doing in the near future.

On a user's 'Seen Movies' page, I want a user to be able to filter through their seen movies instead of just having to scroll through a super long list of movies. I would start with filtering by genre, but would also like to filter by director or cast member when I implement those values to my movies table.


