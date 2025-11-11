'use strict';

const displayMessage = function (newMessage) {
  document.querySelector('.message').textContent = newMessage;
};

let highscore = localStorage['highScoreCache'];
let highscoreElement = document.querySelector('.highscore');

if (highscore) {
  highscoreElement.textContent = highscore;
} else {
  highscoreElement.textContent = 0;
}

let score = 0;
let alreadyWin = false;

const correctNumber = Math.trunc(Math.random() * 20) + 1;

const checkNumber = function () {
  const guess = Number(document.querySelector('.guess').value);

  //Quebra se guess == undefined
  if (!guess) {
    displayMessage('Empty Field');
    return;
  }

  score++;
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = guess;

  if (highscore > score) {
    highscoreElement.textContent = score;
    localStorage['highScoreCache'] = highscoreElement.textContent;
  }

  document.querySelector('.guess').value = '';

  //Quebra se ganhar
  if (guess === correctNumber && !alreadyWin) {
    alreadyWin = true;
    displayMessage('Correct Number!!!');
    document.querySelector('body').style.backgroundColor = '#8ae28a';

    document.querySelector('.number').style.width = '30rem';
    return;
  }

  displayMessage(
    guess > correctNumber
      ? 'Guess a lower number...'
      : 'Guess a bigger number...'
  );
};

document.querySelector('.check').addEventListener('click', checkNumber);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    checkNumber();
  }
});

document.querySelector('.again').addEventListener('click', function () {
  window.location.reload();
});
