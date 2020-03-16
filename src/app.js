'use strict';
import './styles.css';
import { QuestionLibrary } from './js/questionLibrary.mjs';
import { Test } from './js/test.mjs';
import { Progress } from './js/progress.mjs';
// import { answerTemplate, answerTemplateFunction } from './templates/answerTemplate.mjs';
// import { titleTemplate, titleTemplateFunction } from './templates/titleTemplate.mjs';
const _ = require('lodash');


var taskSelector = document.querySelector('.task');
var answer = document.querySelectorAll('.answer-container');
var titleList = ['word 1', 'Word 2', 'Word 3', 'Word 4', 'Word 5', 'Word 6', 'Word 7', 'Word 8', 'Word 9', 'Word 10'];
var startTestButton = document.querySelector('.start-button');
var startTestContainer = document.querySelector('.start-test-container');
var container = document.querySelector('.main');
var content = document.querySelector('.container');


const library = new QuestionLibrary();
const questions = library.getRandomQuestions();
const test = new Test(questions);

var titleTemplate = '<h1 class="task-title"><%= title %> : </h1><span class="task-word"><%= question %></span>';
var titleTemplateFunction = _.template(titleTemplate);


var answerTemplate = '<div class ="answer"><%= answer%></div>';
var answerTemplateFunction = _.template(answerTemplate);

function generateTaskUI(testName) {
  if (testName.currentQuestion < 10) {
    var titleHTML = titleTemplateFunction({
      'title': titleList[testName.currentQuestion],
      'question': testName.questions[testName.currentQuestion].question
    });
    taskSelector.innerHTML = titleHTML;
    answer[0].innerHTML = answerTemplateFunction({ 'answer': testName.answers()[0] });
    answer[1].innerHTML = answerTemplateFunction({ 'answer': testName.answers()[1] });
    answer[2].innerHTML = answerTemplateFunction({ 'answer': testName.answers()[2] });
    answer[3].innerHTML = answerTemplateFunction({ 'answer': testName.answers()[3] });
  }
}


function showResults(testName) {
  if (testName.currentQuestion >= 10) {
    container.classList.add('main__hidden');
    taskSelector.innerHTML = '<h1 class="task-title">' + 'total' + ':' + '</h1>';
    var resultBox = document.createElement('div');
    resultBox.className = 'start-test-container';
    resultBox.innerHTML = '<span class="task-word">' + 'Right answers: ' + test.results.length + '</span>';
    content.appendChild(resultBox);
  }
}


var timeLock = false;
var countDown;
var timeConverter = 0;



const progress = new Progress({
  progressElement: document.querySelector('.progress-bar')
});


var checked = false;
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
    timeLock = true;
  }
}

function showWrongAnswer(e) {
  if (checked === false && answer[e].innerText !== test.answer()) {
    answer[e].classList.add('answer-container_wrong');
    userWrong = true;
  }
}

function answerCheckLauncher() {
  for (var i = 0; i < answer.length; i++) {
    answer[i].addEventListener('click', (function(i) {
      return function() {
        showWrongAnswer(i);
        showRightAnswer(false);
      };
    })(i));
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


function timeOut(time) {
  time = 10;
  timeLock = false;
  countDown = setInterval(() => {
    timeConverter += 5;
    if (timeLock === false) {
      var timer = document.querySelector('.timer');
      if (timeConverter >= 1000) {
        timer.innerHTML = time;
        time -= 1;
        timeConverter = 0;
        if (time < 0) {
          clearInterval(countDown);
          timer.innerHTML = 'time out !';
          showRightAnswer(true);
        }
      }
    } else {
      clearInterval(countDown);
    }
  }, 1);

}


function updateUi(testName) {
  testName.next();
  generateTaskUI(testName);
  showResults(test);
  answerCheckLauncher();
}


function startTest() {
  generateTaskUI(test);
  answerCheckLauncher();
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
    clearInterval(countDown);
    timeOut();
    progress.run();
    updateUi(test);
    pass = false;
  }
});