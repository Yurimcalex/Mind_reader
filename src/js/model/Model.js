import CardDeck from './CardDeck.js';


export default class Model {
	constructor() {
		this.deck = new CardDeck();
		this.cards = [];
		this.piles = [];
	}

	takeCards() {
		this.cards = this.deck.select21();
	}

	putCardsInOnePile() {
		this.cards = this.piles[0].concat(this.piles[1]).concat(this.piles[2]);
	}

	spreadСardsIntoPiles() {
		this.piles = this.deck.layOut3(this.cards);
	}

	shiftPiles(shiftType) {
		this.piles = this.deck.shiftPiles(this.piles, shiftType);
	}
}