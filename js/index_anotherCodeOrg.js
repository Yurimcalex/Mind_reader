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
                newSet = set[1].concat(set[0]).concat(set[2]);
            } else if (btn === 'center') {
                newSet = set[0].concat(set[1]).concat(set[2]);
            } else {
                newSet = set[0].concat(set[2]).concat(set[1]);
            }
            return newSet;
        },

        Card: function (n) { // constructor for each card
            this.props = model.cardPack[n];
        },

        makeCardSet: function () { // makes set of 21 cards
            var cardSet = [];
            var set = model.makeSet();
            var i;
            for (i = 0; i < set.length; i += 1) {
                cardSet.push(new model.Card(set[i]));
            }
            return cardSet;
        }
    };

    var set = model.makeSet();
    model.laySetOn3Rows(set);
    model.makeCardSet(set);
}());