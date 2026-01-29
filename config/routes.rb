Rails.application.routes.draw do
  devise_for :users

  resources :exercises do
    member do
      get :play
      post :complete
    end
  end

  resources :practice_sessions, only: [:create, :show] do
    member do
      post :quit
      post :skip
      get :next
      get :stats
    end
  end

  resources :practice_attempts, only: [] do
    member do
      post :complete
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check

  root "pages#home"

  get "home", to: "pages#home"
end
