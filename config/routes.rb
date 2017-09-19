Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  root to: "root#index"
  
  post "/login" => "sessions#create"
  delete "/logout" => "sessions#destroy"
  get "/profile" => "users#profile"
  get "/movies/search" => "movies#index_search"
  put "/movies/search" => "movies#search"
  get "/movies/search/:id" => "movies#show_search"

  resources :users
  resources :movies 
  
end
