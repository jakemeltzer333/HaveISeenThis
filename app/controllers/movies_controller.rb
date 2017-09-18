
    class MoviesController < ApiController
    before_action :require_login, except: [:index_search, :show_search, :search]
    
    def index
        # movies = current_user.movies.all
        movies = Movie.where(user_id: current_user.id)
        render json: { movies: movies }
    end
    
    def index_search
        movie_key = Rails.application.secrets.api_key
        poster_response = HTTParty.get("https://api.themoviedb.org/3/configuration?api_key=#{movie_key}")
        response = HTTParty.get("https://api.themoviedb.org/3/movie/top_rated?api_key=#{movie_key}&language=en-US&page=1")    
        render json: {response: response, poster_response: poster_response} 
    end

    def show
        movie = current_user.movies.find_by(params[:id])
        render json: { movie: movie }
    end

    def show_search
        movie_key = Rails.application.secrets.api_key
        movie_id = params[:id]
        response = HTTParty.get("https://api.themoviedb.org/3/movie/#{movie_id}?api_key=#{movie_key}")
        render json: { response: response }
    end

    def search
        movie_key = Rails.application.secrets.api_key
        movie = params[:movieName]
        poster_response = HTTParty.get("https://api.themoviedb.org/3/configuration?api_key=#{movie_key}")
        response = HTTParty.get("https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=#{movie}&language=en-US&api_key=#{movie_key}") 
        render json: { response: response, poster_response: poster_response }
    end

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

    def destroy
        @user = User.find_by(params[:user_id])
        Movie.destroy(params[:id])
        redirect_to movies_path
    end

    private
    def movie_params
        params.require(:movie).permit(:title, :tagline, :synopsis, :poster, :genre, :runtime, :release_date)
    end
end
