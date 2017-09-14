class Movie < ApplicationRecord
    belongs_to :user
    has_many :seen_movies
end
