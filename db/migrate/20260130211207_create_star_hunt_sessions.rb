class CreateStarHuntSessions < ActiveRecord::Migration[8.0]
  def change
    create_table :star_hunt_sessions do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :current_stage, null: false, default: 1
      t.integer :completed_stages, null: false, default: 0
      t.integer :total_keystrokes, null: false, default: 0
      t.datetime :ended_at

      t.timestamps
    end
  end
end
