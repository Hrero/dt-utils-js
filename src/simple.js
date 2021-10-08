const priceFormat = (s) => {
    if (/[^0-9\.]/.test(s)) {
        return '0.00';
    }
    s = s.toString().replace(/^(\d*)$/, '$1.');
    s = (s + '00').replace(/(\d*\.\d\d)\d*/, '$1');
    s = s.replace('.', ',');
    const re = /(\d)(\d{3},)/;
    while (re.test(s)) {
        s = s.replace(re, '$1,$2');
    }
    s = s.replace(/,(\d\d)$/, '.$1');
    return s.replace(/^\./, '0.');
};
const isEmpty = val => {
    return typeof val === 'number' ? val === 0 : (true === !val || 0 == Object.keys(val).length);
};
const lineHump = (s) => {
    var a = s.split("_");
    var o = a[0];
    for (var i = 1; i < a.length; i++) {
        o = o + a[i].slice(0, 1).toUpperCase() + a[i].slice(1);
    }
    return o;
};
function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj = JSON.parse(str);
            if (typeof obj == 'object' && obj) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (e) {
            console.log('error：' + str + '!!!' + e);
            return false;
        }
    }
    console.log('It is not a string!');
}
const mathFloor = (max, min) => {
    return Math.floor(Math.random() * (max - min) + min);
};
export default {
    priceFormat,
    isEmpty,
    lineHump,
    isJSON,
    mathFloor
};
//# sourceMappingURL=simple.js.map