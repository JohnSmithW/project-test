'use strict';
import './styles.css';
import { QuestionLibrary } from './js/questionLibrary.mjs';
import { Test } from './js/test.mjs';
import { Progress } from './js/progress.mjs';
const _ = require('lodash'); // jshint ignore:line
var answerTemplate = require('./templates/answerTemplate.html'); // jshint ignore:line
var titleTemplate = require('./templates/titleTemplate.html');
var resultsHeaderTemplate = require('./templates/resultsHeaderTemplate.html');
var resultsContentTemplate = require('./templates/resultsContentTemplate.html');


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





function generateTaskUI(testName) {
  if (testName.currentQuestion < 10) {
    var titleHTML = titleTemplate({
      'title': titleList[testName.currentQuestion],
      'question': testName.questions[testName.currentQuestion].question
    });
    taskSelector.innerHTML = titleHTML;
    answer[0].innerHTML = answerTemplate({ 'answer': testName.answers()[0] });
    answer[1].innerHTML = answerTemplate({ 'answer': testName.answers()[1] });
    answer[2].innerHTML = answerTemplate({ 'answer': testName.answers()[2] });
    answer[3].innerHTML = answerTemplate({ 'answer': testName.answers()[3] });
  }

}

class TotalScore extends HTMLElement {
  connectedCallback() {
    var heading = '';
    if (test.results.length >= 8) {
      heading = resultsHeaderTemplate({
        'spotlight': 'answer-container_right',
        'score': test.results.length,
        'index': test.questions.length
      });
    } else if (test.results.length > 4 && test.results.length < 8) {
      heading = resultsHeaderTemplate({
        'spotlight': 'answer-container_medium',
        'score': test.results.length,
        'index': test.questions.length
      });
    } else if (test.results.length <= 4) {
      heading = resultsHeaderTemplate({
        'spotlight': 'answer-container_wrong',
        'score': test.results.length,
        'index': test.questions.length
      });
    }
    var total = '';
    for (var i = 0; i < 10; i++) {
      total += resultsContentTemplate({
        'index': i + 1,
        'word': test.questions[i].question,
        'doit': test.chosenWords[i].state,
        'chosenWord': test.chosenWords[i].answer
      });
    }
    this.innerHTML =
      '<div class="total">' +
      heading +
      total + ' <div class="button-container button-container_restart">' +
      '<button type="button" class="button button_restart"><span class="button-text">Restart test</span></button>' +
      '</div>' +
      '</div>';
  }
}

function restartTest() {
  var restartButton = document.querySelector('.button-container_restart');
  restartButton.addEventListener('click', function() {
    window.location.reload();
  });
}


window.customElements.define('total-score', TotalScore);


function showResults(testName) {
  if (testName.currentQuestion >= 10) {
    container.classList.add('main__hidden');
    var resultBox = document.createElement('div');
    resultBox.className = 'start-test-container_results';
    resultBox.innerHTML = '<total-score class="total-score"></total-score>';
    content.appendChild(resultBox);
    restartTest();
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
          test.chosenWords.push({
            answer: answer[i].innerText,
            state: 'answer-container_right'
          });
          userWrong = true;
        } else if (autoShow) {
          test.chosenWords.push({
            answer: 'time out!',
            state: 'answer-container_wrong'
          });
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
    test.chosenWords.push({
      answer: answer[e].innerText,
      state: 'answer-container_wrong'
    });
  }
}


function answerCheckLauncher() {
  for (var i = 0; i < answer.length; i++) {
    answer[i].addEventListener('click', (function(i) { // jshint ignore:line
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