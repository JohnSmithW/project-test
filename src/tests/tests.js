'use strict';

var Test = require('./classes/test.js');
var QuestionLibrary = require('./classes/questionLibrary.js');


var assert = require('assert');
/*Test check*/
describe('Test', function() {
  describe('Test - inners', function() {
    it('should receive questions from QuestionLibrary', function() {
      const library = new QuestionLibrary();
      const questions = library.getRandomQuestions();
      const test = new Test(questions);
      assert.equal(test.questions, questions);
    });

    it('should return index of the current question', function() {
      const library = new QuestionLibrary();
      const questions = library.getRandomQuestions();
      const test = new Test(questions);
      assert.equal(test.currentQuestion, 0);
    });

    it('should return the array of results', function() {
      const library = new QuestionLibrary();
      const questions = library.getRandomQuestions();
      const test = new Test(questions);
      assert.deepEqual(test.results, []);
    });

    it('should return the array of chosen words', function() {
      const library = new QuestionLibrary();
      const questions = library.getRandomQuestions();
      const test = new Test(questions);
      assert.deepEqual(test.chosenWords, []);
    });
  });

  describe('Test - next()', function() {
    it('should increment the currentQuestion', function() {
      const library = new QuestionLibrary();
      const questions = library.getRandomQuestions();
      const test = new Test(questions);
      test.next();
      assert.deepEqual(test.currentQuestion, 1);
    });

    it('should not increment the currentQuestion if its value is greater than 9', function() {
      const library = new QuestionLibrary();
      const questions = library.getRandomQuestions();
      const test = new Test(questions);
      test.currentQuestion = 9;
      test.next();
      assert.deepEqual(test.currentQuestion, 9);
    });
  });

  describe('Test - answer()', function() {
    it('should return the right answer', function() {
      const library = new QuestionLibrary();
      const questions = library.getRandomQuestions();
      const test = new Test(questions);
      assert.equal(test.answer(), test.questions[test.currentQuestion].correct);
    });

    it('should return false if currentQuestion is greater than 9', function() {
      const library = new QuestionLibrary();
      const questions = library.getRandomQuestions();
      const test = new Test(questions);
      test.currentQuestion = 10;
      assert.equal(test.answer(), false);
    });
  });

  describe('Test - answers()', function() {
    it('should return four answers', function() {
      const library = new QuestionLibrary();
      const questions = library.getRandomQuestions();
      const test = new Test(questions);
      assert.equal(test.answers(), test.questions[test.currentQuestion].answers);
    });

    it('should return false if currentQuestion is greater than 9', function() {
      const library = new QuestionLibrary();
      const questions = library.getRandomQuestions();
      const test = new Test(questions);
      test.currentQuestion = 10;
      assert.equal(test.answers(), false);
    });
  });
});

/*questionLibrary*/
describe('questionLibrary', function() {
  describe('questions', function() {
    it('should contain array of ten objects', function() {
      const library = new QuestionLibrary();
      assert.equal(library.questions.length, 10);
      assert.deepEqual(library.questions[0], { id: 1, question: 'a dog', answers: ['собака', 'кошка', 'спутник', 'машина'], correct: 'собака' }); //jshint ignore:line
    });
  });

  describe('questionLibrary - gerRandomQuestions()', function() {
    it('should return shuffled array of ten questions', function() {
      const library = new QuestionLibrary();
      assert.deepEqual(library.getRandomQuestions().length, 10);
    });
  });
});