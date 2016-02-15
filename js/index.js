(function () {
    'use strict';
    var model, view, controller, global;

    global = {
        start: document.getElementById('start'), // link on start btn
        next: document.getElementById('next'), // link on next btn
        view: document.getElementById('vw'), // link on view container in which placed canvas elmnt
        canvas: document.getElementById('canv'), // link on canvas elmnt
        tip: document.getElementById('tips'), // link on footer
        btns: document.getElementById('sel'), // link on container on which are placed left/center/right btns
        //make deck of 36 cards
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
        randomNumber: function (x, y) { // return random number
            y = y - 1;
            return Math.floor(Math.random() * y + x);
        },
        makeSet: function () { // makes set of 21 unical numbers range from 0 to 35
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
        laySuiteIn3rows: function (suite) { // lays 21 numbers on 3 parts
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
        Card: function (n) { // constructor for each card
            this.props = global.set[n];
        }
    };
    model.Card.prototype.make = function (x, y, time) { // set values of card props and draw card on canvas
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
        cardSet: function () { // makes set of 21 cards
            var suits = [];
            var set = model.makeSet();
            var i;
            for (i = 0; i < set.length; i += 1) {
                suits.push(new model.Card(set[i]));
            }
            return suits;
        },
        showCards: function (set) { // display random 21 cards
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
        showCardsInRows: function (cards, flag) { // display cards on 3 rows
            var layEffects = function(j, i) { // lays card on different positions in row
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

            this.clearCanvas(); // clear area before displaying

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

            } else { // show rezult card
                var rez = global.suite[1][3].make(250, 200);
                global.tip.innerHTML = '<p>Its your card?</p>';
            }

            return dt;
        },
        clearCanvas: function () { // clear area
            var vw = global.view,
            canvas = global.canvas;
            canvas.width = vw.offsetWidth;
            canvas.height = vw.offsetHeight;
        }
    };

    controller = {
        times: 0, // flag for cards shuffling
        startBtns: false, // flag using for enables press button only after previous operation done
        makeBtnBlink: function(btn, classB, time) { // make blink border of battons
            var h = setInterval(function() {
                btn.classList.toggle(classB);
            }, time);
            return h;
        },
        init: function () {
            var t = 0; // for interval in that card shown in lays
            // clear canvas before lays
            view.clearCanvas(); 
            // timers for all buttons
            var hs, hn, hl, hc, hr, ts; // hs - start, hn - next, hl - left, hc - center, hr - right

            hs = controller.makeBtnBlink(global.start, 'btns_bord', 500); // make start button blink

            global.start.onclick = function () { // add click handler for start button
                if (!controller.startFlag) {
                    global.suite = view.showCards();
                    global.tip.innerHTML = '<p>Remember a card and press NEXT</p>';
                }
                controller.startFlag = true; // start button press only one time
                clearInterval(hs); // when start button pressed cancel blink it
                global.start.classList.remove('btns_bord'); // remove red border if it is
                // after click on start button make blink next button
                hn = controller.makeBtnBlink(global.next, 'btns_bord', 500);
            };

            global.next.onclick = function () { // click handler for next button
                var suits;

                clearInterval(hn); // after click on next button cancel blink it
                global.next.classList.remove('btns_bord'); // remove red border if it is
                // next button have to press only one time
                if (controller.startFlag && !controller.nextFlag) { // only after start button pressed
                    //lys set of card on three rows
                    suits = model.laySuiteIn3rows(global.suite);
                    global.suite = suits; // write this set in global object
                    t = view.showCardsInRows(suits); // display this rows on screen
                    // show tip in tips area
                    global.tip.innerHTML = '<p>In which column is your card? Press: left/center/right</p>';
                    // remove red border around next button if it is
                    global.start.classList.remove('btns_bord');
                    setTimeout(function () {
                        controller.startBtns = true; // enable press any of left/center/right btns 10,7 sec after go
                    }, t * 21 + 200);
                    // indicate that #sel buttons can be pressed
                    controller.selFlag = true;
                    controller.nextFlag = true;
                    // get link on #sel buttons
                    var btns = global.btns.children;
                    // timers for them
                    ts = [hl, hc, hr];
                    for (var i = 0; i < btns.length; i++) {
                        (function(i) {
                            setTimeout(function () {
                                ts[i] = controller.makeBtnBlink(btns[i], 'btns_bord', 700); // make blink #sel btns
                            }, t * 21 + 200 + 300 * i);
                        })(i);
                    };
                }

            };

            global.btns.addEventListener('click', function (e) { // click handler for #sel btns
                // execute if press any of #sel btns and it pressed less then 3 times
                if (controller.selFlag && controller.times < 3) {

                    if (controller.startBtns) { // check for enabling pressing any of #sel btns
                        var set = global.suite; // get link on previous set of cards
                        var target = e.target;
                        var btn;
                        var cls = target.getAttribute('class');
                        // cheking which of #sel btns was pressed, make transposition of it
                        if (cls === 'le') {
                            var col = set[0];
                            set[0] = set[1];
                            set[1] = col;
                        } else if (cls === 'ri') {
                            var col = set[1];
                            set[1] = set[2];
                            set[2] = col;
                        }
                        // collect cards for displaying
                        var suite = model.laySuiteIn3rows(set[0].concat(set[1]).concat(set[2]));
                        global.suite = suite;
                        view.showCardsInRows(suite);
                        controller.times += 1;

                        controller.startBtns = false; // disable press any of #sel btns while oparation not execute
                        setTimeout(function () {
                            controller.startBtns = true; // enable press it after 10,7 sec
                        }, t * 21 + 200);
                    }
                    // end blink of #sel btns after 3 times pressing
                    if (controller.times === 3) {
                        clearInterval(ts[0]);
                        clearInterval(ts[1]);
                        clearInterval(ts[2]);
                        for (var i = 0; i < global.btns.children.length; i++) {
                            global.btns.children[i].classList.remove('btns_bord'); // remove red border around them
                        };
                    }
                }

            }, false);
        }
    };
    controller.init();
}());
