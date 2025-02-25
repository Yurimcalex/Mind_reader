import Game from './Game.js';


export default class Controller {
	constructor() {
		this.start = document.getElementById('start');
		this.next = document.getElementById('next');
		this.btns = document.getElementById('sel');
		this.nextPressed = false;
		this.counter = 0;
		this.game = new Game();
	}

	init() {
		this.start.addEventListener('click', () => {
			this.game.init();
			this.nextPressed = false;
			this.counter = 0;
		});

		this.next.addEventListener('click', () => {
			if (!this.nextPressed) {
				this.game.start();
				this.nextPressed = true;
			}
		});

		this.btns.addEventListener('click', (e) => {
			const btnType = e.target.getAttribute('class');
			if (this.nextPressed && this.counter < 3) {
				this.game.next(btnType);
				this.counter += 1;
			}
		});
	}
}