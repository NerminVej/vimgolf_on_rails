# VimGolf on Rails

A web-based Vim practice application where users can solve editing challenges and improve their Vim skills through interactive exercises and practice sessions.

## Technologies

- **Ruby on Rails** 8.0.3
- **Stimulus JS** - Frontend interactivity
- **Turbo Rails** - SPA-like experience
- **Tailwind CSS** - Styling
- **SQLite** - Database
- **Devise** - User authentication
- **Pagy** - Pagination
- **Importmap** - JavaScript management

## Features

- **User Authentication** - Sign up, login, and manage your account
- **Vim Exercises** - Browse and practice various Vim editing challenges
- **Play Mode** - Solve individual exercises with an integrated code editor
- **Practice Sessions** - Complete multiple exercises in sequence
- **Progress Tracking** - Track your attempts and view statistics
- **Responsive Design** - Clean, modern UI built with Tailwind CSS

## The Process

This project was built as a learning exercise to create a VimGolf-style practice platform using Ruby on Rails. The development focused on:

1. Setting up a Rails 8 application with modern frontend tooling
2. Integrating an interactive code editor within the Rails ecosystem
3. Implementing exercise management and user progress tracking
4. Creating an intuitive UI for practicing Vim commands
5. Building practice session workflows with statistics

## What I Learned

- **Better Vim Usage** - Deepened understanding of Vim commands and editing patterns while creating the exercises
- **Stimulus Integration** - Learned how to effectively integrate Stimulus controllers with complex interactive components like code editors inside a Ruby on Rails application
- **Modern Rails** - Gained experience with Rails 8's updated frontend approach using Importmap and Stimulus

## What Could Be Improved

- Add more exercises and difficulty levels
- Implement a leaderboard system to compare scores
- Add exercise categories and filtering
- Include video tutorials or hints for difficult exercises
- Export/import exercise data
- Add social features like sharing solutions
- Implement real Vim key bindings validation
- Add timed challenges

## How to Run the Project

### Prerequisites

- Ruby 3.x
- Rails 8.0.3
- SQLite3

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd vimgolf_on_rails
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Setup the database:
   ```bash
   rails db:create
   rails db:migrate
   rails db:seed
   ```

4. Start the development server:
   ```bash
   rails server
   ```

5. Visit `http://localhost:3000` in your browser

### Running Tests

```bash
rails test
```

## Video

https://github.com/user-attachments/assets/17b62bc6-f256-4995-bb18-cc3a08854b64

## License

This project is open source and available under the MIT License.
