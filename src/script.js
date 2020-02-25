'use strict';


var taskSelector = document.querySelector('.task');
var answer = document.querySelectorAll('.answer-container');
var stopAfunction = 0;
var titleList = ['word 1', 'Word 2', 'Word 3', 'Word 4', 'Word 5', 'Word 6', 'Word 7', 'Word 8', 'Word 9', 'Word 10'];
var testPosition = 1;
var startTestButton = document.querySelector('.start-button');
var startTestContainer = document.querySelector('.start-test-container');
var container = document.querySelector('.main');
var content = document.querySelector('.container');
var numberOftask = 0;
var start = 0;

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
  this.status = false;
  this.rightAnswersSum = 0;
  this.numberOftask = 0;
  this.answersBox = [];
  this.run = function() {
    this.status = true;
  };
  this.answer = function(questionId, answer) {
    if (this.status === true) {
      this.questions[questionId].answer = answer;
    }
  };
  this.getRandomAnswer = function() {
    if (this.status === true) {
      var random1;
      var random2;
      var random3;
      var random4;
      var numbers = [];
      while (numbers.length < 4) {
        var randomNumber = Math.floor(Math.random() * 4);
        if (numbers.indexOf(randomNumber) === -1) {
          numbers.push(randomNumber);
        }
      }
      window.random1 = numbers[0];
      window.random2 = numbers[1];
      window.random3 = numbers[2];
      window.random4 = numbers[3];
    }
  };
  this.generateTask = function() {
    this.getRandomAnswer();

    this.answersBox = [];
    this.answersBox.push(library.questions[this.numberOftask].answers[random1]);
    this.answersBox.push(library.questions[this.numberOftask].answers[random2]);
    this.answersBox.push(library.questions[this.numberOftask].answers[random3]);
    this.answersBox.push(library.questions[this.numberOftask].answers[random4]);
    this.numberOftask++;
  }
}

const questions = library.getRandomQuestions();
const test = new Test(questions);


function generateTaskUI(title, index) {
  if (testPosition < 10) {
    test.generateTask();
    taskSelector.innerHTML = '<h1 class="task-title">' + titleList[title] + ':' + '</h1><span class="task-word">' + library.questions[index].question + '</span>';
    answer[0].innerHTML = '<div class ="answer">' + test.answersBox[0] + '</div>';
    answer[1].innerHTML = '<div class ="answer">' + test.answersBox[1] + '</div>';
    answer[2].innerHTML = '<div class ="answer">' + test.answersBox[2] + '</div>';
    answer[3].innerHTML = '<div class ="answer">' + test.answersBox[3] + '</div>';
  }
  if (testPosition >= 10) {
    container.classList.add('main__hidden');
    taskSelector.innerHTML = '<h1 class="task-title">' + 'total' + ':' + '</h1>';
    var resultBox = document.createElement('div');
    resultBox.className = 'start-test-container';
    resultBox.innerHTML = '<span class="task-word">' + 'Right answers: ' + test.rightAnswersSum + '</span>';
    content.appendChild(resultBox);
  }
}


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
  if (testPosition <= 10) {
    for (var i = 0; i < answer.length; i++) {
      if (answer[i].innerText === library.questions[numberOftask].correct) {
        answer[i].classList.add('answer-container_right');
        checked = true;
        timeLock = true;
        if (!autoShow && userWrong === false) {
          test.rightAnswersSum++;
          userWrong = true;
        }
      }
    }
    pass = true;
  }
}

function showWrongAnswer(e) {
  if (checked === false && answer[e].innerText !== library.questions[numberOftask].correct) {
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

function updateUi() {
  generateTaskUI(numberOftask, numberOftask);
  test.getRandomAnswer();
  isAnswerRight();
}


function startTest(testName) {
  testName.run();
  updateUi();
  timeOut();
  startTestContainer.classList.add('start-test-container__hidden');
  container.classList.remove('main__hidden');
}
startTestButton.addEventListener('click', function() {
  startTest(test);
});


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
        stopAfunction = 1;
      }
    } else {
      clearInterval(countDown);
      timer.innerHTML = time + 1;
    }
  }, 1000);

}


var button = document.querySelector('.button');


button.addEventListener('click', function() {
  if (pass === true) {
    cleanAnswers();
    numberOftask += 1;
    timeLock = false;
    timeOut();
    progress();
    updateUi();
    testPosition += 1;
    pass = false;
  }
});

/*
  function progress(time) {
    var start = 0;
    var time = Math.round(time * 1000 / 100);
    var progressElement = document.querySelector('.progress-bar');
    var timer = setInterval(function() {
      if (start > 100) {
        clearInterval(timer);
      } else { progressElement.style.width = start + '%' }
      start++;
    }, time);
  }
*/