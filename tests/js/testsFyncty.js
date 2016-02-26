describe('model.makeSuite - makes an array of integers from 0 to 35 length  21', function() {
    it('the length of rezult array is 21', function() {
        assert.equal(model.makeSet().length, 21);
    });
    it('all numbers in array are unique', function() {
        assert.equal(isUniqueArrayElements(model.makeSet()), true);
    });
});

describe('model.laySuiteIn3rows - lay suite in three rows', function() {
    var suite = [2, 0, 11, 27, 15, 21, 22, 31, 12, 6, 26, 32, 28, 14, 5, 7, 13, 29, 17, 8, 24];
    var row1 = [2, 27, 22, 6, 28, 7, 17];
    var row2 = [0, 15, 31, 26, 14, 13, 8];
    var row3 = [11, 21, 12, 32, 5, 29, 24];
    var set = model.laySuiteIn3rows(suite);
    console.log(set);
    function f(a, r) {
        return isEqualArr(a, r);
    }
    it('test suite: [2, 0, 11, 27, 15, 21, 22, 31, 12, 6, 26, 32, 28, 14, 5, 7, 13, 29, 17, 8, 24];', function() {
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
