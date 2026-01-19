class PracticeSessionsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_session, only: [:show, :quit, :next, :stats]

  def create
    # End any existing active sessions for this user
    current_user.practice_sessions.active.each do |session|
      session.update(
        ended_at: Time.current,
        quit_reason: 'new_session_started'
      )
    end

    # Create new practice session
    @session = current_user.practice_sessions.create!(started_at: Time.current)

    # Find first random exercise
    exercise = find_next_random_exercise

    if exercise.nil?
      flash[:alert] = "No exercises available for practice mode."
      redirect_to exercises_path and return
    end

    # Create first attempt
    @session.practice_attempts.create!(
      exercise: exercise,
      started_at: Time.current
    )

    # Update session counter
    @session.increment!(:total_exercises_attempted)

    redirect_to practice_session_path(@session)
  end

  def show
    # Find current incomplete attempt
    @current_attempt = @session.practice_attempts.where(completed_at: nil, skipped: false).last

    if @current_attempt.nil?
      # No active attempt, redirect to next or stats
      redirect_to next_practice_session_path(@session) and return
    end

    @exercise = @current_attempt.exercise

    if @exercise.nil?
      # Exercise was deleted, mark as skipped and move to next
      @current_attempt.update(skipped: true)
      redirect_to next_practice_session_path(@session) and return
    end
  end

  def quit
    # Find current incomplete attempt and mark as skipped
    current_attempt = @session.practice_attempts.where(completed_at: nil, skipped: false).last
    current_attempt&.update(skipped: true)

    # Calculate total duration
    duration = (Time.current - @session.started_at).to_i

    # End the session
    @session.update(
      ended_at: Time.current,
      quit_reason: 'manual_quit',
      total_duration_seconds: duration
    )

    redirect_to stats_practice_session_path(@session)
  end

  def next
    # Find next random exercise (excluding already attempted)
    exercise = find_next_random_exercise

    if exercise.nil?
      # No more exercises, end session
      duration = (Time.current - @session.started_at).to_i
      @session.update(
        ended_at: Time.current,
        quit_reason: 'completed_all',
        total_duration_seconds: duration
      )
      redirect_to stats_practice_session_path(@session) and return
    end

    # Create new attempt
    @session.practice_attempts.create!(
      exercise: exercise,
      started_at: Time.current
    )

    # Update session counter
    @session.increment!(:total_exercises_attempted)

    redirect_to practice_session_path(@session)
  end

  def stats
    @attempts = @session.practice_attempts.includes(:exercise).order(started_at: :asc)

    # Calculate additional stats
    @success_rate = if @session.total_exercises_attempted > 0
                     (@session.total_exercises_completed.to_f / @session.total_exercises_attempted * 100).round(1)
                   else
                     0
                   end

    @average_keystrokes = if @session.total_exercises_completed > 0
                           (@session.total_keystrokes.to_f / @session.total_exercises_completed).round(1)
                         else
                           0
                         end
  end

  private

  def set_session
    @session = current_user.practice_sessions.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    flash[:alert] = "Practice session not found."
    redirect_to exercises_path
  end

  def find_next_random_exercise
    attempted_ids = @session.practice_attempts.pluck(:exercise_id).compact
    Exercise.where.not(id: attempted_ids).order("RANDOM()").first
  end
end
