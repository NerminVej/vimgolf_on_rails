# Claude/ChatGPT Prompt Template

Copy and paste this prompt into Claude or ChatGPT along with your vimgolf data to automatically convert it to the YAML format.

---

## Prompt Template

```
I need you to convert vimgolf exercises into a YAML format. Please follow this exact structure:

exercises:
  - title: "Exercise Title (3-200 characters)"
    description: |
      A clear description of what the user needs to do (10-2000 characters).
      Can be multiple lines.
    start_file: |
      The starting file content exactly as it appears
    end_file: |
      The goal/end file content exactly as it should be

Important rules:
1. Preserve all whitespace, newlines, and special characters exactly
2. Use the pipe symbol (|) for multi-line content
3. Keep titles concise but descriptive
4. Make descriptions clear and helpful
5. Ensure start_file and end_file are complete and accurate

Here's the vimgolf data to convert:

[PASTE YOUR DATA HERE]
```

---

## Example Usage

### Input to Claude/ChatGPT:

```
I need you to convert vimgolf exercises into a YAML format...

[paste template above]

Here's the vimgolf data to convert:

Challenge: Reverse Simple Lines
URL: vimgolf.com/challenges/abc123
Description: Reverse the order of lines in the file
Input:
one
two
three

Output:
three
two
one

Challenge: Comment Code
Description: Add // comments to the beginning of each line
Input:
console.log("hello")
console.log("world")

Output:
// console.log("hello")
// console.log("world")
```

### Expected Output from Claude/ChatGPT:

```yaml
exercises:
  - title: "Reverse Simple Lines"
    description: |
      Reverse the order of lines in the file.
      The last line should become the first, and vice versa.
    start_file: |
      one
      two
      three
    end_file: |
      three
      two
      one

  - title: "Comment Code"
    description: |
      Add // comments to the beginning of each line of JavaScript code.
    start_file: |
      console.log("hello")
      console.log("world")
    end_file: |
      // console.log("hello")
      // console.log("world")
```

---

## Quick Prompts for Different Sources

### From vimgolf.com URL

```
Convert this vimgolf challenge to YAML format using the template I provided earlier:

URL: https://www.vimgolf.com/challenges/5d3122c2cf88f60006e4f1e7

[Copy-paste the challenge details from the page]
```

### From Raw Data

```
Convert these exercises to YAML format:

Exercise 1:
Title: Delete Blank Lines
What to do: Remove all blank lines
Before:
a

b

c
After:
a
b
c

Exercise 2:
[...]
```

### For Batch Conversion

```
Convert all of these vimgolf challenges to a single YAML file:

1. Challenge: [...]
2. Challenge: [...]
3. Challenge: [...]
[etc.]
```

---

## Tips

1. **Be specific with formatting**: If the exercise involves spaces, tabs, or special whitespace, explicitly mention it to Claude/ChatGPT.

2. **Provide context**: Tell Claude/ChatGPT if there are tricky parts like trailing spaces, special characters, etc.

3. **Verify output**: Always check the YAML output before importing to ensure accuracy.

4. **Batch process**: You can convert multiple exercises at once - just provide all the data in one prompt.

---

## Full Example Workflow

1. Find vimgolf challenges you want to add
2. Copy this prompt template
3. Paste it into Claude or ChatGPT
4. Add your exercise data
5. Copy the YAML output
6. Save it to `db/exercise_data/my_exercises.yml`
7. Run: `rails import:exercises[exercise_data/my_exercises.yml]`
8. Done!

This makes it incredibly fast to import dozens of exercises in minutes!
