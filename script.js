const startButton = document.getElementById("Start");
const nextButton = document.getElementById("next");
const title = document.getElementById("1");
const words = document.getElementById("2");
const scoreBoard = document.getElementById("score");
const timer = document.getElementById("timer");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  title.classList.add("hide");
  words.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  scoreBoard.classList.remove("hide");
  timer.classList.remove("hide");
  setNextQuestion();
  timerFunction();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}
var score = 0;
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
    score += 5;
    scoreBoard.textContent = "Score:" + score;
    initSecond == 0;
    timer.textContent = "Timer" + initSecond;
  } else {
    element.classList.add("wrong");
    score -= 0;
    scoreBoard.textContent = "Score:" + score;
    initSecond -= 2.5;
    timer.textContent = "Timer:" + initSecond;
  }
}
// function setStatusClass1(element, wrong) {
//   clearStatusClass(element);
//   if (wrong) {
//     element.classList.add("wrong");

//     initSecond -= 5;
//     timer.textContent = "Timer" + initSecond;
//   }
// } else {
//   element.classList.add("wrong");
//   score -= 0;
//   scoreBoard.textContent = "Score:" + score;
//   initSecond -= 2.5;
//   timer.textContent = "Timer:" + initSecond;
// }
// }

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

var initSecond = 100;
var questionCount = 0;
var timerDone = false;

function timerFunction() {
  var initTime = setInterval(startTime, 1000);
  function startTime() {
    if (initSecond > 0) {
      initSecond--;
      return (timer.innerHTML = "Timer:" + initSecond);
    } else if (
      initSecond <= 0 &&
      questionCount < questions.length &&
      timerDone === false
    ) {
      timer.innerHTML = "Time is up";
      timerDone = true;
      return setTimeout(endGame, 1000);
    }
  }
}

function endGame() {}

const questions = [
  {
    question: "Inside which HTML element do we put our JavaScript?",
    answers: [
      { text: "scripting", correct: false },
      { text: "script", correct: true },
      { text: "Javascript", correct: false },
      { text: "js", correct: false },
    ],
  },
  {
    question:
      "What is the correct JavaScript syntax to change the content of a <p> html element with the id 'demo'?",
    answers: [
      { text: "#demo.innerHTML = Hello World!", correct: false },
      {
        text: "document.getElementByName(p).innerHTML = Hello World!",
        correct: false,
      },
      {
        text: "document.getElement(p).innerHTML = Hello World!;",
        correct: false,
      },
      {
        text: "document.getElementById(demo).innerHTML = Hello World!;",
        correct: true,
      },
    ],
  },
  {
    question: "What is the correct syntax for referring to an external script?",
    answers: [
      { text: 'script href="script.js"', correct: false },
      { text: 'script "src=script.js"', correct: true },
      { text: 'script id="script.js"', correct: false },
      { text: 'script name="script.js"', correct: false },
    ],
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    answers: [
      { text: 'msgBox("Hello World");', correct: false },
      { text: 'alertBox("Hello World")', correct: false },
      { text: 'msg("Hello World")', correct: false },
      { text: 'alert("Hello World")', correct: true },
    ],
  },
  {
    question: "How do you write an IF statement in Javascript?",
    answers: [
      { text: "if i is greater than 5", correct: false },
      { text: "if i then 5", correct: false },
      { text: "if (i > 5)", correct: true },
      { text: "if 5 then", correct: false },
    ],
  },
  {
    question: "How does a FOR loop start?",
    answers: [
      { text: "for i = 1 to 5", correct: false },
      { text: "for (i <==5; i++)", correct: false },
      { text: "for (i = 0; i <=5)", correct: false },
      { text: "for (i = 0; i <=5; i++)", correct: true },
    ],
  },
  {
    question: "How do you add a comment in JavaScript?",
    answers: [
      { text: "This is a comment", correct: false },
      { text: "++ThisIsaComment", correct: false },
      { text: "ThIsIsaCoMmEnT", correct: false },
      { text: "//This is a comment", correct: true },
    ],
  },
  {
    question: "How do you round the number 7.25 to the nearest integer?",
    answers: [
      { text: "round(7.25)", correct: false },
      { text: "rnd(7.25)", correct: false },
      { text: "Math.rnd(7.25)", correct: false },
      { text: "Math.round(7.25)", correct: true },
    ],
  },
  {
    question: "How do you detect the client's browser name?",
    answers: [
      { text: "browser.name", correct: false },
      { text: "browserName", correct: false },
      { text: "client.navName", correct: false },
      { text: "navigator.appName", correct: true },
    ],
  },
  {
    question: "How do you create a function in Javascript?",
    answers: [
      { text: "function = myFunction()", correct: false },
      { text: "declare myFunction()", correct: false },
      { text: "function: myFunction()", correct: false },
      { text: "function myFunction()", correct: true },
    ],
  },
];
