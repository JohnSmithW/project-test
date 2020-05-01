'use strict';

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

module.exports = QuestionLibrary;