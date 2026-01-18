class ApplicationController < ActionController::Base
  include Pagy::Method

  allow_browser versions: :modern
end
