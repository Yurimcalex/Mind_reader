var drawCards = function (x, y, suit, symb) {
	'use strict';
	var br = 10, // radius of corners
	h = 160, // card height
	w = 110; // card width

	function testCircle(x, y, r) {
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2 * Math.PI, true);
		ctx.stroke();
	}

	function darwFrame(x, y) {
		ctx.fillStyle = "#EDEAEA";
		// draw borders and corners
		ctx.beginPath();
		ctx.moveTo(x, y + br);
		ctx.lineTo(x, y + h - br);
		ctx.arcTo(x, y + h, x + br, y + h, br); // left bottom corner
		ctx.lineTo(x + w - br, y + h);
		ctx.arcTo(x + w, y + h, x + w, y + h - br, br); // right bottom corner
		ctx.lineTo(x + w, y + br);
		ctx.arcTo(x + w, y, x + w - br, y, br); // right top corner
		ctx.lineTo(x + br, y);
		ctx.arcTo(x, y, x, y + br, br); // left top corner

		ctx.fill();
		//ctx.stroke();
	}

	function darwHeart(x, y, r) {
		ctx.fillStyle = "red";
		// find senter of card
		var cx = x + w / 2,
			cy = y + h / 2,
			r = r || h / 8,
			dy = 0.25 * r,
			dx = Math.sqrt(r * r - dy * dy),
			r1 = dx / 2;

		//testCircle(cx, cy, r); //test circle

		// draw upper half circles
		var ux = [cx - r1, cx + r1];
		for (var i = 0; i < 2; i += 1) {
			ctx.beginPath();
			ctx.arc(ux[i], cy - dy, r1, 0, Math.PI, true);
			ctx.fill();
		};

		// draw bottom part
		ctx.beginPath();
		ctx.moveTo(cx + dx, cy - dy);
		ctx.bezierCurveTo(cx + r - r / 6, cy + r / 3, cx + r / 6, cy + r / 3, cx, cy + r - r / 5);
		ctx.bezierCurveTo(cx - r / 6, cy + r / 3, cx - r + r / 6, cy + r / 3, cx - dx, cy - dy);
		ctx.fill();
	}

	function drawDiamond(x, y, r) {
		// find senter of card
		ctx.fillStyle = "red";
		var cx = x + w / 2,
			cy = y + h / 2,
			r = r || h / 8;

		//testCircle(cx, cy, r); //test circle

		ctx.beginPath();
		ctx.moveTo(cx, cy - r);
		ctx.quadraticCurveTo(cx + r / 4, cy - r / 4, cx + r, cy);
		ctx.quadraticCurveTo(cx + r / 4, cy + r / 4, cx, cy + r);
		ctx.quadraticCurveTo(cx - r / 4, cy + r / 4, cx - r, cy);
		ctx.quadraticCurveTo(cx - r / 4, cy - r / 4, cx, cy - r);
		ctx.fill();
	}

	function drawClub(x, y, r) {
		// find senter of card
		ctx.fillStyle = "black";
		var cx = x + w / 2,
			cy = y + h / 2,
			r = r || h / 8,
			r1 = r / 2.5, // radius of cicles
			// centre of cicles
			xc = [cx, cx + r / 2.2, cx - r / 2.2],
			yc = [cy - r + r / 2.2, cy + r / 7, cy + r / 7];

		//testCircle(cx, cy, r); //test circle

		// draw circles
		for (var i = 0; i < 3; i += 1) {
			ctx.beginPath();
			ctx.arc(xc[i], yc[i], r1, 0, 2 * Math.PI, true);
			ctx.fill();
		}

		// draw bottom element
		var by = cy + Math.sqrt(r * r - Math.pow(r - r / 2, 2));
		ctx.beginPath();
		ctx.moveTo(cx, cy);
		ctx.quadraticCurveTo(cx, by, cx + r - r / 2, by);
		ctx.lineTo(cx - r + r / 2, by);
		ctx.quadraticCurveTo(cx, by, cx, cy);
		ctx.fill();
	}

	function drawSpade(x, y, r) {
		// find senter of card
		ctx.fillStyle = "black";
		var cx = x + w / 2,
			cy = y + h / 2,
			r = r || h / 8,
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

		// draw bottom part
		ctx.beginPath();
		ctx.moveTo(cx + dx, cy + dy);
		ctx.bezierCurveTo(cx + r - r / 6, cy - r / 3, cx + r / 6, cy - r / 3, cx, cy - r + r / 5);
		ctx.bezierCurveTo(cx - r / 6, cy - r / 3, cx - r + r / 6, cy - r / 3, cx - dx, cy + dy);
		ctx.fill();

		// draw bottom element
		var by = cy + Math.sqrt(r * r - Math.pow(r - r / 1.5, 2));
		ctx.beginPath();
		ctx.moveTo(cx, cy);
		ctx.quadraticCurveTo(cx, by, cx + r - r / 2, by);
		ctx.lineTo(cx - r + r / 2, by);
		ctx.quadraticCurveTo(cx, by, cx, cy);
		ctx.fill();

		//testCircle(cx, cy, r); //test circle
	}

	//-----------------------------------------------

	function drawTextSymb(x , y, symb, func) {
		var r = h / 10,
			xt = x + r, // centre of top left circle
			yt = y + r,
			xb = x + w - r, // centre of bottom right circle
			yb = y + h - r;

		ctx.fillStyle = "black";
		ctx.font = "bold " + r + "px Times New Roman";


		ctx.fillText(symb, xt - r / 2, yt + r / 2); // top symb
		ctx.fillText(symb, xb - r - r / 2, yb + r / 6); // bottom symb

		func(xt - w / 2 + r, yt - h / 2 + r / 4, r / 2); //top suit
		func(xb - w / 2, yb - h / 2 - r / 6, r / 2); // bottom suit

		// test circles
		//testCircle(xt + r, yt + r / 4, r / 2); // for suit top
		//testCircle(xb, yb - r / 6, r / 2); // for suit bottom
		//testCircle(xt, yt, r); // for symbol top
		//testCircle(xb - r, yb, r); // for symbol bottom
	}

	function drawCard(x, y, suit, symb) {
		darwFrame(x, y);
		var f = null;
		if (suit === 'heart') {
			darwHeart(x, y);
			f = darwHeart;
		} else if (suit === 'diamond') {
			drawDiamond(x, y);
			f = drawDiamond;
		} else if (suit === 'club') {
			drawClub(x, y);
			f = drawClub;
		} else {
			drawSpade(x, y);
			f = drawSpade;
		}
		drawTextSymb(x , y, symb, f);
	}

	return drawCard(x, y, suit, symb);
};
