class PracticeSession < ApplicationRecord
  belongs_to :user
  has_many :practice_attempts, dependent: :destroy

  validates :user_id, presence: true
  validates :started_at, presence: true

  scope :active, -> { where(ended_at: nil) }
  scope :completed, -> { where.not(ended_at: nil) }
  scope :recent, -> { order(started_at: :desc) }
end
