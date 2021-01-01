var divContainer = document.querySelector(".wrapper");
var startButton = document.querySelector(".button-start");
var timeContainer = document.querySelector(".timer-container");
var userInfo = document.querySelector("#userInfo");
var formSubmit = document.querySelector("#form-submit");
var scoreDiv = document.getElementById("score-container");
var btnRestart = document.querySelector(".btn-back");
var btnClear = document.querySelector(".btn-clear");
var btnHighScore = document.querySelector(".btn-score");
var timerSpan = document.getElementById("time");
var checkeAnswer = document.querySelector(".answer-checked");

var questionIndex = 0;
var startTime = 60;
var score = 0;
var timerFlag = false;
//setting the time starting  from 60 to 0 interval
function displayTimer() {
  var timer = setInterval(function () {
    if (!timerFlag) {
      if (startTime >= 0) {
        timerSpan.innerHTML = startTime;
        startTime--;
      } else {
        clearDiv();
        displayScore();
        clearInterval(timer);
      }
    }
  }, 1000);
}
//a function which used to start the game when we click the start button
function startTheQuiz() {
  displayQuestionAnswer(questionIndex);
  displayTimer();
}

function clearDiv() {
  divContainer.textContent = "";
  divContainer.append(timeContainer);
}

//a function which display all the questions and choices from the array
function displayQuestionAnswer(index) {
  clearDiv();
  if (questionArray.length === index) {
    displayScore();
    return;
  }
  var wrapperList = document.createElement("div");
  divContainer.append(wrapperList);
  wrapperList.className = "wrapper-list";
  var questions = document.createElement("p");
  questions.className = "question-text";
  questions.textContent = questionArray[index].question;
  wrapperList.append(questions);

  var questionList = document.createElement("ol");
  questionList.className = "listItems";
  var choices = questionArray[index].choice;
  for (var i = 0; i < choices.length; i++) {
    var li = document.createElement("li");
    li.textContent = choices[i];
    li.className = "list";
    questionList.append(li);
    wrapperList.append(questionList);
    //handles the event when we click on the choices
    var listClickHandler = document.querySelector(".listItems");
    listClickHandler.addEventListener("click", answerHandler);
  }
}

//a function which checks if the user answer and the answer of the question matches
function answerHandler(event) {
  setTimeout(function () {
    var userAnswer = event.target.innerHTML;
    var correctAnswer = questionArray[questionIndex].answer;
    if (correctAnswer === userAnswer) {
      checkeAnswer.setAttribute("style", "display:block");
      checkeAnswer.innerHTML = "correct!";
      document.body.append(checkeAnswer);

      divContainer.textContent = "";
      questionIndex++;
      score += 5;
      displayQuestionAnswer(questionIndex);
    } else {
      checkeAnswer.setAttribute("style", "display:block");
      checkeAnswer.innerHTML = "wrong!";
      document.body.append(checkeAnswer);
      questionIndex++;
      startTime = startTime - 10;
      displayQuestionAnswer(questionIndex);
    }
  }, 500);
}
//storing the result in the storage
function saveUserInfo() {
  var userName = document.querySelector("input[name='userName']").value;
  var userScoreInfo = { userName: userName, score: score };
  var userScore = localStorage.getItem("score") || [];
  if (userScore.length > 0) {
    userScore = JSON.parse(userScore);
  }
  userScore.push(userScoreInfo);
  userScore = JSON.stringify(userScore);
  localStorage.setItem("score", userScore);
}
//save user score to local storage
function saveUserScore() {
  saveUserInfo();
  fetchHighScore();
}

//retrive the stored data from local storage
function fetchHighScore() {
  var highScore = localStorage.getItem("score");
  highScore = JSON.parse(highScore);
  clearDiv();
  divContainer.removeChild(timeContainer);
  scoreDiv.setAttribute("style", "display:block");
  divContainer.append(scoreDiv);
  var max = 0;
  var highScoreUser;

  for (var i = 0; i < highScore.length; i++) {
    var score = highScore[i].score;
    if (max < score) {
      max = score;
      highScoreUser = highScore[i];
    }
  }
  document.getElementById("scoreDisplay").innerHTML =
    "1. " + highScoreUser.userName + " - " + highScoreUser.score;
}
//display final score of the user
function displayScore() {
  timerFlag = true;
  userInfo.setAttribute("style", "display:block");
  divContainer.append(userInfo);
  document.querySelector(".score-span").innerHTML = score;
}
//restart the quiz
function restartTheQuiz() {
  window.location.assign("/");
}
//clear high score by making the paragraph content empty
function clearHighScore() {
  document.getElementById("scoreDisplay").innerHTML = "";
}

startButton.addEventListener("click", startTheQuiz);
btnRestart.addEventListener("click", restartTheQuiz);
formSubmit.addEventListener("submit", saveUserScore);
btnHighScore.addEventListener("click", fetchHighScore);
btnClear.addEventListener("click", clearHighScore);
