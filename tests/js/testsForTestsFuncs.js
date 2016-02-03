describe("isUniqueArrayElements - checks the uniqueness of the array elements", function() {
    it("For [1, 2, 3, 5] where all elms are unique rezult is true", function() {
        assert.equal(isUniqueArrayElements([1, 2, 3, 5]), true);
    });

    it("For [1, 0, 4, 3, 5, 0] rezult is false", function() {
        assert.equal(isUniqueArrayElements([1, 0, 4, 3, 5, 0]), false);
    });

    describe("Optimizations", function() {
        var count = 0;
        function isUniqueArrayElements(arr) {
            var i, j, pos = 1, elm = null;
            for (i = 0; i < arr.length; i += 1) {
                elm = arr[i];
                count += 1;
                for (j = pos; j < arr.length; j += 1) {
                    if (elm === arr[j]) {
                        return false;
                    }
                    
                }
              pos += 1;
            }
            return true;
        }
        isUniqueArrayElements([1, 3, 3, 3, 5]);

        it("For [1, 3, 3, 3, 5] the number of checks is 2", function() {
            assert.equal(count, 2);
        })
    });
});