class CreatePracticeAttempts < ActiveRecord::Migration[8.0]
  def change
    create_table :practice_attempts do |t|
      t.references :practice_session, null: false, foreign_key: true, index: true
      t.references :exercise, foreign_key: true, index: true # nullable for deleted exercises
      t.datetime :started_at, null: false
      t.datetime :completed_at
      t.integer :keystrokes, default: 0, null: false
      t.integer :duration_seconds
      t.boolean :success, default: false, null: false
      t.boolean :skipped, default: false, null: false
      t.timestamps
    end

    add_index :practice_attempts, [:practice_session_id, :exercise_id]
  end
end
