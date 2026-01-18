class CreateExercises < ActiveRecord::Migration[8.0]
  def change
    create_table :exercises do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.text :start_file, null: false
      t.text :end_file, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    add_index :exercises, :title
    add_index :exercises, :created_at
  end
end
