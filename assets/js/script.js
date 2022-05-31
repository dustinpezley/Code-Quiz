// Question/answer array
var questions = [
  {
    ask: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    ask: "The condition in an if/else statetment is enclosed within _____.",
    choices: ["quotes", "curly brackets", "parantheses", "square brackets"],
    answer: "parantheses"
  },
  {
    ask: "Arrays in JavaScript can be used to store _____.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"
  },
  {
    ask: "String values must be enclosed within _____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parantheses"],
    answer: "quotes"
  },
  {
    ask: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    answer: "console.log"
  }
];

//Declared variables/page elements
//Start page elements
var startEl = document.querySelector("#start");
var startButtonEl = document.querySelector("#start-quiz");

//Quiz page elements
var quizEl = document.querySelector("#quiz-page");
var questionEl = document.querySelector("#question");
var answerEl = document.querySelector("#answer");

//Input score elements
var finalScoreEl = document.querySelector("#final-score");
var userScoreEl = document.querySelector("#score");
var initialsEl = document.querySelector("#initials");
var submitScoreEl = document.querySelector("#submit-score");



