//array of question lists
var questionArray = [
  {
    question:
      "Which of the following function of Array object joins all elements of an array into a string:____________",
    choice: ["concat()", "join()", "pop()", "push()"],
    answer: "join()",
  },
  {
    question: "How do you call a function named 'myFunction':____________",
    choice: [
      "call myFunction()",
      "function myfunction()",
      "myFunction()",
      "myfunction()",
    ],
    answer: "myFunction()",
  },
  {
    question:
      "How do you round the number 7.25, to the nearest integer:____________",
    choice: ["round(7.5)", "math.round(7.5)", "rnd(7.5)", "Math.round(7.5)"],
    answer: "Math.round(7.5)",
  },
  {
    question:
      "Which event occurs when the user clicks on an HTML element:____________",
    choice: ["onchange", "onclick", "onmouseover", "onmouseclick"],
    answer: "onclick",
  },
];

var divContainer = document.querySelector(".wrapper");
var startButton = document.querySelector(".button-start");
var timeContainer = document.querySelector(".timer-container");
var userInfo = document.querySelector("#userInfo");
var formSubmit = document.querySelector("#form-submit");
var scoreDiv = document.getElementById("score-container");
var btnRestart = document.querySelector(".btn-back");
var btnClear = document.querySelector(".btn-clear");
var btnHightScore = document.querySelector(".btn-score");
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

  var questionList = document.createElement("ul");
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
