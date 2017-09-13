class CreateMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.string :title
      t.string :tagline
      t.string :synopsis
      t.string :poster
      t.string :genre
      t.string :runtime
      t.string :release_date

      t.belongs_to :user

      t.timestamps
    end
  end
end
