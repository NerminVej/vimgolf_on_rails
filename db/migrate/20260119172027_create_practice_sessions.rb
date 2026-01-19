class CreatePracticeSessions < ActiveRecord::Migration[8.0]
  def change
    create_table :practice_sessions do |t|
      t.references :user, null: false, foreign_key: true, index: true
      t.datetime :started_at, null: false
      t.datetime :ended_at
      t.integer :total_exercises_attempted, default: 0, null: false
      t.integer :total_exercises_completed, default: 0, null: false
      t.integer :total_keystrokes, default: 0, null: false
      t.integer :total_duration_seconds
      t.string :quit_reason # 'manual_quit', 'completed_all', 'new_session_started'
      t.timestamps
    end

    add_index :practice_sessions, :started_at
    add_index :practice_sessions, :ended_at
    add_index :practice_sessions, [:user_id, :started_at]
  end
end
