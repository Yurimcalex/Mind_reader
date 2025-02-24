export default class CardDeck {
	constructor() {
		this.ranks = ['6', '7', '8', '9', '10', 'В', 'Д', 'К', 'Т'];
		this.suits = ['c', 'd', 's', 'h'];
		this.deck = [];
		this.create();
	}

	create() {
		for (let i = 0; i < this.ranks.length; i += 1) {
			for (let j = 0; j < this.suits.length; j += 1) {
				const card = new Card(this.ranks[i], this.suits[j]);
				this.deck.push(card);
			}
		}
	}

	// select a random set of 21 cards
	select21() {
		const result = [];
		while (true) {
			const n = randomNumber(0, 35);
			if (result.indexOf(n) === -1) {
				result.push(n);
			}
			if (result.length === 21) break;
		}
		return result.map(n => this.deck[n]);
	}

	// lay out the cards into three piles
	layOut3(set) {
		const pile1 = [], 
					pile2 = [],
					pile3 = [];
		let counter = 0;
		while (counter < set.length) {
			pile1.push(set[counter]);
			pile2.push(set[counter + 1]);
			pile3.push(set[counter + 2]);
			counter += 3;
		}
		return [pile1, pile2, pile3];
	}

	// shift piles of cards
	shiftPiles(set, method) {
		if (method === 'left') {
		  return [set[1], set[0], set[2]];
		} else if (method === 'center') {
		  return [set[0], set[1], set[2]];
		} else {
		  return [set[0], set[2], set[1]];
		}
	}
}


class Card {
	constructor(rank, suit) {
		this.rank = rank;
		this.suit = suit;
	}
}


function randomNumber(n, m) {
	return Math.floor(Math.random() * (m - 1) + n);
}