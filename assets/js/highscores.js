var backEl = document.getElementById("back");
var clearScoresEl = document.getElementById("clear-scores");
var highScoresEl = document.getElementById("high-scores-list");

function showHighScores() {
  //Clear everything to start clean
  highScoresEl.innerHTML = '';
  
  //Get high scores from localStorage
  var highScores = localStorage.getItem("highScores");
  if(!highScores) {
    return false;
  }
  highScores = JSON.parse(highScores);
  highScores.sort((a,b) => (a.score < b.score) ? 1:-1);

  var rank = 1;
  for(var i =0;i<highScores.length;i++) {
    var div = document.createElement("div");
    div.textContent = `${rank}. ${highScores[i].initials}: ${highScores[i].score}`;
      div.classList.add("row");
      div.classList.add("text-small");
      div.classList.add("score-rank");
      highScoresEl.appendChild(div);
      rank++;
  } 
}

showHighScores();

//Event listeners
clearScoresEl.addEventListener("click",function(){
  localStorage.clear();
  location.reload();
});

backEl.addEventListener("click", function() {
  window.location.replace("./index.html");
});