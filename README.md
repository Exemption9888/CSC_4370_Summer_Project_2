# Project 2 — 15 Puzzle

A browser-based **15 Puzzle** game built with PHP, JavaScript, CSS, and MySQL.  
The player shuffles a 4 × 4 image puzzle, moves adjacent tiles into the empty space, and attempts to restore the original image. Completed games can be submitted to a database-backed leaderboard.

## Features

- 4 × 4 sliding-tile puzzle
- Beach image divided across 15 movable tiles
- Three difficulty settings:
  - Easy: 1 shuffle move
  - Medium: 25 shuffle moves
  - Hard: 40 shuffle moves
- Shuffle and reset controls
- Timer measured in seconds
- Move counter
- Win detection
- Player-name submission form
- MySQL leaderboard showing player name, completion time, and moves
- Responsive styling for smaller screens

## Folder Structure

```text
project 2/
├── backend/
│   ├── database.php
│   └── submission.php
└── frontend/
    ├── index.php
    ├── script.js
    ├── styles.css
    └── beach.jpg
```

## File Overview

### `frontend/index.php`

The main page of the application.

It:

- Loads the database connection
- Displays the puzzle board
- Displays the difficulty selector, timer, move counter, and controls
- Displays the win and score-submission form
- Retrieves player records from the database
- Builds the leaderboard
- Loads `styles.css` and `script.js`

### `frontend/script.js`

Contains the puzzle logic, including:

- Moving tiles
- Checking whether a move is valid
- Shuffling the board with valid moves
- Resetting the board
- Starting and stopping the timer
- Counting moves
- Detecting a solved puzzle
- Displaying the win screen
- Sending the final time and move count through hidden form fields

### `frontend/styles.css`

Defines the page layout and appearance, including:

- Color variables
- Puzzle-grid layout
- Tile dimensions and image positions
- Win-screen animation
- Responsive media queries

The stylesheet expects the puzzle image to be located at:

```text
frontend/beach.jpg
```

### `backend/database.php`

Creates a MySQL connection and creates the `players` table when it does not already exist.

The table contains:

| Column | Type | Description |
|---|---|---|
| `id` | Unsigned integer | Auto-incrementing primary key |
| `playerName` | `VARCHAR(30)` | Player's submitted name |
| `playerTime` | Unsigned integer | Completion time in seconds |
| `playerMoves` | Unsigned integer | Number of moves made |

### `backend/submission.php`

Processes the score-submission form.

It:

1. Reads the player's name, time, and move count from the POST request
2. Inserts the values into the `players` table with a prepared statement
3. Redirects the player back to `frontend/index.php`

## Requirements

- A web server with PHP support, such as Apache
- PHP with the MySQLi extension enabled
- MySQL or MariaDB
- A modern web browser

Common local development environments include:

- XAMPP
- MAMP
- WAMP
- A manually configured Apache, PHP, and MySQL installation

## Installation

1. Place the `project 2` directory inside your web server's document root.

   Examples:

   ```text
   XAMPP: htdocs/project 2/
   MAMP:  htdocs/project 2/
   ```

2. Create a MySQL database for the project.

3. Open `backend/database.php` and update the database settings:

   ```php
   $host = "localhost";
   $user = "your_username";
   $pass = "your_password";
   $dbname = "your_database";
   ```

4. Confirm that the database user has permission to:

   - Connect to the database
   - Create tables
   - Select records
   - Insert records

5. Confirm that the image file is named `beach.jpg` and is stored in the `frontend` directory.

6. Start the web server and MySQL service.

7. Open the project in a browser:

   ```text
   http://localhost/project%202/frontend/index.php
   ```

   Depending on the server, a URL containing the literal space may also work:

   ```text
   http://localhost/project 2/frontend/index.php
   ```

## How to Play

1. Select a difficulty level.
2. Click **Shuffle**.
3. Click a tile next to the empty space to move it.
4. Continue until the image returns to its original arrangement.
5. After winning, enter your name and click **Submit**.
6. The page reloads and displays the saved result on the leaderboard.

## Database Schema

The application automatically runs a statement equivalent to:

```sql
CREATE TABLE IF NOT EXISTS players (
    id INT(4) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    playerName VARCHAR(30) NOT NULL,
    playerTime INT(4) UNSIGNED NOT NULL,
    playerMoves INT(4) UNSIGNED NOT NULL
);
```

## Important Notes

- The application must be opened through a PHP-enabled web server. Opening `index.php` directly from the file system will not execute the PHP code.
- The frontend uses relative paths to access the backend:
  - `../backend/database.php`
  - `../backend/submission.php`
- The database credentials should not be committed to a public repository. For a production project, store them in environment variables or a configuration file excluded by `.gitignore`.
- The leaderboard currently retrieves every row from the `players` table without sorting or limiting the results.
- The shuffle algorithm performs valid puzzle moves, so the shuffled board remains solvable.

## Possible Improvements

- Sort the leaderboard by completion time or move count
- Limit the leaderboard to the top scores
- Validate player names on both the client and server
- Prevent empty player names
- Add duplicate-score handling
- Add sound effects
- Add a pause button
- Improve mobile scaling
- Store database credentials in environment variables
- Add error pages instead of only logging database messages
- Prevent an immediate solved state after a very small shuffle
- Add automated PHP and JavaScript tests

## Technologies Used

- HTML
- CSS
- JavaScript
- PHP
- MySQL
- MySQLi prepared statements
