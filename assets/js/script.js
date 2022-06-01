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
var answerEvalEl = document.getElementById(".answer-eval");
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

console.log(questions[0].choices[0]);

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
    if(timeElapsed >= timerStart) {
      nextQuestion();
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
  // document.getElementById("option1").textContent = questions[currentQuestion].choices[0];
  // document.getElementById("option2").textContent = questions[currentQuestion].choices[1];
  // document.getElementById("option3").textContent = questions[currentQuestion].choices[2];
  // document.getElementById("option4").textContent = questions[currentQuestion].choices[3];
  // for(var i =0;i<choicesEl.children.length;i++) {
  //   choicesEl.children[i].children[0].textContent = `${i+1}. ${questions[currentQuestion].choices[i]}`; 
  // }
  // for (var i=0;i<questions.choices.length;i++) {
  //   choicesEl[i].textContent = (([i]+1),". ",choicesEl[i]);
  // }
  choicesEl.forEach(function(choices) {
    var choiceButtonEl = document.createElement("button");
    choiceButtonEl.textContent = choices;
    choiceButtonEl.addClass("btn text-left");
    choiceButtonEl.setAttribute("id",arr.indexOf(choices));
    choiceButtonEl.setAttribute("type", "button");
  })
};

function nextQuestion() {
  currentQuestion++;
  if(currentQuestion <= questions.length) {
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
}

function checkAnswer(answer) { 
  if (questions[currentQuestion].answer === answer) {
    answerEvalEl.textContent = "Correct!";
    score += 10;
    setTimeout(nextQuestion(),2000);
  } else {
    timeElapsed += 10;
    answerEvalEl.textContent = "Wrong...";
    setTimeout(nextQuestion(),2000);
  }
}

//High scores
function showHighScores() {
  window.location.href = "./highscores.html"
}

// Start quiz button
startButtonEl.addEventListener("click",function() {
  console.log(startEl);
  hide(startEl);
  startTimer();
  displayQuestion();
  show(quizEl);
});

//Answer selection
answerEl.addEventListener("click",function(event) {
  if(event.target.matches("button")) {
    checkAnswer(this);
    nextQuestion();
  }
});

//Score submission
submitScoreEl.addEventListener("click",function() {
  var initialSubmit = initialsEl.val
  if(initialSubmit) {
    var userScore = {username: initialSubmit, score: score};
    initialsEl.val = '';
    //check for other user scores in local storage    
    var scoreStorage = localStorage.getItem("scores");
    if(!scoreStorage) {
      return false;
    } else {
      highScores = JSON.parse(scoreStorage);
      highScores.push(userScore);
    }
    localStorage.setItem("scores",JSON.stringify(highScores));
    showHighScores();
    reset();
  }
})