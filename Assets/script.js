// Quiz questions and answers
const questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question: "The condition in an if / else statement is enclosed within ________.",
    choices: ["quotes", "curly braces", "parentheses", "square braces"],
    answer: "parentheses",
  },
  {
    question: "Arrays in JavaScript can be used to store _______.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above",
  },
  {
    question: "String values must be enclosed within ___________ when being assigned to variables.",
    choices: ["commas", "curly braces", "quotes", "parentheses"],
    answer: "quotes",
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    answer: "console.log",
  },
];


const startPage = document.getElementById("start-page");
const quizPage = document.getElementById("quiz-page");
const endQuizPage = document.getElementById("end-quiz-page");
const highscorePage = document.getElementById("highscore-page");
const startButton = document.getElementById("start");
const timerElement = document.getElementById("time");
const questionElement = document.getElementById("question");
const choicesContainer = document.getElementById("choices");
const feedbackElement = document.getElementById("feedback");
const finalScoreElement = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitScoreButton = document.getElementById("submit-score");

let currentQuestionIndex;
let timeLeft;
let timerInterval;
let highscores = [];

// Start the quiz when the start button is clicked
startButton.addEventListener("click", startQuiz);
submitScoreButton.addEventListener("click", submitHighscore);

// Function to start the quiz
function startQuiz() {
  startPage.style.display = "none";
  quizPage.style.display = "block";

  currentQuestionIndex = 0;
  timeLeft = 60; // Set the timer to 60 seconds
  timerElement.textContent = timeLeft;

  // Start the timer
  timerInterval = setInterval(updateTimer, 1000);

  // Display the first question
  displayQuestion();
}

// Function to update the timer
function updateTimer() {
  timeLeft--;
  timerElement.textContent = timeLeft;

  if (timeLeft <= 0) {
    // Quiz is over when the timer reaches 0
    clearInterval(timerInterval);
    endQuiz();
  }
}

// Function to display a question
function displayQuestion() {
  const question = questions[currentQuestionIndex];
  questionElement.textContent = question.question;
  choicesContainer.innerHTML = "";

  // Create and display the answer choices
  for (let i = 0; i < question.choices.length; i++) {
    const choice = question.choices[i];
    const choiceButton = document.createElement("button");
    choiceButton.textContent = choice;
    choiceButton.addEventListener("click", handleChoiceClick);
    choicesContainer.appendChild(choiceButton);
  }
}

// Function to handle the user's choice
function handleChoiceClick(event) {
  const selectedChoice = event.target;
  const question = questions[currentQuestionIndex];

  if (selectedChoice.textContent === question.answer) {
    // The answer is correct
    feedbackElement.textContent = "Correct!";
  } else {
    // The answer is wrong
    feedbackElement.textContent = "Wrong!";
    timeLeft -= 10; // Penalty of 10 seconds for wrong answers
    if (timeLeft < 0) {
      timeLeft = 0;
    }
  }

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    // All questions have been answered
    clearInterval(timerInterval);
    endQuiz();
  } else {
    displayQuestion();
  }
}

// Function to end the quiz and display the final score page
function endQuiz() {
  quizPage.style.display = "none";
  endQuizPage.style.display = "block";
  finalScoreElement.textContent = timeLeft;
}

// Function to submit the high score
function submitHighscore(event) {
  event.preventDefault();
  const initials = initialsInput.value.trim();

  if (initials !== "") {
    const highscore = {
      initials: initials,
      score: timeLeft,
    };

    highscores.push(highscore);
    highscores.sort((a, b) => b.score - a.score); // Sort high scores in descending order

    // Clear the input field
    initialsInput.value = "";

    // Display the highscores page
    endQuizPage.style.display = "none";
    highscorePage.style.display = "block";
    displayHighscores();
  }
}

// Function to display high scores
function displayHighscores() {
  const highscoreList = document.getElementById("highscore-list");
  highscoreList.innerHTML = "";

  for (let i = 0; i < highscores.length; i++) {
    const highscore = highscores[i];
    const highscoreItem = document.createElement("div");
    highscoreItem.textContent = `${highscore.initials}: ${highscore.score}`;
    highscoreList.appendChild(highscoreItem);
  }
}