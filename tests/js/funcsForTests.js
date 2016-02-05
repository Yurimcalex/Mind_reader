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