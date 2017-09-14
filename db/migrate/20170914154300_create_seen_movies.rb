class CreateSeenMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :seen_movies do |t|
      t.belongs_to :users
      t.belongs_to :movies 
      t.timestamps
    end
  end
end
