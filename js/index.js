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
    model.Card.prototype.make = function (x, y) {
        var suit = this.props.suit,
            symb = this.props.symb;

        drawCards(x, y, suit, symb);
    };
    model.Card.prototype.binds = function (cont, card, time) {
        setTimeout(function() {
            cont.appendChild(card);
        }, time);
    }


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
        showCards: function () {
            var set = this.cardSet();
            var jump = 0;
            for (var i = 0; i < 7; i += 1) {
                if (i % 2 === 0) jump = 5;
                else jump = -5;
                set[i].make(9 + 84 * i, 10 + jump);
            }
        },
        showCardsInRows: function (cards, flag) {
            if (controller.times < 2) {
                var containers = global.cardRows;
                var sets = global.suite;
                var pos = 0;
                var time = 0;
                for (var i = 0; i < 3; i++) {
                    var cont = containers[i];
                    cont.innerHTML = '';
                    var set = sets[i];
                    for (var j = 0; j < 7; j++) {
                        var card = set[j].make();
                        card.style.top = pos + 'px';
                        set[j].binds(cont, card, time);
                        pos += 55;
                        time += 500;
                    }
                    pos = 0;
                }
            } else {
                var i;
                for (i = 0; i < global.cardRows.length; i += 1) {
                    global.cardRows[i].innerHTML = '';
                }
                var rez = global.suite[1][3].make();
                rez.style.marginTop = '150px';
                global.cardRows[1].appendChild(rez);
                global.tip.innerHTML = '<p>Its your card?</p>';
            }
        }
    };

    controller = {
        times: 0,
        init: function () {
                var vw = global.view,
                    canvas = global.canvas;

                canvas.width = vw.offsetWidth;
                canvas.height = vw.offsetHeight;

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
                    for (var i = 0; i < global.cardRows.length; i++) {
                        global.cardRows[i].classList.add('output_next');
                    }
                    suite = model.laySuiteIn3rows(global.suite);
                    global.suite = suite;
                    view.showCardsInRows(suite);
                    global.tip.innerHTML = '<p>In which column is your card? Press: left/center/right</p>';
                    controller.selFlag = true;
                    controller.nextFlag = true;
                    
                }
            };

            global.btns.addEventListener('click', function (e) {
                if (controller.selFlag && controller.times < 3) {
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
                }
                
            }, false);
        }
    };
    controller.init();
    //console.log(global.set);
}());
