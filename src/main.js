import './styles/index.css';
import CardRenderer from './js/CardRenderer.js';
import CardDeck from './js/CardDeck.js';


const cardRenderer = new CardRenderer();
cardRenderer.draw(10, 10, 'h', 'T');


const deck = new CardDeck();
console.log(deck.select21());