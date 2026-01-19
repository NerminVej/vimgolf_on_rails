class PracticeAttempt < ApplicationRecord
  belongs_to :practice_session
  belongs_to :exercise

  validates :started_at, presence: true

  scope :successful, -> { where(success: true) }
  scope :recent, -> { order(started_at: :desc) }
end
