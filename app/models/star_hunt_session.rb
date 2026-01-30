class StarHuntSession < ApplicationRecord
  belongs_to :user

  validates :current_stage, numericality: { greater_than_or_equal_to: 1 }
  validates :completed_stages, numericality: { greater_than_or_equal_to: 0 }

  # Generate a deterministic stage based on session ID and stage number
  def self.generate_stage(session_id, stage_number)
    # Use session ID and stage number as seed for deterministic randomness
    rng = Random.new(session_id.to_i * 1000 + stage_number)

    # Increase difficulty: more lines and wider grid as stages progress
    lines = [10, 15, 20].sample(random: rng)
    max_width = [30, 40, 50, 60].sample(random: rng)

    # Random star position
    star_line = rng.rand(0...lines)
    star_col = rng.rand(5...max_width)

    # Build the grid
    grid = Array.new(lines) do |i|
      if i == star_line
        # Line with star
        (" " * star_col) + "*" + (" " * (max_width - star_col - 1))
      else
        # Empty line with random width
        " " * max_width
      end
    end

    {
      start_file: grid.join("\n"),
      end_file: grid.map { |line| line.gsub('*', '') }.join("\n"),
      star_position: { line: star_line + 1, column: star_col + 1 }
    }
  end

  def generate_current_stage
    self.class.generate_stage(id, current_stage)
  end

  def advance_stage!
    increment!(:completed_stages)
    increment!(:current_stage)
  end

  def add_keystrokes(count)
    increment!(:total_keystrokes, count)
  end
end
