import './styles/index.css';
import Game from './js/Game.js';
import View from './js/View.js';

const view = new View();
const game = new Game(view);

const start = document.getElementById('start'),
      next = document.getElementById('next'),
      btns = document.getElementById('sel');

let startPressed = false,
    nextPressed = false,
    counter = 0;


start.onclick = function () {
  if (!startPressed) {
    game.init();
    startPressed = true;
    view.showMessage('Remember a card and press NEXT.');
  }
}

next.onclick = function () {
  if (startPressed && !nextPressed) {
    game.start();
    nextPressed = true;
    view.showMessage('Press NEXT, CENTER, RIGHT depending on in which pile your card is.');
  }
};

btns.onclick = function (e) {
  const btnType = e.target.getAttribute('class');  
  if (nextPressed && counter < 3) {
    counter += 1;
    game.next(btnType);
    if (counter === 3) view.showMessage('Is this your card?');
  }
};