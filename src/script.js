'use strict';


var taskSelector = document.querySelector('.task');
var answer = document.querySelectorAll('.answer-container');
var stopAfunction = 0;
var titleList = ['word 1', 'Word 2', 'Word 3', 'Word 4', 'Word 5', 'Word 6', 'Word 7', 'Word 8', 'Word 9', 'Word 10'];
var loopOut = 1;


function Task(question, answer) {
  this.question = question;
  this.answer = answer;

}

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
}
const Library = new QuestionLibrary();

const task1 = new Task('a dog', 'собака');
const task2 = new Task('a cat', 'кошка');
const task3 = new Task('to run', 'бегать');
const task4 = new Task('to swim', 'плавать');
const task5 = new Task('to jump', 'прыгать');
const task6 = new Task('to fly', 'летать');
const task7 = new Task('a monitor', 'монитор');
const task8 = new Task('clothes', 'одежда');
const task9 = new Task('a system', 'система');
const task10 = new Task('a project', 'проект');


function Test(tasks) {
  this.tasks = tasks;
  this.status = false;
}

const test1 = new Test([task1, task2, task3, task4, task5, task6, task7, task8, task9, task10]);


function getRandomAnswer() {
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


function generateTask(title, index) {
  if (loopOut < 10) {
    getRandomAnswer();
    taskSelector.innerHTML = '<h1 class="task-title">' + titleList[title] + ':' + '</h1><span class="task-word">' + Library.questions[index].question + '</span>';
    answer[0].innerHTML = '<div class ="answer">' + Library.questions[index].answers[random1] + '</div>';
    answer[1].innerHTML = '<div class ="answer">' + Library.questions[index].answers[random2] + '</div>';
    answer[2].innerHTML = '<div class ="answer">' + Library.questions[index].answers[random3] + '</div>';
    answer[3].innerHTML = '<div class ="answer">' + Library.questions[index].answers[random4] + '</div>';
  }
}


var numberOftask = 0;


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

function showRightAnswer() {
  for (var i = 0; i < answer.length; i++) {
    if (answer[i].innerText === Library.questions[numberOftask].correct) {
      answer[i].classList.add('answer-container_right');
      checked = true;
      timeLock = true;
    }
  }
}

function showWrongAnswer(e) {
  if (checked === false && answer[e].innerText !== Library.questions[numberOftask].correct) {
    answer[e].classList.add('answer-container_wrong');
  }
}


function cleanAnswers() {
  for (var i = 0; i < answer.length; i++) {
    answer[i].classList.remove('answer-container_right');
    answer[i].classList.remove('answer-container_wrong');
  }
  checked = false;
}

function isAnswerRight() {
  answer[0].addEventListener('click', function() {
    showWrongAnswer(0);
    showRightAnswer();
  });
  answer[1].addEventListener('click', function() {
    showWrongAnswer(1);
    showRightAnswer();
  });
  answer[2].addEventListener('click', function() {
    showWrongAnswer(2);
    showRightAnswer();
  });
  answer[3].addEventListener('click', function() {
    showWrongAnswer(3);
    showRightAnswer();
  });
}

function updateUi() {
  generateTask(numberOftask, numberOftask);
  getRandomAnswer();
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
        showRightAnswer();
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
  cleanAnswers();
  numberOftask += 1;
  timeLock = false;
  timeOut();
  progress();
  updateUi();
  loopOut += 1;
});
timeOut();
updateUi();





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