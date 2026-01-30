# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2026_01_30_211207) do
  create_table "exercises", force: :cascade do |t|
    t.string "title", null: false
    t.text "description", null: false
    t.text "start_file", null: false
    t.text "end_file", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["created_at"], name: "index_exercises_on_created_at"
    t.index ["title"], name: "index_exercises_on_title"
    t.index ["user_id"], name: "index_exercises_on_user_id"
  end

  create_table "practice_attempts", force: :cascade do |t|
    t.integer "practice_session_id", null: false
    t.integer "exercise_id"
    t.datetime "started_at", null: false
    t.datetime "completed_at"
    t.integer "keystrokes", default: 0, null: false
    t.integer "duration_seconds"
    t.boolean "success", default: false, null: false
    t.boolean "skipped", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["exercise_id"], name: "index_practice_attempts_on_exercise_id"
    t.index ["practice_session_id", "exercise_id"], name: "index_practice_attempts_on_practice_session_id_and_exercise_id"
    t.index ["practice_session_id"], name: "index_practice_attempts_on_practice_session_id"
  end

  create_table "practice_sessions", force: :cascade do |t|
    t.integer "user_id", null: false
    t.datetime "started_at", null: false
    t.datetime "ended_at"
    t.integer "total_exercises_attempted", default: 0, null: false
    t.integer "total_exercises_completed", default: 0, null: false
    t.integer "total_keystrokes", default: 0, null: false
    t.integer "total_duration_seconds"
    t.string "quit_reason"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ended_at"], name: "index_practice_sessions_on_ended_at"
    t.index ["started_at"], name: "index_practice_sessions_on_started_at"
    t.index ["user_id", "started_at"], name: "index_practice_sessions_on_user_id_and_started_at"
    t.index ["user_id"], name: "index_practice_sessions_on_user_id"
  end

  create_table "star_hunt_sessions", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "current_stage", default: 1, null: false
    t.integer "completed_stages", default: 0, null: false
    t.integer "total_keystrokes", default: 0, null: false
    t.datetime "ended_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_star_hunt_sessions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "exercises", "users"
  add_foreign_key "practice_attempts", "exercises"
  add_foreign_key "practice_attempts", "practice_sessions"
  add_foreign_key "practice_sessions", "users"
  add_foreign_key "star_hunt_sessions", "users"
end
