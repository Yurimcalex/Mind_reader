(function () {
    'use strict';
    var model, view, controller, global;

    global = {
        start: document.getElementById('start'),
        next: document.getElementById('next'),
        view: document.getElementById('vw'),
        tip: document.getElementById('tips'),
        btns: document.getElementById('sel'),
        cardRows: document.querySelectorAll('.output'),
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
            var cont = global.cardRows;
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
            return set;
        },
        showCardsInRows: function (cards, flag) {
            var suite, inRows;
            if (flag === 'top') {
                suite = cards.row2.concat(cards.row1).concat(cards.row3);
            } else if (flag === 'center') {
                suite = cards.row1.concat(cards.row2).concat(cards.row3);
            } else {
                suite = cards.row1.concat(cards.row3).concat(cards.row2);
            }
            inRows = model.laySuiteIn3rows(suite);
            global.suite = inRows;
            inRows = inRows.row1.concat(inRows.row2).concat(inRows.row3);
            if (controller.times === 2) {
                view.showRezult(inRows);
            } else {
                view.showCards(inRows);
            }
        },
        showRezult: function () {
            var i;
            for (i = 0; i < global.cardRows.length; i += 1) {
                global.cardRows[i].innerHTML = '';
            }
            var rez = global.suite.row2[3].make();
            rez.style.marginLeft = '40%';
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
                    global.suite = view.showCards();
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
                    suite = model.laySuiteIn3rows(global.suite);
                    global.suite = suite;
                    suite = suite.row1.concat(suite.row2).concat(suite.row3);
                    view.showCards(suite);
                    global.tip.innerHTML = '<p>In which row is your card? Press: top/center/bottom</p>';
                    controller.selFlag = true;
                    controller.nextFlag = true;
                }
                
            };

            global.btns.addEventListener('click', function (e) {
                var target = e.target;
                var btn;
                var cls = target.getAttribute('class');
                if (cls === 'le') {
                    btn = 'top';
                } else if (cls === 'ce') {
                    btn = 'center';
                } else {
                    btn = 'bottom';
                }
                if (controller.selFlag && controller.times < 3) {
                    view.showCardsInRows(global.suite, btn);
                    controller.times += 1;
                }
            }, false);
        }
    };
    controller.init();
}());
