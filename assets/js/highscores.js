var backEl = $("#back");
var clearScoresEl = $("clear-scores");
var highScoresEl = $(".high-scores");

function showHighScores() {
  //Clear everything to start clean
  highScoresEl.innerHTML = '';
  
  //Get high scores from localStorage
  var scoreStorage = localStorage.getItem("scores");
  if(!scoreStorage) {
    return false;
  }
  scoreStorage = JSON.parse(scoreStorage);
  scoreStorage.sort((a,b) => (a.score < b.score) ? 1:-1);

  for(var i =0;i<scoreStorage.length;i++) {
    $("<div")
      .addClass("row text-small score-rank")
      .val((i+1),". ",scoreStorage.username," - ",scoreStorage.score);
  }
}