(function () {
    'use strict';
    var model, view, controller, global;

    global = {
        start: document.getElementById('start'),
        next: document.getElementById('next'),
        view: document.getElementById('vw'),
        tip: document.getElementById('tips'),
        btns: document.getElementById('sel').querySelectorAll('button'),
        image: (function () {
            var img = new Image();
            img.src = 'img/suite.png';
            return img;
        }())
    };

    model = {
        randomNumber: function (x, y) {
            y = y - 1;
            return Math.floor(Math.random() * y + x);
        },
        makeSuite: function () {
            var suite = [], n;
            while (true) {
                n = this.randomNumber(0, 35);
                if (suite.indexOf(n) === -1) {
                    suite.push(n);
                }
                if (suite.length === 21) {
                    break;
                }
            }
            return suite;
        },
        laySuiteIn3rows: function (suite) {
            var row1 = [], row2 = [], row3 = [];
            var len = suite.length;
            var count = 0;
            var rez = {};
            while (count < len) {
                row1.push(suite[count]);
                row2.push(suite[count + 1]);
                row3.push(suite[count + 2]);
                count += 3;
            }
            rez.row1 = row1;
            rez.row2 = row2;
            rez.row3 = row3;
            return rez;
        },
        Card: function (n, width) {
            this.id = n;
            this.dx = n * width;
        }
    };
    model.Card.prototype.make = function () {
        var cont = document.createElement('div');
        cont.classList.add('img');
        cont.style.backgroundPosition = -this.dx + 'px 0px';
        return cont;
    };


    view = {
        cardSet: function () {
            var suite = [];
            var set = model.makeSuite();
            var i;
            for (i = 0; i < set.length; i += 1) {
                suite.push(new model.Card(set[i], 100));
            }
            return suite;
        },
        showCards: function (set) {
            set = set || this.cardSet();
            var card, i, j, b = 0;
            var pos = 0;
            var cont = global.view.querySelectorAll('.output');
            for (i = 0; i < cont.length; i += 1) {
                for (j = b; j < 7 + b; j += 1) {
                    card = set[j].make();
                    card.style.left = pos + 'px';
                    cont[i].appendChild(card);
                    pos += 65;
                }
                b += 7;
                pos = 0;
            }
            global.cardRows = cont;
            global.suite = set;
        },
        showCardsInRows: function (cards, flag) {
            var suite, tstSuite;
            var makeSteps = function (show) {
                if (controller.times === 2) {
                    show = view.showRezult;
                }
                suite = model.laySuiteIn3rows(tstSuite);
                tstSuite = suite.row1.concat(suite.row2).concat(suite.row3);
                show(tstSuite);
                global.suite = suite;
            };
            if (!flag) {
                suite = model.laySuiteIn3rows(cards);
                tstSuite = suite.row1.concat(suite.row2).concat(suite.row3);
                view.showCards(tstSuite);
                global.suite = suite;
            } else {
                if (flag === 'top') {
                    tstSuite = cards.row2.concat(cards.row1).concat(cards.row3);
                    makeSteps(view.showCards);
                }
                else if (flag === 'center') {
                    tstSuite = cards.row1.concat(cards.row2).concat(cards.row3);
                    makeSteps(view.showCards);
                } else if (flag === 'bottom') {
                    tstSuite = cards.row1.concat(cards.row3).concat(cards.row2);
                    makeSteps(view.showCards);
                }
            }
        },
        showRezult: function () {
            var i;
            for (i = 0; i < global.cardRows.length; i += 1) {
                global.cardRows[i].innerHTML = '';
            }
            var rez = global.suite.row2[3].make();
            global.cardRows[1].appendChild(rez);
            global.tip.innerHTML = '<p>Its your card?</p>';
        }
    };

    controller = {
        times: 0,
        init: function () {
            global.start.onclick = function () {
                if (!controller.startFlag) {
                    var i;
                    global.view.removeChild(global.view.querySelector('p'));
                    view.showCards();
                    for (i = 0; i < 3; i += 1) {
                        global.cardRows[i].removeAttribute('hidden');
                    }
                    global.tip.innerHTML = '<p>Remember a card and press NEXT</p>';
                }
                controller.startFlag = true;
            };

            global.next.onclick = function () {
                var suite;
                if (controller.startFlag && !controller.nextFlag) {
                    view.showCardsInRows(global.suite);
                    global.tip.innerHTML = '<p>In which row is your card? Press:top/center/bottom</p>';
                    controller.selFlag = true;
                    controller.nextFlag = true;
                }
            };

            global.btns[0].onclick = function () {
                var suite;
                if (controller.selFlag && controller.times < 3) {
                    view.showCardsInRows(global.suite, 'top');
                    controller.times += 1;
                }
            };
            global.btns[1].onclick = function () {
                var suite;
                if (controller.selFlag && controller.times < 3) {
                    view.showCardsInRows(global.suite, 'center');
                    controller.times += 1;
                }
            };
            global.btns[2].onclick = function () {
                var suite;
                if (controller.selFlag && controller.times < 3) {
                    view.showCardsInRows(global.suite, 'bottom');
                    controller.times += 1;
                }
            };
        }
    };
    controller.init();
}());
