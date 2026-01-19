class Exercise < ApplicationRecord
  belongs_to :user
  has_many :practice_attempts, dependent: :nullify

  validates :title, presence: true, length: { minimum: 3, maximum: 200 }
  validates :description, presence: true, length: { minimum: 10, maximum: 2000 }
  validates :start_file, presence: true
  validates :end_file, presence: true
  validates :user_id, presence: true

  # Scopes for common queries
  scope :recent, -> { order(created_at: :desc) }
  scope :by_user, ->(user_id) { where(user_id: user_id) }
end
