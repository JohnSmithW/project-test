'use strics';

export function Test(questions) {
  this.questions = questions;
  this.currentQuestion = 0;
  this.results = [];
  this.chosenWords = [];
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