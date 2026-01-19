class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # Associations
  has_many :exercises, dependent: :destroy
  has_many :practice_sessions, dependent: :destroy
  has_many :practice_attempts, through: :practice_sessions
end
