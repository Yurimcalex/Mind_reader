import CardRenderer from './CardRenderer.js';


export default class View {
	constructor() {
		this.canvas = document.getElementById('canv');
		this.ctx = this.canvas.getContext('2d');
		this.cardRenderer = new CardRenderer(this.ctx);
		this.reset();
	}

	reset() {
		const wiewingArea = document.getElementById('vw'); 
		this.canvas.width = wiewingArea.offsetWidth;
		this.canvas.height = wiewingArea.offsetHeight;
	}

	displayCards(set) {
		let topShift = 0,  
				leftShift = 0,
				delay = 25;
		
		for (let i = 0; i < set.length; i += 1) {
			const card = set[i];
			let x, y;
		 	if (i % 2 === 0) topShift += 5;
     	else topShift -= 5;
			if (i % 7 === 0 && i > 0) {
				topShift += 180;
				leftShift = 0;
			}    	

     	delay += 25;
     	x = 9 + 84 * leftShift; 
     	y = 15 + topShift;
     	leftShift += 1;
     	
     	setTimeout(() => {
     		this.cardRenderer.draw(x, y, card.suit, card.rank);
     	}, delay);
		}
	}

	displayCardsInPiles(piles, attempt) {
		const calcXShift = function(n) {
		  let result = 0, d = 0;
		  if (n === 2 || n === 6) d = 10;
		  if (n === 3) d = -10;
		  if (n === 6) d = -5;
		  if (n % 2 === 0) result = 10;
		  else result = -10;
		  return result + d;
		}

		if (attempt < 2) {
				const dt = 500;
		    let delay = 0, xc = 50, yc = 100;

		    for (let i = 0; i < 3; i += 1) {
		        let set = piles[i];
		        
		        for (let j = 0; j < 7; j += 1) {
		        		const card = set[j];
		        		const x = xc + calcXShift(j);
		            const y = yc;
		            
		            setTimeout(() => {
		            	this.cardRenderer.draw(x, y, card.suit, card.rank);
		            }, delay);
		            
		            yc += 20;
		            delay += dt;
		        }
		        yc = 100;
		        xc += 200;
		    }

		} else {
			const card = set[1][3];
			this.cardRenderer.draw(250, 200, card.suit, card.rank);
		}
	}
}