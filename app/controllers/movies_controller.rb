
    class MoviesController < ApiController
    before_action :require_login, except: [:index, :show, :search]
    
    def index
        movie_key = Rails.application.secrets.api_key
        response = HTTParty.get("https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=#{movie_key}")    
        render json: response  
    end

    def show
        movie_key = Rails.application.secrets.api_key
        movie_id = params[:id]
        response = HTTParty.get("https://api.themoviedb.org/3/movie/#{movie_id}?api_key={movie_key}") 
        render json: response
    end

    def search
        movie_key = Rails.application.secrets.api_key
        movie = params[:movieName]
        response = HTTParty.get("https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=#{movie}&language=en-US&api_key=#{movie_key}") 
        render json: response
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
