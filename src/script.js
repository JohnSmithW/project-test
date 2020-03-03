'use strict';


var taskSelector = document.querySelector('.task');
var answer = document.querySelectorAll('.answer-container');
var titleList = ['word 1', 'Word 2', 'Word 3', 'Word 4', 'Word 5', 'Word 6', 'Word 7', 'Word 8', 'Word 9', 'Word 10'];
var startTestButton = document.querySelector('.start-button');
var startTestContainer = document.querySelector('.start-test-container');
var container = document.querySelector('.main');
var content = document.querySelector('.container');

function QuestionLibrary() {
  this.questions = [
    { id: 1, question: 'a dog', answers: ['собака', 'кошка', 'спутник', 'машина'], correct: 'собака' },
    { id: 2, question: 'a cat', answers: ['вид', 'кошка', 'самолет', 'двигатель'], correct: 'кошка' },
    { id: 3, question: 'to run', answers: ['сказать', 'светофор', 'бегать', 'проект'], correct: 'бегать' },
    { id: 4, question: 'to swim', answers: ['кошка', 'плавать', 'бегать', 'помнить'], correct: 'плавать' },
    { id: 5, question: 'to jump', answers: ['лежать', 'ответить', 'прыгать', 'решать'], correct: 'прыгать' },
    { id: 6, question: 'to fly', answers: ['летать', 'одежда', 'прыгать', 'требовать'], correct: 'летать' },
    { id: 7, question: 'a monitor', answers: ['собака', 'монитор', 'жизнь', 'дом'], correct: 'монитор' },
    { id: 8, question: 'clothes', answers: ['день', 'процесс', 'качество', 'одежда'], correct: 'одежда' },
    { id: 9, question: 'a system', answers: ['государство', 'система', 'прыгать', 'роль'], correct: 'система' },
    { id: 10, question: 'a project', answers: ['идея', 'проект', 'номер', 'доллар'], correct: 'проект' }
  ];
  this.getRandomQuestions = function() {
    var readyList = [];
    var randomList = [];
    while (randomList.length < 10) {
      var number = Math.floor(Math.random() * 10);
      if (randomList.indexOf(number) === -1) {
        randomList.push(number);
      }
    }
    for (var i of randomList) {
      readyList.push(this.questions[i]);
    }
    return (readyList);
  };
}
const library = new QuestionLibrary();


function Test(questions) {
  this.questions = questions;
  this.currentQuestion = 0;
  this.results = [];
  this.next = function() {
    if (this.currentQuestion <= 9) {
      this.currentQuestion++;
    }
  };
  this.answer = function(questionId, answer) {
    questionId = this.currentQuestion;
    answer = this.questions[questionId].correct;
    return (answer);
  };
  this.answers = function(questionId, answers) {
    questionId = this.currentQuestion;
    answers = this.questions[questionId].answers;
    return (answers);
  };
}

const questions = library.getRandomQuestions();
const test = new Test(questions);


function generateTaskUI(testName) {
  if (testName.currentQuestion < 10) {
    taskSelector.innerHTML = '<h1 class="task-title">' + titleList[testName.currentQuestion] + ':' +
      '</h1><span class="task-word">' + testName.questions[testName.currentQuestion].question + '</span>';
    answer[0].innerHTML = '<div class ="answer">' + testName.answers()[0] + '</div>';
    answer[1].innerHTML = '<div class ="answer">' + testName.answers()[1] + '</div>';
    answer[2].innerHTML = '<div class ="answer">' + testName.answers()[2] + '</div>';
    answer[3].innerHTML = '<div class ="answer">' + testName.answers()[3] + '</div>';
  }
  if (testName.currentQuestion >= 10) {
    container.classList.add('main__hidden');
    taskSelector.innerHTML = '<h1 class="task-title">' + 'total' + ':' + '</h1>';
    var resultBox = document.createElement('div');
    resultBox.className = 'start-test-container';
    resultBox.innerHTML = '<span class="task-word">' + 'Right answers: ' + test.results.length + '</span>';
    content.appendChild(resultBox);
  }
}


var start = 0;

function progress() {
  start += 10;
  var progressElement = document.querySelector('.progress-bar');
  if (start > 100) {
    start = 100;
  } else { progressElement.style.width = start + '%'; }

}

var checked = false;
var timeLock = false;
var userWrong = false;
var pass = false;

function showRightAnswer(autoShow) {
  if (test.currentQuestion <= 9) {
    for (var i = 0; i < answer.length; i++) {
      if (answer[i].innerText === test.answer()) {
        answer[i].classList.add('answer-container_right');
        checked = true;
        timeLock = true;
        if (!autoShow && userWrong === false) {
          test.results.push(answer[i].innerText);
          userWrong = true;
        }
      }
    }
    pass = true;
  }
}

function showWrongAnswer(e) {
  if (checked === false && answer[e].innerText !== test.answer()) {
    answer[e].classList.add('answer-container_wrong');
    userWrong = true;
  }
}


function cleanAnswers() {
  for (var i = 0; i < answer.length; i++) {
    answer[i].classList.remove('answer-container_right');
    answer[i].classList.remove('answer-container_wrong');
  }
  checked = false;
  userWrong = false;
}

function isAnswerRight() {
  answer[0].addEventListener('click', function() {
    showWrongAnswer(0);
    showRightAnswer(false);
  });
  answer[1].addEventListener('click', function() {
    showWrongAnswer(1);
    showRightAnswer(false);
  });
  answer[2].addEventListener('click', function() {
    showWrongAnswer(2);
    showRightAnswer(false);
  });
  answer[3].addEventListener('click', function() {
    showWrongAnswer(3);
    showRightAnswer(false);
  });
}

function updateUi(testName) {
  testName.next();
  generateTaskUI(testName);
  isAnswerRight();
}

function timeOut(time) {
  time = 10;
  var countDown = setInterval(() => {
    var timer = document.querySelector('.timer');
    timer.innerHTML = time;
    time -= 1;
    if (timeLock === false) {
      if (time < 0) {
        clearInterval(countDown);
        timer.innerHTML = 'time out !';
        showRightAnswer(true);
      }
    } else {
      clearInterval(countDown);
    }
  }, 1000);
}


function startTest() {
  generateTaskUI(test);
  isAnswerRight();
  timeOut();
  startTestContainer.classList.add('start-test-container__hidden');
  container.classList.remove('main__hidden');
}
startTestButton.addEventListener('click', function() {
  startTest(test);
});




var button = document.querySelector('.button');


button.addEventListener('click', function() {
  if (pass === true) {
    cleanAnswers();
    timeLock = false;
    timeOut();
    progress();
    updateUi(test);
    pass = false;
  }
});