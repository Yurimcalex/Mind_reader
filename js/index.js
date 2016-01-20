(function () {
    'use strict';
    var model, view, controller;

    model = {
        image: (function () {
            var img = new Image();
            img.src = 'img/suite.png';
            return img;
        }()),
        randomNumber: function (x, y) {
            y = y - 1;
            return Math.floor(Math.random() * y + x);
        },
        makeSuite: function (width) {
            var suite = [], n;
            while (true) {
                n = this.randomNumber(0, 35) * width;
                if (suite.indexOf(n) === -1) {
                    suite.push(n);
                }
                if (suite.length === 21) {
                    break;
                }
            }
            return suite;
        }
    };

    view = {

    };

    controller = {
        start: document.getElementById('start'),
        again: document.getElementById('again'),
        vw: document.getElementById('vw'),
        init: function () {
            var self = this;
            this.start.onclick = function () {
                self.vw.removeChild(wellcome);
                /*self.vw.appendChild(model.image.cloneNode(true));
                self.vw.appendChild(model.image.cloneNode(true));*/
            };
        }
    };

    controller.init();
}());
