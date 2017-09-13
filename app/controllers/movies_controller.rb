class MoviesController < ApiController
    before_action :require_login, except: [:index, :show]

    def index
        movies = Movie.all 
        render json: { movies: movies }
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
                movie: movie,
            }
        else
            render json: {message: 'Could not add movie'}
        end
    end

    private
    def movie_params
        params.require(:movie).permit(:title, :tagline, :synopsis, :poster, :genre, :runtime, :release_date)
    end
end
