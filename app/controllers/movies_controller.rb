
    class MoviesController < ApiController
    before_action :require_login, except: [:index_search, :show_search, :search]
    
    # renders user's seen movies
    def index
        movies = Movie.where(user_id: current_user.id)
        render json: { movies: movies }
    end
    
    # makes API call to render newly released movies upon initial page load
    def index_search
        movie_key = Rails.application.secrets.api_key || ENV['api_key']
        poster_response = HTTParty.get("https://api.themoviedb.org/3/configuration?api_key=#{movie_key}")
        response = HTTParty.get("https://api.themoviedb.org/3/movie/now_playing?api_key=#{movie_key}&language=en-US&page=1")    
        render json: {response: response, poster_response: poster_response} 
    end

    def show
        movie = current_user.movies.find_by(params[:id])
        render json: { movie: movie }
    end

    # makes API call to render info about individual movies
    def show_search
        movie_key = Rails.application.secrets.api_key || ENV['api_key']
        movie_id = params[:id]
        response = HTTParty.get("https://api.themoviedb.org/3/movie/#{movie_id}?api_key=#{movie_key}")
        render json: { response: response }
    end

    # makes API call to return movie posters
    def search
        movie_key = Rails.application.secrets.api_key || ENV['api_key']
        movie = params[:movieName]
        poster_response = HTTParty.get("https://api.themoviedb.org/3/configuration?api_key=#{movie_key}")
        response = HTTParty.get("https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=#{movie}&language=en-US&api_key=#{movie_key}") 
        render json: { response: response, poster_response: poster_response }
    end
    
    # adds seen movie to user's database of seen movies
    def create
        movie = Movie.new(movie_params)
        movie.user = current_user

        if movie.save
            render json: {
                message: 'ok',
                movie: movie
            }
        else
            render json: {message: movie.errors.full_messages}
        end
    end
    
    # deletes seen movie from user's database of seen movies
    def destroy
        movie = params[:id]
        Movie.where(user_id: current_user.id, id: movie).destroy_all
    end

    private
    def movie_params
        params.require(:movie).permit(:api_id, :title, :tagline, :synopsis, :poster, :genre, :runtime, :release_date, :cast, :crew)
    end
end
