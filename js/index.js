(function () {
    'use strict';
    var model, view, controller, global;

    global = {
        start: document.getElementById('start'),
        next: document.getElementById('next'),
        view: document.getElementById('vw'),
        canvas: document.getElementById('canv'),
        tip: document.getElementById('tips'),
        btns: document.getElementById('sel'),
        set: (function () {
            var symbs = ['6', '7', '8', '9', '10', 'В', 'Д', 'К', 'Т'];
            var suits = ['club', 'diamond', 'spade', 'heart'];
            var set = [];
            var counter = 0;
            for (var i = 0; i < suits.length; i++) {
                var suit = suits[i];

                for (var j = 0; j < symbs.length; j++) {
                    var card = {};
                    card.id = counter++;
                    card.suit = suit;
                    card.symb = symbs[j];
                    set.push(card);
                };

            };
            return set;
        }())
    };

    model = {
        randomNumber: function (x, y) {
            y = y - 1;
            return Math.floor(Math.random() * y + x);
        },
        makeSet: function () {
            var set = [], n;
            while (true) {
                n = this.randomNumber(0, 35);
                if (set.indexOf(n) === -1) {
                    set.push(n);
                }
                if (set.length === 21) {
                    break;
                }
            }
            return set;
        },
        laySuiteIn3rows: function (suite) {
            var row1 = [], row2 = [], row3 = [];
            var len = suite.length;
            var count = 0;
            var rez = [];
            while (count < len) {
                row1.push(suite[count]);
                row2.push(suite[count + 1]);
                row3.push(suite[count + 2]);
                count += 3;
            }
            rez.push(row1);
            rez.push(row2);
            rez.push(row3);
            return rez
        },
        Card: function (n) {
            this.props = global.set[n];
        }
    };
    model.Card.prototype.make = function (x, y, time) {
        var suit = this.props.suit,
            symb = this.props.symb;

        if (!time) {
            drawCards(x, y, suit, symb);
        } else {
            setTimeout(function() {
                drawCards(x, y, suit, symb);
            }, time);
        }
    };

    view = {
        cardSet: function () {
            var suits = [];
            var set = model.makeSet();
            var i;
            for (i = 0; i < set.length; i += 1) {
                suits.push(new model.Card(set[i]));
            }
            return suits;
        },
        showCards: function (set) {
            var set = set || this.cardSet();
            var jump = 0;
            var i1 = 0, i2 = 0;
            var time = 0;
            for (var i = 0; i < 21; i += 1) {
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
        showCardsInRows: function (cards, flag) {
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

            this.clearCanvas();

            if (controller.times < 2) {
                var sets = global.suite;
                var time = 0, dt = 500;
                var xc = 50;
                var yc = 100;

                for (var i = 0; i < 3; i += 1) {
                    var set = sets[i];

                    for (var j = 0; j < 7; j += 1) {
                        set[j].make(xc + layEffects(j), yc, time);
                        yc += 20;
                        time += dt;
                    };

                    yc = 100;
                    xc += 200;
                }

            } else {
                var rez = global.suite[1][3].make(250, 200);
                global.tip.innerHTML = '<p>Its your card?</p>';
            }

            return dt;
        },
        clearCanvas: function () {
            var vw = global.view,
            canvas = global.canvas;
            canvas.width = vw.offsetWidth;
            canvas.height = vw.offsetHeight;
        }
    };

    controller = {
        times: 0,
        startBtns: false,
        sameBtn: false,
        init: function () {
            var t = 0;

            view.clearCanvas();

            global.start.onclick = function () {
                if (!controller.startFlag) {
                    global.suite = view.showCards();
                    global.tip.innerHTML = '<p>Remember a card and press NEXT</p>';
                }
                controller.startFlag = true;
            };

            global.next.onclick = function () {
                var suite;
                if (controller.startFlag && !controller.nextFlag) {

                    canvas.width = vw.offsetWidth;
                    canvas.height = vw.offsetHeight;

                    suite = model.laySuiteIn3rows(global.suite);
                    global.suite = suite;
                    t = view.showCardsInRows(suite);
                    global.tip.innerHTML = '<p>In which column is your card? Press: left/center/right</p>';

                    setTimeout(function () {
                        controller.startBtns = true;
                    }, t * 21 + 200);

                    controller.selFlag = true;
                    controller.nextFlag = true;
                }
            };

            global.btns.addEventListener('click', function (e) {
                if (controller.selFlag && controller.times < 3) {

                    if (controller.startBtns) {
                        var set = global.suite;
                        var target = e.target;
                        var btn;
                        var cls = target.getAttribute('class');

                        if (cls === 'le') {
                            var col = set[0];
                            set[0] = set[1];
                            set[1] = col;
                        } else if (cls === 'ri') {
                            var col = set[1];
                            set[1] = set[2];
                            set[2] = col;
                        }

                        var suite = model.laySuiteIn3rows(set[0].concat(set[1]).concat(set[2]));
                        global.suite = suite;
                        view.showCardsInRows(suite);
                        controller.times += 1;

                        controller.startBtns = false;
                        setTimeout(function () {
                            controller.startBtns = true;
                        }, t * 21 + 200);
                    }
                }

            }, false);
        }
    };
    controller.init();
}());
