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
			if (!this.game.view.animationDone) return;
			this.game.init();
			this.nextPressed = false;
			this.counter = 0;
		});

		this.next.addEventListener('click', () => {
			if (!this.game.view.animationDone) return;
			if (!this.nextPressed) {
				this.game.start();
				this.nextPressed = true;
			}
		});

		this.btns.addEventListener('click', (e) => {
			if (!this.game.view.animationDone) return;
			const btnType = e.target.getAttribute('class').split(' ')[0];
			if (this.nextPressed && this.counter < 3) {
				this.game.next(btnType);
				this.counter += 1;
			}
		});
	}
}