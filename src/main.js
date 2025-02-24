import './styles/index.css';
import View from './js/View.js';
import CardDeck from './js/CardDeck.js';

const deck = new CardDeck();
const view = new View();


let cards = [], piles = [];
const start = document.getElementById('start'),
      next = document.getElementById('next'),
      btns = document.getElementById('sel');

let startPressed = false,
    nextPressed = false,
    counter = 0;


start.onclick = function () {
  if (!startPressed) {
    view.reset();
    cards = deck.select21();
    view.displayCards(cards);
  }
  startPressed = true;
}

next.onclick = function () {
  if (startPressed && !nextPressed) {
    view.reset();
    piles = deck.layOut3(cards);
    view.displayCardsInPiles(piles, 0);
  }
  nextPressed = true;
};

btns.onclick = function (e) {
  const btnType = e.target.getAttribute('class');  
  if (nextPressed && counter < 3) {
    view.reset();
    piles = deck.shiftPiles(piles, btnType);
    cards = piles[0].concat(piles[1]).concat(piles[2]);
    piles = deck.layOut3(cards);
    view.displayCardsInPiles(piles, counter);
    counter += 1;
  }
};