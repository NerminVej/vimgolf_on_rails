# Vimgolf Exercises Import System

This system makes it super easy to import Vimgolf exercises in bulk using YAML files.

## Quick Start

### 1. Create a YAML file with your exercises

Create a new file in this directory (e.g., `my_exercises.yml`):

```yaml
exercises:
  - title: "Your Exercise Title"
    description: |
      Your exercise description.
      Can be multiple lines.
    start_file: |
      Your starting file content
      Can have multiple lines
    end_file: |
      Your goal/end file content
      Can have multiple lines
```

### 2. Import the exercises

```bash
# Import exercises (skips duplicates)
rails import:exercises[exercise_data/my_exercises.yml]

# Force import (updates existing exercises)
rails import:exercises_force[exercise_data/my_exercises.yml]
```

That's it! Your exercises are now in the database.

## Using with Claude or ChatGPT

This is where it gets REALLY easy. You can use AI to convert any format to the YAML template.

### Example Prompt for Claude/ChatGPT:

```
Convert these vimgolf exercises to YAML format:

[YAML Template]
exercises:
  - title: "Exercise Title"
    description: |
      Description here
    start_file: |
      Start content
    end_file: |
      End content

[My Data]
Title: Swap Variables
Description: Swap the two variable assignments
Start: x = 1
       y = 2
End:   x = 2
       y = 1

Title: Add Commas
Description: Add commas between words
Start: apple banana cherry
End:   apple, banana, cherry
```

Then just copy the AI's response into a YAML file and import it!

## Examples

### Example 1: Single Exercise

```yaml
exercises:
  - title: "Hello World"
    description: |
      Change 'Hello' to 'Goodbye' in the text.
    start_file: |
      Hello World
    end_file: |
      Goodbye World
```

### Example 2: Multiple Exercises

```yaml
exercises:
  - title: "Delete Empty Lines"
    description: "Remove all empty lines from the file"
    start_file: |
      line 1

      line 2
    end_file: |
      line 1
      line 2

  - title: "Add Semicolons"
    description: "Add semicolons to each line"
    start_file: |
      const x = 1
      const y = 2
    end_file: |
      const x = 1;
      const y = 2;
```

## Importing from Real Vimgolf.com

If you want to import exercises from vimgolf.com, here's the workflow:

1. Go to a vimgolf challenge (e.g., https://www.vimgolf.com/challenges/...)
2. Copy the challenge details
3. Use this Claude/ChatGPT prompt:

```
Convert this vimgolf challenge to YAML format following this template:

exercises:
  - title: "Title Here"
    description: |
      Description here
    start_file: |
      Starting file content
    end_file: |
      Goal/end file content

Here's the vimgolf challenge:
[PASTE CHALLENGE DATA HERE]
```

4. Copy the output to a YAML file
5. Run `rails import:exercises[exercise_data/your_file.yml]`

## Tips

### Handling Special Characters

If your exercise has special characters or formatting, use the literal block scalar (`|`):

```yaml
start_file: |
  def hello():
      print("Hello")
```

### Multi-line Descriptions

```yaml
description: |
  This is a longer description.

  It can have multiple paragraphs.

  And even code examples if needed.
```

### Preserving Whitespace

The `|` symbol preserves newlines. If you need to preserve trailing spaces, use `|+`:

```yaml
start_file: |+
  line with spaces
  another line
```

## Advanced: Bulk Import Script

If you want to import many files at once, create a simple bash script:

```bash
#!/bin/bash
# import_all.sh

for file in db/exercise_data/*.yml; do
  if [ "$file" != "db/exercise_data/examples.yml" ]; then
    echo "Importing $file..."
    rails import:exercises["exercise_data/$(basename $file)"]
  fi
done
```

Make it executable and run:
```bash
chmod +x import_all.sh
./import_all.sh
```

## Configuration

### Custom Seed User

By default, imported exercises are assigned to `seed@vimgolf.local`. To use a different user:

```bash
SEED_USER_EMAIL=your@email.com rails import:exercises[exercise_data/my_exercises.yml]
```

### Avoiding Duplicates

The import task checks for existing exercises by title. If an exercise with the same title exists, it will be skipped (unless using `import:exercises_force`).

## File Structure

```
db/
├── exercises_template.yml          # Template with examples
└── exercise_data/
    ├── README.md                   # This file
    ├── examples.yml                # Example exercises (ready to import)
    ├── my_exercises.yml            # Your custom exercises
    └── vimgolf_classics.yml        # More exercises...
```

## Troubleshooting

### Error: File not found
Make sure your file is in the `db/exercise_data/` directory.

### Error: No 'exercises' key found
Your YAML file must have an `exercises:` key at the top level.

### Validation errors
Check that:
- Title is 3-200 characters
- Description is 10-2000 characters
- start_file and end_file are not empty

## Next Steps

1. Check out `examples.yml` for ready-to-import exercises
2. Create your first custom YAML file
3. Use Claude/ChatGPT to convert vimgolf challenges
4. Import and enjoy!

Happy Vimgolfing! 🏌️
