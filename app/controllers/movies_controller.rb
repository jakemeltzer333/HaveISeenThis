    require 'uri'
    require 'net/http'

    class MoviesController < ApiController
    before_action :require_login, except: [:index, :show]
    
    def index
        @movie_key = Rails.application.secrets.api_key
        url = URI("https://api.themoviedb.org/3/movie/top_rated?page=1&language=en-US&api_key=#{@movie_key}")
        
            http = Net::HTTP.new(url.host, url.port)
            http.use_ssl = true
            http.verify_mode = OpenSSL::SSL::VERIFY_NONE
        
            request = Net::HTTP::Get.new(url)
            request.body = "{}"
        
            response = http.request(request)
        render json: response.read_body  
    end

    def show
        movie = Movie.find(params[:id])
        movie_user = movie.user 
        render json:{ movie: movie, username: movie_user.username}
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
