'use strict';

function Test(questions) {
  this.questions = questions;
  this.currentQuestion = 0;
  this.results = [];
  this.chosenWords = [];
  this.next = function() {
    if (this.currentQuestion < 9) {
      this.currentQuestion++;
    }
  };
  this.answer = function(questionId, answer) {
    if (this.currentQuestion < 9) {
      questionId = this.currentQuestion;
      answer = this.questions[questionId].correct;
      return (answer);
    } else {
      return false;
    }
  };
  this.answers = function(questionId, answers) {
    if (this.currentQuestion < 9) {
      questionId = this.currentQuestion;
      answers = this.questions[questionId].answers;
      return (answers);
    } else {
      return false;
    }
  };
}

module.exports = Test;