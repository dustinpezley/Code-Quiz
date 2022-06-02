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
var startEl = document.getElementById('start');
var startButtonEl = document.getElementById('start-quiz');

//Quiz page elements
var quizEl = document.getElementById("quiz-page");
var questionEl = document.getElementById("question");
var answerEl = document.getElementById("answer");
var answerEvalEl = document.getElementById("answer-eval");
var choicesEl = document.getElementById("choices");

//Input score elements
var finalScoreEl = document.getElementById("final-score");
var userScoreEl = document.getElementById("score");
var initialsEl = document.getElementById("initials");
var submitScoreEl = document.getElementById("submit-score");

//Universal elements
var viewHighScoreEL = document.getElementById("highscore");
var timerEl = document.getElementById("time");
var score = 0;
var highScores = [];
var timerStart = 75;
var timeElapsed = 0;
var interval;
var currentQuestion = 0;

console.log(questions[currentQuestion].choices);

//General functions to keep code cleaner
function hide(element) {
  element.style.display = "none";
}

function show(element) {
  element.style.display = "flex";
}

function reset() {
  score = 0;
  currentQuestion = 0;
  timeElapsed = 0;
  timerEl.textContent = 0;
}


//Functions for individual actions
//Timer
function startTimer() {
  timerEl.textContent = timerStart;
  interval = setInterval(function() {
    timeElapsed++;
    timerEl.textContent = timerStart - timeElapsed;
    if(timeElapsed > timerStart) {
      clearInterval(interval);
      hide(quizEl);
      show(finalScoreEl);
      timerEl.textContent = 0;
    }
  },1000);
}

function stopTimer() {
  clearInterval(interval);
}

//Questions
function displayQuestion() {
  hide(startEl);
  show(quizEl);
  questionEl.textContent=questions[currentQuestion].ask;
  var userChoices = questions[currentQuestion].choices;
  choicesEl.innerHTML=""
  userChoices.forEach(function (newItem) {
    var button = document.createElement("button");
    button.textContent = newItem;
    button.setAttribute("type","button");
    button.classList.add("btn");
    button.classList.add("text-left");
    choicesEl.appendChild(button);
    button.addEventListener("click",(checkAnswer));
  })
};

function nextQuestion() {
  currentQuestion++;
  answerEvalEl.textContent = ""
  if(currentQuestion < questions.length) {
    // setTimeout(displayQuestion(),3000);
    displayQuestion();
  } else {
    stopTimer();
      if((timerStart - timeElapsed)>0) {
        score += (timerStart - timeElapsed);
        userScoreEl.textContent = score;
      }
      hide(quizEl);
      show(finalScoreEl);
  }
};

//Answer selection
answerEl.addEventListener("click",function(event) {
  checkAnswer(event);
});

function checkAnswer(event) {
  if(event.target.matches("button") && event.target.textContent === questions[currentQuestion].answer) {
    score += 10;
    answerEvalEl.textContent = `Correct! The answer is: ${questions[currentQuestion].answer}.`;
  } else {
    timeElapsed += 10;
    answerEvalEl.textContent = `Wrong.... The correct answer is: ${questions[currentQuestion].answer}.`;
  }

  if (currentQuestion >= questions.length) {
    hide(quizEl);
    show(finalScoreEl);
    stopTimer();
  } else {
    setTimeout(nextQuestion,1500);
  }
};

//High scores
function showHighScores() {
  window.location.href = "./highscores.html";
}

// Start quiz button
startButtonEl.addEventListener("click",function() {
  hide(startEl);
  startTimer();
  displayQuestion();
  show(quizEl);
});

//Score submission
submitScoreEl.addEventListener("click",function() {
  var initials = initialsEl.value;
  if (!initials) {
    alert("Please enter your initials to continue!");
  } else {
    var scoreObject = {initials: initials, score: score};
    initials = "";

    var highScores = localStorage.getItem("highScores");
    if (!highScores) {
      highScores =[];
    } else {
      highScores = JSON.parse(highScores);
    }
    highScores.push(scoreObject);
    var newScoreSet = JSON.stringify(highScores);
    localStorage.setItem("highScores",newScoreSet);

    window.location.replace("./highscores.html");
  }
});