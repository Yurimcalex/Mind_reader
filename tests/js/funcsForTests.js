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