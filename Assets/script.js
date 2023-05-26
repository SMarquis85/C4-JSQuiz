const questions = [
  {
    question: "Commonly used data types DO NOT include:", // Question
    choices: ["strings", "booleans", "alerts", "numbers"], // Possible choices
    answer: "alerts", // Correct answer
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

// DOM elements
const startPage = document.getElementById("start-page");
const quizPage = document.getElementById("quiz-page");
const endQuizPage = document.getElementById("end-quiz-page");
const highscorePage = document.getElementById("highscore-page");
const startButton = document.getElementById("start");
const startTimerElement = document.getElementById("start-timer"); // Updated ID
const quizTimerElement = document.getElementById("quiz-timer"); // Updated ID
const questionElement = document.getElementById("question");
const choicesContainer = document.getElementById("choices");
const feedbackElement = document.getElementById("feedback");
const finalScoreElement = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitScoreButton = document.getElementById("submit-score");
const goBackButton = document.getElementById("go-back");
const clearScoresButton = document.getElementById("clear-scores");
const viewHighscoresButton = document.getElementById("view-highscores"); // View Highscore button

// Variables
let currentQuestionIndex; // Current question index
let timeLeft; // Time left for the quiz
let timerInterval; // Timer interval
let highscores = []; // Array to store highscores

// Event listeners
viewHighscoresButton.addEventListener("click", showHighscorePage);
startButton.addEventListener("click", startQuiz);
submitScoreButton.addEventListener("click", submitHighscore);
goBackButton.addEventListener("click", goBack);
clearScoresButton.addEventListener("click", clearScores);

// Function to show the highscore page
function showHighscorePage() {
  startPage.style.display = "none";
  highscorePage.style.display = "block";
  displayHighscores();
}

// Function to start the quiz
function startQuiz() {
  startPage.style.display = "none";
  quizPage.style.display = "block";

  currentQuestionIndex = 0;
  timeLeft = 60;
  startTimerElement.textContent = "Time: " + timeLeft + " seconds"; // Updated variable name

  initializeTimer();
  timerInterval = setInterval(updateTimer, 1000);
  displayQuestion();
}

// Function to initialize the timer
function initializeTimer() {
  timeLeft = 60;
  startTimerElement.textContent = "Time: " + timeLeft + " seconds"; // Updated variable name
}

// Function to update the timer
function updateTimer() {
  timeLeft--;
  if (startPage.style.display === "block") {
    startTimerElement.textContent = "Time: " + timeLeft + " seconds"; // Updated variable name
  } else if (quizPage.style.display === "block") {
    quizTimerElement.textContent = "Time: " + timeLeft + " seconds"; // Updated variable name
  }

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    endQuiz();
  }
}

// Function to display a question
function displayQuestion() {
  const question = questions[currentQuestionIndex];
  questionElement.textContent = question.question;
  choicesContainer.innerHTML = "";

  for (let i = 0; i < question.choices.length; i++) {
    const choice = question.choices[i];
    const choiceButton = document.createElement("button");
    choiceButton.textContent = choice;
    choiceButton.addEventListener("click", handleChoiceClick);
    choicesContainer.appendChild(choiceButton);
  }
}

// Function to handle the choice click event
function handleChoiceClick(event) {
  const selectedChoice = event.target;
  const question = questions[currentQuestionIndex];

  if (selectedChoice.textContent === question.answer) {
    feedbackElement.textContent = "Correct!";
  } else {
    feedbackElement.textContent = "Wrong!";
    timeLeft -= 10;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
  }

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    clearInterval(timerInterval);
    endQuiz();
  } else {
    displayQuestion();
  }
}

// Function to end the quiz
function endQuiz() {
  quizPage.style.display = "none";
  endQuizPage.style.display = "block";
  finalScoreElement.textContent = timeLeft;
}

// Function to submit highscore
function submitHighscore(event) {
  event.preventDefault();
  const initials = initialsInput.value.trim();

  if (initials !== "") {
    const highscore = {
      initials: initials,
      score: timeLeft,
    };

    highscores.push(highscore);
    highscores.sort((a, b) => b.score - a.score);

    initialsInput.value = "";

    endQuizPage.style.display = "none";
    highscorePage.style.display = "block";
    displayHighscores();
  }
}

// Function to go back to the start page
function goBack() {
  highscorePage.style.display = "none";
  startPage.style.display = "block";
}

// Function to clear the highscores
function clearScores() {
  highscores = [];
  displayHighscores();
}

// Function to display the highscores
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