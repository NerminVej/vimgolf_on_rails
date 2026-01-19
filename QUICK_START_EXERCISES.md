# Quick Start: Importing Vimgolf Exercises

I've set up a super easy system for you to bulk import exercises. Here's how to use it:

## The Easiest Way (Using Claude/ChatGPT)

### Step 1: Copy this prompt

```
Convert these vimgolf exercises to YAML format:

exercises:
  - title: "Title"
    description: |
      Description
    start_file: |
      Start content
    end_file: |
      End content

Here's my data:
[PASTE YOUR EXERCISE DATA]
```

### Step 2: Get vimgolf data and paste it

For example:
```
Title: Swap Variables
Description: Fix the swapped variable assignments
Start:
x = 1
y = 2
End:
x = 2
y = 1
```

### Step 3: Save the YAML output

Save it to `db/exercise_data/my_exercises.yml`

### Step 4: Import

```bash
rails import:exercises[exercise_data/my_exercises.yml]
```

Done! Your exercises are now live.

## I Already Imported 10 Example Exercises

Run your Rails server and you'll see 10 ready-to-play exercises already imported!

## File Structure

```
db/
├── exercises_template.yml              # Template with examples
└── exercise_data/
    ├── README.md                       # Full documentation
    ├── CLAUDE_PROMPT_TEMPLATE.md       # Prompts for Claude/ChatGPT
    ├── examples.yml                    # 10 exercises (ALREADY IMPORTED!)
    └── [your_file.yml]                 # Add your own here
```

## Commands

```bash
# Import exercises (skip duplicates)
rails import:exercises[exercise_data/filename.yml]

# Force update existing exercises
rails import:exercises_force[exercise_data/filename.yml]
```

## YAML Format (Simple!)

```yaml
exercises:
  - title: "Your Title"
    description: |
      What to do
    start_file: |
      Starting content
    end_file: |
      Goal content
```

## Pro Tips

1. Use Claude/ChatGPT to convert any format to YAML instantly
2. See `db/exercise_data/CLAUDE_PROMPT_TEMPLATE.md` for ready-to-use prompts
3. Check `db/exercise_data/examples.yml` for inspiration
4. Read `db/exercise_data/README.md` for full documentation

That's it! You can now add hundreds of exercises in minutes instead of hours.
