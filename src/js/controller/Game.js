import Model from '../model/Model.js';
import View from '../view/View.js';


export default class Game {
	constructor() {
		this.model = new Model();
		this.view = new View();
		this.level = 0;
	}

	init() {
		this.view.reset();
		this.model.takeCards();
		this.view.displayCards(this.model.cards);
		this.view.showMessage('Remember a card and press NEXT.');
		this.level = 0;
	}

	start() {
		this.view.reset();
		this.model.spreadСardsIntoPiles();
		this.view.displayCardsInPiles(this.model.piles);
		this.view.showMessage('Press NEXT, CENTER, RIGHT depending on in which pile your card is.');
	}

	next(pressedBtn) {
		this.view.reset();
		this.model.shiftPiles(pressedBtn);
		this.model.putCardsInOnePile();
		this.model.spreadСardsIntoPiles();
		if (this.level < 2) {
			this.view.displayCardsInPiles(this.model.piles);
		} else {
			this.view.displayCard(this.model.piles);
			this.view.showMessage('Is this your card?');
		}
		this.level += 1;
	}
}