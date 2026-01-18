class ExercisesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_exercise, only: [:show, :edit, :update, :destroy, :play, :complete]
  before_action :authorize_user!, only: [:edit, :update, :destroy]

  # GET /exercises
  def index
    @pagy, @exercises = pagy(:offset, Exercise.recent.includes(:user), limit: 20)
  end

  # GET /exercises/:id
  def show
    if params[:completed] == "true" && params[:keystrokes].present?
      flash.now[:notice] = "Congratulations! You completed this exercise in #{params[:keystrokes]} keystrokes!"
    end
  end

  # GET /exercises/:id/play
  def play
    # @exercise set by before_action
  end

  # POST /exercises/:id/complete
  def complete
    content = params[:content]

    if content && content.strip == @exercise.end_file.strip
      render json: { success: true, message: "Congratulations! You completed this exercise!" }
    else
      render json: { success: false, message: "Content doesn't match the target." }, status: :unprocessable_entity
    end
  end

  # GET /exercises/new
  def new
    @exercise = Exercise.new
  end

  # POST /exercises
  def create
    @exercise = current_user.exercises.build(exercise_params)

    if @exercise.save
      redirect_to @exercise, notice: "Exercise was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  # GET /exercises/:id/edit
  def edit
    # @exercise set by before_action
  end

  # PATCH/PUT /exercises/:id
  def update
    if @exercise.update(exercise_params)
      redirect_to @exercise, notice: "Exercise was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /exercises/:id
  def destroy
    @exercise.destroy
    redirect_to exercises_path, notice: "Exercise was successfully deleted."
  end

  private

  def set_exercise
    @exercise = Exercise.find(params[:id])
  end

  def authorize_user!
    unless @exercise.user == current_user
      redirect_to exercises_path, alert: "You are not authorized to perform this action."
    end
  end

  def exercise_params
    params.require(:exercise).permit(:title, :description, :start_file, :end_file)
  end
end
