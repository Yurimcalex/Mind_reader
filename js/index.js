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
            this.id = n * width;
            this.y = this.id + 2;
            this.x = this.y - this.id - 1;
        }
    };
    model.Card.prototype.make = function() {
        var img = global.image.cloneNode();
        var cont = document.createElement('div');
        cont.style.width = '101px';
        cont.style.height = '150px';
        //cont.style.background = '#D3CFCF url("../img/suite.png") no-repeat';
        cont.classList.add('img');
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
            var card = set[1].make();
            global.view.querySelector('.output').appendChild(card);
        }
    };

    controller = {
        init: function () {
            global.start.onclick = function () {
                global.wellcome = global.tip.removeChild(wellcome);
                /*self.vw.appendChild(model.image.cloneNode(true));
                self.vw.appendChild(model.image.cloneNode(true));*/
                console.log(global);
            };
        }
    };

    controller.init();
    console.log(view.showCards());
}());
