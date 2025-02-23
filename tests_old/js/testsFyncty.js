function isUniqueArrayElements(arr) {
    var i, j, pos = 1, elm = null;
    for (i = 0; i < arr.length; i += 1) {
        elm = arr[i];
        //console.log('---',elm,'---');
        for (j = pos; j < arr.length; j += 1) {
            //console.log(arr[j]);
            if (elm === arr[j]) {
                return false;
            }
        }
        pos += 1;
    }
    return true;
}

function isEqualArr(arr, arrIsEq) {
    var i;
    if (arrIsEq.length !== arr.length) return false;
    for (i = 0; i < arr.length; i += 1) {
        if (arr[i] !== arrIsEq[i]) return false;
    }
    return true;
}

describe('makeSet - makes an array of integers from 0 to 35 length  21', function() {
    var makeSet = function () {
            var set = [], n , randomNumber;
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
        };

    it('the length of rezult array is 21', function() {
        assert.equal(makeSet().length, 21);
    });
    it('all numbers in array are unique', function() {
        assert.equal(isUniqueArrayElements(makeSet()), true);
    });
});

describe('laySetIn3rows - lay pack of cards on three rows', function() {
    var set = [2, 0, 11, 27, 15, 21, 22, 31, 12, 6, 26, 32, 28, 14, 5, 7, 13, 29, 17, 8, 24];
    var row1 = [2, 27, 22, 6, 28, 7, 17];
    var row2 = [0, 15, 31, 26, 14, 13, 8];
    var row3 = [11, 21, 12, 32, 5, 29, 24];
    var laySetIn3rows = function (set) {
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
        return rez
    }
    var set = laySetIn3rows(set);
    function f(a, r) {
        return isEqualArr(a, r);
    }
    it('test set: [2, 0, 11, 27, 15, 21, 22, 31, 12, 6, 26, 32, 28, 14, 5, 7, 13, 29, 17, 8, 24];', function() {
    });
    it('first row is : [2, 27, 22, 6, 28, 7, 17]', function() {
        assert.equal(f(row1, set[0]), true);
    });
    it('second row is : [0, 15, 31, 26, 14, 13, 8]', function() {
        assert.equal(f(row2, set[1]), true);
    });
    it('third row is : [11, 21, 12, 32, 5, 29, 24]', function() {
        assert.equal(f(row3, set[2]), true);
    });
});

describe('makeRowsDisplacement - displacements rows correspont to pressed button', function() {
    var set = [[2, 27, 22, 6, 28, 7, 17], [0, 15, 31, 26, 14, 13, 8], [11, 21, 12, 32, 5, 29, 24]];
    var makeRowsDisplacement = function (btn, set) {
        var newSet;
        if (btn === 'left') {
            newSet = [set[1], set[0], set[2]];
        } else if (btn === 'center') {
            newSet = [set[0], set[1], set[2]];
        } else {
            newSet = [set[0], set[2], set[1]];
        }
        return newSet;
    }
    it('test set of rows : [[2, 27, 22, 6, 28, 7, 17], [0, 15, 31, 26, 14, 13, 8], [11, 21, 12, 32, 5, 29, 24]];', function () {
    });
    it('when left button pressed change places first and second rows', function () {
        var newSet = makeRowsDisplacement('left', set);
        assert.equal(newSet[0][0], 0);
    });
    it('when center button pressed places of rows not changed', function () {
        var newSet = makeRowsDisplacement('center', set);
        assert.equal(newSet[0][0], 2);
    });
    it('when right button pressed change places third and second rows', function () {
        var newSet = makeRowsDisplacement('right', set);
        assert.equal(newSet[1][0], 11);
    });
});

var pack = [];
describe('makePack - makes pack of cards', function() {
    var makePack = function () {
        var symbs = ['6', '7', '8', '9', '10', 'В', 'Д', 'К', 'Т'];
        var suits = ['club', 'diamond', 'spade', 'heart'];
        var pack = [];
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
        return pack;
    }

});
