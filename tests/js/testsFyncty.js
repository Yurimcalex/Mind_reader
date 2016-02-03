describe('model.makeSuite - makes an array of integers from 0 to 35 length  21', function() {
    var randomNumber = function (x, y) {
        y = y - 1;
        return Math.floor(Math.random() * y + x);
    }
    var makeSuite = function () {
        var suite = [], n;
        while (true) {
            n = randomNumber(0, 35);
            if (suite.indexOf(n) === -1) {
                suite.push(n);
            }
            if (suite.length === 21) {
                break;
            }
        }
        return suite;
    }
    it('the length of rezult array is 21', function() {
        assert.equal(makeSuite().length, 21);
    });
    it('all numbers in array are unique', function() {
        assert.equal(isUniqueArrayElements(makeSuite()), true);
    });
});