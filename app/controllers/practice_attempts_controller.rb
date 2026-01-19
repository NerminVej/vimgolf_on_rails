class PracticeAttemptsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_attempt

  def complete
    # Check if already completed (idempotency)
    if @attempt.completed_at.present?
      render json: {
        success: false,
        message: "This exercise was already completed."
      }, status: :unprocessable_entity
      return
    end

    # Get submitted content and keystrokes
    submitted_content = params[:content]&.strip
    keystrokes = params[:keystrokes].to_i

    # Get target content
    target_content = @attempt.exercise.end_file.strip

    # Compare content
    if submitted_content == target_content
      # Calculate duration
      duration = (Time.current - @attempt.started_at).to_i

      # Update attempt
      @attempt.update!(
        completed_at: Time.current,
        keystrokes: keystrokes,
        duration_seconds: duration,
        success: true
      )

      # Update session counters
      session = @attempt.practice_session
      session.increment!(:total_exercises_completed)
      session.increment!(:total_keystrokes, keystrokes)

      render json: {
        success: true,
        message: "Completed in #{keystrokes} keystrokes!",
        next_url: next_practice_session_path(session),
        stats: {
          completed: session.total_exercises_completed,
          attempted: session.total_exercises_attempted,
          keystrokes: session.total_keystrokes
        }
      }
    else
      render json: {
        success: false,
        message: "Content doesn't match the target yet. Keep trying!"
      }, status: :unprocessable_entity
    end
  end

  private

  def set_attempt
    @attempt = PracticeAttempt.find(params[:id])

    # Verify this attempt belongs to current user's session
    unless @attempt.practice_session.user_id == current_user.id
      render json: {
        success: false,
        message: "Unauthorized"
      }, status: :unauthorized
    end
  rescue ActiveRecord::RecordNotFound
    render json: {
      success: false,
      message: "Practice attempt not found."
    }, status: :not_found
  end
end
