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
    model.Card.prototype.binds = function (cont, card, time) {
        setTimeout(function() {
            cont.appendChild(card);
        }, time);
    }


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
            global.start.onclick = function () {
                if (!controller.startFlag) {
                    var i;
                    global.view.removeChild(global.view.querySelector('p'));
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
}());
