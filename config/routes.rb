Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  # root "movies#index"
  
  post "/login" => "sessions#create"
  delete "/logout" => "sessions#destroy"
  get "/profile" => "users#profile"
  post "/movies" => "movies#search"

  resources :users
  resources :movies 
  resources :seen_movies
  
end
