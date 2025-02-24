import CardDeck from './CardDeck.js';
import View from './View.js';


export default class Game {
	constructor(view) {
		this.view = view;
		this.deck = new CardDeck();
		this.cards = [];
		this.cardPiles = [];
		this.counter = 0;
	}

	setCards(piles) {
		piles ? this.cards = piles[0].concat(piles[1]).concat(piles[2])
					: this.cards = this.deck.select21();
	}

	init() {
		this.view.reset();
		this.setCards();
		this.view.displayCards(this.cards);
		this.counter = 0;
	}

	start() {
		this.view.reset();
		this.cardPiles = this.deck.layOut3(this.cards);
		this.view.displayCardsInPiles(this.cardPiles, this.counter);
	}

	next(pressedBtn) {
		this.view.reset();
		this.cardPiles = this.deck.shiftPiles(this.cardPiles, pressedBtn);
		this.setCards(this.cardPiles);
		this.cardPiles = this.deck.layOut3(this.cards);

		if (this.counter < 2) {
			this.view.displayCardsInPiles(this.cardPiles);
		} else {
			this.view.displayCard(this.cardPiles);
		}
		
		this.counter += 1;
	}
}