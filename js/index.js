(function () {
    'use strict';
    var model, view, controller, global;

    global = {
        start: document.getElementById('start'),
        again: document.getElementById('again'),
        view: document.getElementById('vw'),
        tip: document.getElementById('tips'),
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
        Card: function (n, width) {
            this.id = n;
            this.dx = n * width;
        }
    };
    model.Card.prototype.make = function() {
        var img = global.image.cloneNode();
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
        showCards: function () {
            var set = this.cardSet();
            var card, i, row = 0, b = 0;
            var pos = 0;
            var cont = global.view.querySelectorAll('.output');
            for (i = 0; i < cont.length; i += 1) {
                for (var j = b; j < 7 + b; j++) {
                    card = set[j].make();
                    card.style.left = pos + 'px';
                    cont[i].appendChild(card);
                    pos += 65;
                }
                b += 7;
                pos = 0;
            }
        }
    };

    controller = {
        init: function () {
            global.start.onclick = function () {
                global.wellcome = global.tip.removeChild(wellcome);
            };
        }
    };

    controller.init();
    view.showCards();
}());
