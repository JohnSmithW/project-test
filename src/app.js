'use strict';
import './styles.css';
import { QuestionLibrary } from './js/questionLibrary.mjs';
import { Test } from './js/test.mjs';
import { Progress } from './js/progress.mjs';
const _ = require('lodash'); // jshint ignore:line
var answerTemplate = require('./templates/answerTemplate.html'); // jshint ignore:line
var titleTemplate = require('./templates/titleTemplate.html');
var resultsHeaderTemplate = require('./templates/resultsHeaderTemplate.html'); // jshint ignore:line
var resultsContentTemplate = require('./templates/resultsContentTemplate.html'); // jshint ignore:line
var totalScoreTemplate = require('./templates/totalScoreTemplate.html'); // jshint ignore:line


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
    const titleHTML = titleTemplate({
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


function restartTest() {
  var restartButton = document.querySelector('.button-container_restart');
  restartButton.addEventListener('click', function() {
    window.location.reload();
  });
}


function showResults(testName) {
  var score = test.results.length;

  if (testName.currentQuestion >= 10) {
    var heading = '';
    if (score >= 8) {
      heading = resultsHeaderTemplate({
        'spotlight': 'answer-container_right',
        'score': test.results.length,
        'index': test.questions.length
      });
    } else if (score > 4 && score < 8) {
      heading = resultsHeaderTemplate({
        'spotlight': 'answer-container_medium',
        'score': test.results.length,
        'index': test.questions.length
      });
    } else if (score <= 4) {
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

    container.classList.add('main__hidden');
    var resultBox = document.createElement('div');
    resultBox.className = 'start-test-container_results';
    resultBox.innerHTML = totalScoreTemplate({
      'heading': heading,
      'total': total
    });
    content.appendChild(resultBox);
    restartTest();
  }
}

var state = {
  timeLock: false,
  countDown: 0,
  timeConverter: 0,
  checked: false,
  userWrong: false,
  pass: false
};




const progress = new Progress({
  progressElement: document.querySelector('.progress-bar')
});




function showRightAnswer(autoShow) {
  if (test.currentQuestion <= 9) {
    for (var i = 0; i < answer.length; i++) {
      if (answer[i].innerText === test.answer()) {
        answer[i].classList.add('answer-container_right');
        state.checked = true;
        state.timeLock = true;
        if (!autoShow && state.userWrong === false) {
          test.results.push(answer[i].innerText);
          test.chosenWords.push({
            answer: answer[i].innerText,
            state: 'answer-container_right'
          });
          state.userWrong = true;
        } else if (autoShow) {
          test.chosenWords.push({
            answer: 'time out!',
            state: 'answer-container_wrong'
          });
        }
      }
    }
    state.pass = true;
    state.timeLock = true;
  }
}

function showWrongAnswer(e) {
  if (state.checked === false && answer[e].innerText !== test.answer()) {
    answer[e].classList.add('answer-container_wrong');
    state.userWrong = true;
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
  state.checked = false;
  state.userWrong = false;
}


function timeOut(time) {
  time = 10;
  state.timeLock = false;
  state.countDown = setInterval(() => {
    state.timeConverter += 5;
    if (state.timeLock === false) {
      var timer = document.querySelector('.timer');
      if (state.timeConverter >= 1000) {
        timer.innerHTML = time;
        time -= 1;
        state.timeConverter = 0;
        if (time < 0) {
          clearInterval(state.countDown);
          timer.innerHTML = 'time out !';
          showRightAnswer(true);
        }
      }
    } else {
      clearInterval(state.countDown);
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
  if (state.pass === true) {
    cleanAnswers();
    clearInterval(state.countDown);
    timeOut();
    progress.run();
    updateUi(test);
    state.pass = false;
  }
});