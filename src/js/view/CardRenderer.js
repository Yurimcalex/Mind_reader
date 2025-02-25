export default class CardRenderer {
	constructor(ctx) {
		this.ctx = ctx;
		this.br = 10; // a radius of corners
		this.h = 160; // a card height
		this.w = 110; // a card width
		this.suits = {
			h: 'drawHeart',
			d: 'drawDiamond',
			c: 'drawClub',
			s: 'drawSpade'
		};
	}

	drawFrame(x, y) {
		const { ctx, br, w, h } = this;
		ctx.fillStyle = "#EDEAEA";
		ctx.strokeStyle = "silver";
		ctx.lineWidth = "2";
		ctx.beginPath(); // draw borders and corners
		ctx.moveTo(x, y + br);
		ctx.lineTo(x, y + h - br);
		ctx.arcTo(x, y + h, x + br, y + h, br); // the left bottom corner
		ctx.lineTo(x + w - br, y + h);
		ctx.arcTo(x + w, y + h, x + w, y + h - br, br); // the right bottom corner
		ctx.lineTo(x + w, y + br);
		ctx.arcTo(x + w, y, x + w - br, y, br); // the right top corner
		ctx.lineTo(x + br, y);
		ctx.arcTo(x, y, x, y + br, br); // the left top corner
		ctx.fill();
		ctx.stroke();
	}

	drawHeart(x, y, rs) {
		const { ctx, w, h } = this;
		ctx.fillStyle = "red";
		// find the starting point for drawing
		const cx = x + w / 2,
					cy = y + h / 2,
					r = rs || h / 8,
					dy = 0.25 * r,
					dx = Math.sqrt(r * r - dy * dy),
					r1 = dx / 2;
		// draw upper half circles
		const ux = [cx - r1, cx + r1];
		for (var i = 0; i < 2; i += 1) {
			ctx.beginPath();
			ctx.arc(ux[i], cy - dy, r1, 0, Math.PI, true);
			ctx.fill();
		};
		// draw the bottom part
		ctx.beginPath();
		ctx.moveTo(cx + dx, cy - dy);
		ctx.bezierCurveTo(cx + r - r / 6, cy + r / 3, cx + r / 6, cy + r / 3, cx, cy + r - r / 5);
		ctx.bezierCurveTo(cx - r / 6, cy + r / 3, cx - r + r / 6, cy + r / 3, cx - dx, cy - dy);
		ctx.fill();
	}

	drawDiamond(x, y, rs) {
		const { ctx, w, h } = this;
		ctx.fillStyle = "red";
		// find the starting point for drawing
		const cx = x + w / 2,
					cy = y + h / 2,
					r = rs || h / 8;
		ctx.beginPath();
		ctx.moveTo(cx, cy - r);
		ctx.quadraticCurveTo(cx + r / 4, cy - r / 4, cx + r, cy);
		ctx.quadraticCurveTo(cx + r / 4, cy + r / 4, cx, cy + r);
		ctx.quadraticCurveTo(cx - r / 4, cy + r / 4, cx - r, cy);
		ctx.quadraticCurveTo(cx - r / 4, cy - r / 4, cx, cy - r);
		ctx.fill();
	}

	drawClub(x, y, rs) {
		const { ctx, w, h } = this;
		ctx.fillStyle = "black";
		// find the starting point for drawing
		const cx = x + w / 2,
					cy = y + h / 2,
					r = rs || h / 8,
					r1 = r / 2.5, // radius of circles
					// center of circles
					xc = [cx, cx + r / 2.2, cx - r / 2.2],
					yc = [cy - r + r / 2.2, cy + r / 7, cy + r / 7];
		// draw circles
		for (var i = 0; i < 3; i += 1) {
			ctx.beginPath();
			ctx.arc(xc[i], yc[i], r1, 0, 2 * Math.PI, true);
			ctx.fill();
		}
		// draw the bottom element
		const by = cy + Math.sqrt(r * r - Math.pow(r - r / 2, 2));
		ctx.beginPath();
		ctx.moveTo(cx, cy);
		ctx.quadraticCurveTo(cx, by, cx + r - r / 2, by);
		ctx.lineTo(cx - r + r / 2, by);
		ctx.quadraticCurveTo(cx, by, cx, cy);
		ctx.fill();
	}

	drawSpade(x, y, rs) {
		const { ctx, w, h } = this;
		ctx.fillStyle = "black";
		// find senter of card
		const cx = x + w / 2,
					cy = y + h / 2,
					r = rs || h / 8,
					dy = 0.25 * r,
					dx = Math.sqrt(r * r - dy * dy),
					r1 = dx / 2;
		// draw upper half circles
		var ux = [cx - r1, cx + r1];
		for (var i = 0; i < 2; i += 1) {
			ctx.beginPath();
			ctx.arc(ux[i], cy + dy, r1, 0, Math.PI, false);
			ctx.fill();
		};
		// draw the bottom part
		ctx.beginPath();
		ctx.moveTo(cx + dx, cy + dy);
		ctx.bezierCurveTo(cx + r - r / 6, cy - r / 3, cx + r / 6, cy - r / 3, cx, cy - r + r / 5);
		ctx.bezierCurveTo(cx - r / 6, cy - r / 3, cx - r + r / 6, cy - r / 3, cx - dx, cy + dy);
		ctx.fill();
		// draw bottom element
		const by = cy + Math.sqrt(r * r - Math.pow(r - r / 1.5, 2));
		ctx.beginPath();
		ctx.moveTo(cx, cy);
		ctx.quadraticCurveTo(cx, by, cx + r - r / 2, by);
		ctx.lineTo(cx - r + r / 2, by);
		ctx.quadraticCurveTo(cx, by, cx, cy);
		ctx.fill();
	}

	drawRank(x , y, suit, rank) {
		const { ctx, w, h } = this;
		ctx.fillStyle = "black";
		const r = h / 10,
					xt = x + r, // a center of the top left circle
					yt = y + r,
					xb = x + w - r, // a center of the bottom right circle
					yb = y + h - r;
		ctx.font = "bold " + r + "px Times New Roman";
		ctx.fillText(rank, xt - r / 2, yt + r / 2); // the top rank
		ctx.fillText(rank, xb - r - r / 2, yb + r / 6); // the bottom rank
		const fname = this.suits[suit];
		this[fname](xt - w / 2 + r, yt - h / 2 + r / 4, r / 2); // the top suit
		this[fname](xb - w / 2, yb - h / 2 - r / 6, r / 2); // the bottom suit
	}

	draw(x, y, suit, rank) {
		const fname = this.suits[suit];
		this.drawFrame(x, y);
		this[fname](x, y);
		this.drawRank(x, y, suit, rank);
	}
}