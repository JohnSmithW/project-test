import './styles.css';

'use strict';

var rightAnswers = ['to run', 'to swim', 'to jump', 'to fly', 'a dog', 'a cat', 'monitor', 'clothes', 'system', 'project'];
var taskTitle = document.querySelector('.task-title');
var taskSelector = document.querySelector('.task');
var answer = document.querySelectorAll('.answer-container');
var stopAfunction = 0;
var titleList = ['word 1', 'Word 2', 'Word 3', 'Word 4', 'Word 5', 'Word 6', 'Word 7', 'Word 8', 'Word 9', 'Word 10'];
var randomAnswers = ['to go', 'sneak', 'puddle', 'ice', 'to shout', 'to start', 'a board', 'child', 'to accept', 'advice', 'attention', 'blood', 'to care'];
var questions = ['бегать', 'плавать', 'прыгать', 'летать', 'собака', 'кошка', 'монитор', 'одежда', 'система', 'проект'];

// function Tasks(question, answer) {
//   this.question = question;
//   this.answer = answer;
// }


// var task1 = new Tasks('бегать', 'to run');
// var task2 = new Tasks('плавать', 'to swim');
// var task3 = new Tasks('прыгать', 'to jump');
// var task4 = new Tasks('летать', 'to fly');
// var task5 = new Tasks('собака', 'a dog');
// var task6 = new Tasks('кошка', 'a cat');
// var task7 = new Tasks('монитор', 'monitor');
// var task8 = new Tasks('одежда', 'clothes');
// var task9 = new Tasks('система', 'system');
// var task10 = new Tasks('проект', 'project');

// var listOfTasks = [task2, task3, task4, task5, task6, task7, task8, task9, task10];




var rightAnswer;
var restAnswer1;
var restAnswer2;
var restAnswer3;

function getRandomAnswer() {
  var numbers = [];
  while (numbers.length < 4) {
    var randomNumber = Math.floor(Math.random() * 4);
    if (numbers.indexOf(randomNumber) === -1) {
      numbers.push(randomNumber);
    }
  }
  rightAnswer = numbers[0];
  restAnswer1 = numbers[1];
  restAnswer2 = numbers[2];
  restAnswer3 = numbers[3];
}

var randomIndex1;
var randomIndex2;
var randomIndex3;

function getRandomNumber() {
  var answersCount = randomAnswers.length;
  var numbers = [];
  while (numbers.length < 3) {
    var randomNumber = Math.floor(Math.random() * answersCount);
    if (numbers.indexOf(randomNumber) === -1) {
      numbers.push(randomNumber);
    }
  }
  randomIndex1 = numbers[0];
  randomIndex2 = numbers[1];
  randomIndex3 = numbers[2];
}





function generateTask(title, question, answerNumber) {
  if (loopOut < 10) {
    getRandomAnswer();
    getRandomNumber();
    taskSelector.innerHTML = '<h1 class="task-title">' + titleList[title] + ':' + '</h1><span class="task-word">' + questions[question] + '</span>';
    answer[rightAnswer].innerHTML = '<div class ="answer">' + rightAnswers[answerNumber] + '</div>';
    answer[restAnswer1].innerHTML = '<div class ="answer">' + randomAnswers[randomIndex1] + '</div>';
    answer[restAnswer2].innerHTML = '<div class ="answer">' + randomAnswers[randomIndex2] + '</div>';
    answer[restAnswer3].innerHTML = '<div class ="answer">' + randomAnswers[randomIndex3] + '</div>';
  }
}

var numberOftask = 0;

function updateUi() {
  generateTask(numberOftask, numberOftask, numberOftask);
  numberOftask += 1;
}
var start = 0;

function progress() {
  start += 10;
  var progressElement = document.querySelector('.progress-bar');
  if (start > 100) {
    start = 100;
  } else { progressElement.style.width = start + '%' }

}

var stopper = false;

function showRightAnswer() {
  stopper = true;
  answer[rightAnswer].classList.add('answer-container_right');

}

function showWrongAnswer(e) {
  if (stopper === false) {
    answer[e].classList.add('answer-container_wrong');
  }
}

function cleanAnswers() {
  for (var i = 0; i < answer.length; i++) {
    answer[i].classList.remove('answer-container_right');
    answer[i].classList.remove('answer-container_wrong');
  }
  stopper = false;
}

function isAnswerRight() {
  answer[rightAnswer].addEventListener('click', function() {
    showRightAnswer();
  });
  answer[restAnswer1].addEventListener('click', function() {
    showWrongAnswer(restAnswer1);
    showRightAnswer();
  });
  answer[restAnswer2].addEventListener('click', function() {
    showWrongAnswer(restAnswer2);
    showRightAnswer();
  });
  answer[restAnswer3].addEventListener('click', function() {
    showWrongAnswer(restAnswer3);
    showRightAnswer();
  });
}

function timeOut(time, lock) {
  lock = false;
  if (lock === false) {
    time = 10;
    var countDown = setInterval(() => {
      var timer = document.querySelector('.timer');
      timer.innerHTML = time;
      time -= 1;
      if (time < 0) {
        clearInterval(countDown);
        timer.innerHTML = 'time out !';
        showRightAnswer();
        stopAfunction = 1;
      }
    }, 1000);
    lock = true;
  }

}


var button = document.querySelector('.button');
var loopOut = 1;






button.addEventListener('click', function() {
  progress();
  updateUi();
  cleanAnswers();
  loopOut += 1;
});
timeOut();
updateUi();
isAnswerRight();




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