class AddCastAndCrewToMovies < ActiveRecord::Migration[5.1]
  def change
    add_column :movies, :cast, :string
    add_column :movies, :crew, :string
  end
end
