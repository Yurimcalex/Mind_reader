import CardRenderer from './CardRenderer.js';


export default class View {
	constructor() {
		this.canvas = document.getElementById('canv');
		this.ctx = this.canvas.getContext('2d');
		this.cardRenderer = new CardRenderer(this.ctx);
		this.message = document.getElementById('tips').children[0];
		this.reset();
		this.animationDone = true;
	}

	reset() {
		const wiewingArea = document.getElementById('vw'); 
		this.canvas.width = wiewingArea.offsetWidth;
		this.canvas.height = wiewingArea.offsetHeight;
	}

	displayCards(set) {
		let topShift = 0,  
				leftShift = 0,
				delay = 0,
				counter = 0;

		this.animationDone = false;
		
		for (let i = 0; i < set.length; i += 1) {
			const card = set[i];
			let x, y;
		 	if (i % 2 === 0) topShift += 5;
     	else topShift -= 5;
			if (i % 7 === 0 && i > 0) {
				topShift += 180;
				leftShift = 0;
			}    	

     	delay += 75;
     	x = 75 + 97 * leftShift; 
     	y = 15 + topShift;
     	leftShift += 1;
     	
     	setTimeout(() => {
     		counter += 1;
     		this.cardRenderer.draw(x, y, card.suit, card.rank);
     		if (counter === 21) this.animationDone = true;
     	}, delay);
		}
	}

	displayCardsInPiles(piles) {
		let counter = 0;
		this.animationDone = false;

		const calcXShift = function(n) {
		  let result = 0, d = 0;
		  if (n === 2 || n === 6) d = 10;
		  if (n === 3) d = -10;
		  if (n === 6) d = -5;
		  if (n % 2 === 0) result = 10;
		  else result = -10;
		  return result + d;
		}

		const dt = 300;
		let delay = 0, xc = 150, yc = 90;

		for (let i = 0; i < 3; i += 1) {
		  let set = piles[i];
		        
		  for (let j = 0; j < 7; j += 1) {
		    const card = set[j];
		    const x = xc + calcXShift(j);
		    const y = yc;
		            
		    setTimeout(() => {
		    	counter += 1;
		      this.cardRenderer.draw(x, y, card.suit, card.rank);
		      if (counter === 21) this.animationDone = true;
		    }, delay);
		            
		    yc += 35;
		    delay += dt;
		  }
		  yc = 90;
		  xc += 200;
		}
	}

	displayCard(piles) {
		const card = piles[1][3];
		this.cardRenderer.draw(350, 200, card.suit, card.rank);
	}

	showMessage(text) {
		this.message.textContent = text;
	}
}