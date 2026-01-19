namespace :import do
  desc "Import exercises from a YAML file"
  task :exercises, [:filename] => :environment do |t, args|
    require 'yaml'

    # Default filename if not provided
    filename = args[:filename] || 'exercise_data/exercises.yml'
    filepath = Rails.root.join('db', filename)

    unless File.exist?(filepath)
      puts "Error: File not found at #{filepath}"
      puts "Usage: rails import:exercises[filename.yml]"
      puts "Example: rails import:exercises[exercise_data/my_exercises.yml]"
      exit 1
    end

    # Find or create a default user for seeded exercises
    default_email = ENV['SEED_USER_EMAIL'] || 'seed@vimgolf.local'
    user = User.find_or_create_by!(email: default_email) do |u|
      u.password = SecureRandom.hex(32)
    end

    puts "Loading exercises from: #{filepath}"
    data = YAML.load_file(filepath)

    unless data['exercises']
      puts "Error: No 'exercises' key found in YAML file"
      exit 1
    end

    imported_count = 0
    skipped_count = 0
    error_count = 0

    data['exercises'].each_with_index do |exercise_data, index|
      begin
        # Check if exercise already exists (by title)
        existing = Exercise.find_by(title: exercise_data['title'])

        if existing
          puts "⏭️  Skipping '#{exercise_data['title']}' (already exists)"
          skipped_count += 1
          next
        end

        exercise = Exercise.create!(
          title: exercise_data['title'],
          description: exercise_data['description'],
          start_file: exercise_data['start_file'],
          end_file: exercise_data['end_file'],
          user: user
        )

        puts "✅ Imported: #{exercise.title}"
        imported_count += 1

      rescue ActiveRecord::RecordInvalid => e
        puts "❌ Error importing exercise #{index + 1}: #{e.message}"
        error_count += 1
      rescue => e
        puts "❌ Unexpected error importing exercise #{index + 1}: #{e.message}"
        error_count += 1
      end
    end

    puts "\n" + "="*60
    puts "Import Summary:"
    puts "  ✅ Imported: #{imported_count}"
    puts "  ⏭️  Skipped:  #{skipped_count}"
    puts "  ❌ Errors:   #{error_count}"
    puts "="*60
  end

  desc "Import exercises and overwrite existing ones"
  task :exercises_force, [:filename] => :environment do |t, args|
    require 'yaml'

    filename = args[:filename] || 'exercise_data/exercises.yml'
    filepath = Rails.root.join('db', filename)

    unless File.exist?(filepath)
      puts "Error: File not found at #{filepath}"
      exit 1
    end

    default_email = ENV['SEED_USER_EMAIL'] || 'seed@vimgolf.local'
    user = User.find_or_create_by!(email: default_email) do |u|
      u.password = SecureRandom.hex(32)
    end

    puts "Loading exercises from: #{filepath}"
    data = YAML.load_file(filepath)

    imported_count = 0
    updated_count = 0

    data['exercises'].each do |exercise_data|
      existing = Exercise.find_by(title: exercise_data['title'])

      if existing
        existing.update!(
          description: exercise_data['description'],
          start_file: exercise_data['start_file'],
          end_file: exercise_data['end_file']
        )
        puts "🔄 Updated: #{existing.title}"
        updated_count += 1
      else
        exercise = Exercise.create!(
          title: exercise_data['title'],
          description: exercise_data['description'],
          start_file: exercise_data['start_file'],
          end_file: exercise_data['end_file'],
          user: user
        )
        puts "✅ Imported: #{exercise.title}"
        imported_count += 1
      end
    end

    puts "\n" + "="*60
    puts "Import Summary:"
    puts "  ✅ New:     #{imported_count}"
    puts "  🔄 Updated: #{updated_count}"
    puts "="*60
  end
end
