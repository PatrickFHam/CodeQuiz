// These link the HTML elements to the script.
var scoreBoxEl = document.getElementById("scoresBox");
var hiScoreLineEl = document.getElementsByClassName("hiscoreline");
var hiScorer1El = document.getElementById("hiscorer1");
var hiScorer2El = document.getElementById("hiscorer2");
var hiScorer3El = document.getElementById("hiscorer3");
var hiScorer4El = document.getElementById("hiscorer4");
var hiScorer5El = document.getElementById("hiscorer5");

var initials1El = document.getElementById("initials1");
var initials2El = document.getElementById("initials2");
var initials3El = document.getElementById("initials3");
var initials4El = document.getElementById("initials4");
var initials5El = document.getElementById("initials5");

var score1El = document.getElementById("score1");
var score2El = document.getElementById("score2");
var score3El = document.getElementById("score3");
var score4El = document.getElementById("score4");
var score5El = document.getElementById("score5");

var seeHiScoresEl = document.getElementById("see-hiscores");
var resetBtnEl = document.getElementById("clear-hiscores");
var startResetBtnEl = document.getElementById("start-reset-btn");
var stopBtnEl = document.getElementById("stop-btn");

// These link to the Local Storage.
var mostRecentInitials = localStorage.getItem("lsMostRecentInitials");
var mostRecentScore = localStorage.getItem("lsMostRecentScore");

// This is the 'working' pair of initials and scores... parsed to an array here.
var storedHighScores = JSON.parse(localStorage.getItem("storedHighScores")) || [];

// Players initials are pulled from the Local Storage, pushed to a working object, sorted by score, reduced down to 5 entries, stringified and stored for later, and parsed to be used now.
function saveHighScore () {
  const score = {
    initials: mostRecentInitials,
    score: mostRecentScore
  };
  storedHighScores.push(score);
  storedHighScores.sort((a, b) => b.score - a.score);
  storedHighScores.splice(5);
  localStorage.setItem("storedHighScores", JSON.stringify(storedHighScores));
  storedHighScores = JSON.parse(localStorage.storedHighScores);
};

// This is to make sure the program doesn't freak out looking for things that don't exist.
function ensureNoBlankEntries () {
  if (storedHighScores[0] == null) {
    initials1El.textContent = ' ';
    score1El.textContent = ' '
  }
  if (storedHighScores[1] == null) {
    initials2El.textContent = ' ';
    score2El.textContent = ' '
  }
  if (storedHighScores[2] == null) {
    initials3El.textContent = ' ';
    score3El.textContent = ' '
  }
  if (storedHighScores[3] == null) {
    initials4El.textContent = ' ';
    score4El.textContent = ' '
  }
  if (storedHighScores[4] == null) {
    initials5El.textContent = ' ';
    score5El.textContent = ' '
  }
};

// Checks to see if it can pull values first, then 'prints' the new text to the hi-scorer lines.
function printAllInitialsAndScores () {
  if (storedHighScores[0] != null) {
    initials1El.textContent = storedHighScores[0].initials;
    score1El.textContent = storedHighScores[0].score;
  };
  if (storedHighScores[1] != null) {
    initials2El.textContent = storedHighScores[1].initials;
    score2El.textContent = storedHighScores[1].score;
  };
  if (storedHighScores[2] != null) {
    initials3El.textContent = storedHighScores[2].initials;
    score3El.textContent = storedHighScores[2].score;
  };
  if (storedHighScores[3] != null) {
    initials4El.textContent = storedHighScores[3].initials;
    score4El.textContent = storedHighScores[3].score;
  };
  if (storedHighScores[4] != null) {
    initials5El.textContent = storedHighScores[4].initials;
    score5El.textContent = storedHighScores[4].score;
  };
};

// Without this, the most recent score and initials would be added to the list, every time the page is reloaded.
function clearMostRecent () {
  localStorage.removeItem("lsMostRecentInitials");
  localStorage.removeItem("lsMostRecentScore");
}

// When the clear button is pressed, this re-assigns the text to empty.
function clearScorerLines () {
  initials1El.textContent = ' ';
  score1El.textContent = ' ';
  initials2El.textContent = ' ';
  score2El.textContent = ' ';
  initials3El.textContent = ' ';
  score3El.textContent = ' ';
  initials4El.textContent = ' ';
  score4El.textContent = ' ';
  initials5El.textContent = ' ';
  score5El.textContent = ' ';
}

// All the click events are listed here.
resetBtnEl.addEventListener("click", function resetHighScores() {
  localStorage.removeItem("storedHighScores");
  clearScorerLines();
});

function alreadyOnHighScoresPage () {
  window.alert("You're already on the leaderboard, silly!");
}

function cantStopHere () {
  window.alert("You can't end something you haven't begun. ;) ")
}

seeHiScoresEl.onclick = function() {
  alreadyOnHighScoresPage();
  console.log("already here!");
};

stopBtnEl.onclick = function() {
  cantStopHere();
  console.log("can't stop here, cuz you haven't started!")
}

startResetBtnEl.onclick = function () {
  window.location.assign("./quizrun.html");
}

// The main function's sequence is here.
function runHiscorePage () {
  ensureNoBlankEntries();
  saveHighScore();
  printAllInitialsAndScores();
  clearMostRecent();
}

// This runs upon page-load.
runHiscorePage();