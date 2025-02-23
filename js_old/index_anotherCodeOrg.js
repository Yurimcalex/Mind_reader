(function () {
    'use strict';
    var model, view, controller;

    model = {
        cardPack: (function () {
            var symbs = ['6', '7', '8', '9', '10', 'В', 'Д', 'К', 'Т'],
                suits = ['club', 'diamond', 'spade', 'heart'],
                pack = [],
                counter = 0,
                suit,
                card,
                i,
                j;

            for (i = 0; i < suits.length; i += 1) {
                suit = suits[i];
                for (j = 0; j < symbs.length; j += 1) {
                    card = {};
                    card.id = counter;
                    card.suit = suit;
                    card.symb = symbs[j];
                    pack.push(card);
                }
                counter += 1;
            }
            return pack;
        }()),

        makeSet: function () {
            var set = [], n, randomNumber;
            randomNumber = function (x, y) {
                y = y - 1;
                return Math.floor(Math.random() * y + x);
            };
            while (true) {
                n = randomNumber(0, 35);
                if (set.indexOf(n) === -1) {
                    set.push(n);
                }
                if (set.length === 21) {
                    break;
                }
            }
            return set;
        },

        laySetOn3Rows: function (set) {
            var row1 = [], row2 = [], row3 = [];
            var len = set.length;
            var count = 0;
            var rez = [];
            while (count < len) {
                row1.push(set[count]);
                row2.push(set[count + 1]);
                row3.push(set[count + 2]);
                count += 3;
            }
            rez.push(row1);
            rez.push(row2);
            rez.push(row3);
            return rez;
        },

        makeRowsDisplacement: function (btn, set) {
            var newSet;
            if (btn === 'left') {
                newSet = [set[1], set[0], set[2]];
            } else if (btn === 'center') {
                newSet = [set[0], set[1], set[2]];
            } else {
                newSet = [set[0], set[2], set[1]];
            }
            return newSet;
        },

        Card: function (n) {
            this.props = model.cardPack[n];
        },

        makeCardSet: function () {
            var cardSet = [];
            var set = model.makeSet();
            var i;
            for (i = 0; i < set.length; i += 1) {
                cardSet.push(new model.Card(set[i]));
            }
            return cardSet;
        }
    };
    model.Card.prototype.make = function (x, y, time) { // set values of card props and draw card on canvas
        var suit = this.props.suit,
            symb = this.props.symb;

        if (!time) {
            drawCards(x, y, suit, symb);
        } else {
            setTimeout(function () {
                drawCards(x, y, suit, symb);
            }, time);
        }
    };

    view = {
        showCards: function (set) {
            var jump = 0;
            var i1 = 0, i2 = 0;
            var time = 0;
            var i;
            for (i = 0; i < 21; i += 1) {
                if (i % 2 === 0) jump = 5;
                else jump = -5;

                if (i < 7) {
                    set[i].make(9 + 84 * i, 15 + jump, time);
                } else if (i >= 7 && i < 14) {
                    set[i].make(9 + 84 * i1, 15 + jump + 180, time);
                    i1++;
                }
                else {
                    set[i].make(9 + 84 * i2, 15 + jump + 360, time);
                    i2++;
                }
                time += 25;
            }
            return set;
        },

        showCardsInRows: function (cardsSet, counter) {
            var layEffects = function(j, i) {
                var side = 0;
                var d = 0;
                if (j === 2 || j === 6) d = 10;
                if (j === 3) d = -10;
                if (j === 6) d = -5;
                if (j % 2 === 0) side = 10;
                else {
                    side = -10;
                }
                return side + d;
            }

            if (counter < 2) {
                var time = 0, dt = 500;
                var xc = 50;
                var yc = 100;
                for (var i = 0; i < 3; i += 1) {
                    var set = cardsSet[i];
                    for (var j = 0; j < 7; j += 1) {
                        set[j].make(xc + layEffects(j), yc, time);
                        yc += 20;
                        time += dt;
                    }
                    yc = 100;
                    xc += 200;
                }
            } else {
                cardsSet[1][3].make(250, 200);
            }

        },

        clearCanvas: function () { // clear area
            var viewBlock = document.getElementById('vw'),
                canvas = document.getElementById('canv');;
            canvas.width = viewBlock.offsetWidth;
            canvas.height = viewBlock.offsetHeight;
        }
    };

    controller = {
        init: function () {
            var cardSet = null;

            var start = document.getElementById('start'),
                next = document.getElementById('next'),
                btns = document.getElementById('sel');

            var isPressedStart = false,
                isPressedNext = false,
                isPressedLCRBtns = 0;

            start.onclick = function () {
                if (!isPressedStart) {
                    view.clearCanvas();
                    cardSet = view.showCards(model.makeCardSet());
                }
                isPressedStart = true;
            }

            next.onclick = function () {
                var set;
                if (isPressedStart && !isPressedNext) {
                    set = model.laySetOn3Rows(cardSet);
                    view.clearCanvas();
                    view.showCardsInRows(set, 0);
                    cardSet = set;
                }
                isPressedNext = true;
            };

            btns.onclick = function (e) {
                var target = e.target;
                var btn;
                var cls = target.getAttribute('class');
                var set;
                if (isPressedNext && isPressedLCRBtns < 3) {
                    cardSet = model.makeRowsDisplacement(cls, cardSet);

                    set = model.laySetOn3Rows(cardSet[0].concat(cardSet[1]).concat(cardSet[2]));
                    view.clearCanvas();
                    view.showCardsInRows(set, isPressedLCRBtns);
                    cardSet = set;

                    isPressedLCRBtns += 1;
                }
            };
        },
    }

    controller.init();
}());