class RenameUserAndMovieIdForSeenMovies < ActiveRecord::Migration[5.1]
  def change
    rename_column :seen_movies, :users_id, :user_id
    rename_column :seen_movies, :movies_id, :movie_id
  end
end
