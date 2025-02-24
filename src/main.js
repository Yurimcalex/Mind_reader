import './styles/index.css';
import Game from './js/Game.js';


const game = new Game();

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
  }
}

next.onclick = function () {
  if (startPressed && !nextPressed) {
    game.start();
    nextPressed = true;
  }
};

btns.onclick = function (e) {
  const btnType = e.target.getAttribute('class');  
  if (nextPressed && counter < 3) {
    counter += 1;
    game.next(btnType);
  }
};