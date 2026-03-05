class StarHuntSessionsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_session, only: [:show, :complete, :quit, :stats, :destroy]

  def create
    # End any existing active sessions
    current_user.star_hunt_sessions.where(ended_at: nil).update_all(ended_at: Time.current)

    @session = current_user.star_hunt_sessions.create!(
      current_stage: 1,
      completed_stages: 0,
      total_keystrokes: 0
    )

    redirect_to star_hunt_session_path(@session)
  end

  def show
    @stage_data = @session.generate_current_stage
  end

  def complete
    keystrokes = params[:keystrokes].to_i
    content = params[:content]

    # Generate the current stage to validate
    stage_data = @session.generate_current_stage
    expected_content = stage_data[:end_file].strip

    if content.strip == expected_content
      @session.add_keystrokes(keystrokes)
      @session.advance_stage!

      render json: {
        success: true,
        message: "Star found! Stage #{@session.completed_stages} complete!",
        stats: {
          completed_stages: @session.completed_stages,
          total_keystrokes: @session.total_keystrokes
        }
      }
    else
      render json: { success: false, message: "Not quite right. Keep trying!" }, status: :unprocessable_entity
    end
  end

  def quit
    @session.update(ended_at: Time.current)
    redirect_to stats_star_hunt_session_path(@session)
  end

  def stats
    @session.update(ended_at: Time.current) if @session.ended_at.nil?
  end

  def destroy
    @session.destroy
    redirect_to root_path, notice: "Star Hunt session was successfully deleted."
  end

  private

  def set_session
    @session = current_user.star_hunt_sessions.find(params[:id])
  end
end
