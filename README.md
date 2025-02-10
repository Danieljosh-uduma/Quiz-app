# Quiz App

This is a simple Quiz App where users can answer 10 questions and see the leaderboard of everyone who has played. The app is built with HTML, CSS, and JavaScript, and uses Firebase Realtime Database to store and display the leaderboard.

## Features

- Users can enter their name and start the quiz.
- The quiz consists of 10 multiple-choice questions.
- Users can see their progress as they answer the questions.
- After completing the quiz, users are redirected to the leaderboard page.
- The leaderboard displays the top 3 players and a list of all players who have played the quiz.

## Technologies Used

- HTML
- CSS
- JavaScript
- Firebase Realtime Database


## How to Run

1. Clone the repository.
2. Open `index.html` in your web browser.
3. Enter your name and start the quiz.
4. Answer the 10 questions.
5. After completing the quiz, you will be redirected to the leaderboard page.

## Firebase Configuration

The Firebase Realtime Database is used to store and retrieve the leaderboard data. The configuration is set up in the `assets/js/module/firebase-db.js` file:

```js
const firebaseConfig = {
    databaseURL: "https://quiz-app-niel-default-rtdb.europe-west1.firebasedatabase.app/"
};