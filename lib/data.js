import { __awaiter } from "tslib";
/**
 * 取数组中出现次数最多
 */
const findArrayMaxCount = arr => {
    return new Promise(r => {
        let maxCount = 0;
        let maxItem = '';
        const obj = {};
        arr.forEach(item => {
            obj[item] ? obj[item].count += 1 : obj[item] = { count: 1 };
            // tslint:disable-next-line:no-unused-expression
            obj[item].count > maxCount && (maxCount = obj[item].count, maxItem = item);
        });
        r(maxItem);
    });
};
/**
 * ['',1,2] 一维数组
 * 取数组中前出现次数n位
 */
const findArrayNumCount = (result, num) => {
    return new Promise(r => {
        const arr = [];
        result.sort();
        for (let i = 0; i < result.length;) {
            let count = 0;
            for (let j = i; j < result.length; j++) {
                if (result[i] === result[j]) {
                    count++;
                }
            }
            arr.push({
                text: result[i],
                count
            });
            i += count;
        }
        arr.sort((x, y) => {
            return y.count - x.count;
        });
        r(arr.slice(0, num));
    });
};
/**
 * 把[{} || '', {} || '']模式数据遍历，筛掉多余，其余放入一个数组中,{}为等量固定。;
 */
const handleDataSameInArray = array => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((r, j) => __awaiter(void 0, void 0, void 0, function* () {
        const newArray = array.map(item => JSON.stringify(item));
        r(Array.from(new Set(newArray)));
    }));
});
/**
 *  吧 [{x,y}, {x,y}]模式数组对象遍历，筛掉相应的key的多余索引元素(arr, ['name', 'userid'])
 */
const removeDeduplication = (arr, keys) => {
    return new Promise(r => {
        const setArray = new Set();
        const call = arr.filter(x => {
            const setKey = JSON.stringify(keys.reduce((pre, cur) => Object.assign({}, { [cur]: x[cur] }), {}));
            return !setArray.has(setKey) ? setArray.add(setKey) : false;
        });
        r(call);
    });
};
/**
 * 1.按照keys过滤数组对象相同的部分并且合并
 */
const handleArrayDifferent = (arr1, arr2, keys) => {
    // 1.传入要改变数组对象1(老数组)，2.对比数组对象2，3.要检索的数组['x', 'y']值
    // console.log(JSON.stringify(arr1), JSON.stringify(arr2), '======');
    return new Promise(r => {
        const cc = arr1.filter(item1 => {
            const bb = arr2.filter(item2 => {
                const aa = keys.reduce((pre, cur) => {
                    return item1[cur] === item2[cur] && pre;
                }, true);
                if (aa) {
                    return keys.reduce((pre, cur) => Object.assign(pre, { [cur]: item2[cur] }), {});
                }
            });
            if (bb.length === 0) {
                return keys.reduce((pre, cur) => Object.assign(pre, { [cur]: item1[cur] }), {});
            }
        });
        r(cc);
    });
};
/**
 * 合并两个数组，按照传入key-id，补充key-drop的值为0
 */
const getSomeIdAssign = (arr1, arr2, id, drop) => {
    arr1.forEach((item1, index1) => {
        Object.assign(item1, {
            [drop]: 0
        });
        arr2.forEach((item2, index2) => {
            if (item1[id] === item2[id]) {
                Object.assign(item1, item2);
            }
        });
    });
    return arr1;
};
/**
 * 合并类似webpack包development和production那种结构的对象数组
 */
const getMergeObject = (obj1, obj2) => {
    for (let key in obj1) {
        if (Array.isArray(obj1[key])) {
            obj1[key] = obj2.hasOwnProperty(key) ? [...obj1[key], ...obj2[key]] : [...obj1[key]];
        } else if (obj1[key] instanceof Object) {
            const keys = [];
            for (let value in obj1[key]) {
                if (Array.isArray(obj1[key][value])) {
                    keys.push(key);
                    obj1[key][value] = obj2.hasOwnProperty(key) && obj2[key].hasOwnProperty(value) ? [...obj1[key][value], ...obj2[key][value]] : [...obj1[key][value]];
                }
            }
            obj1[key] = Object.assign({}, obj1[key], keys.some(cur => cur === key) ? {} : obj2.hasOwnProperty(key) ? obj2[key] : {});
        } else if (typeof obj1[key] === 'number' || typeof obj1[key] === 'string') {
            obj1[key] = obj2.hasOwnProperty(key) ? obj2[key] : obj1[key];
        }
    }
    for (let key in obj2) {
        if (!obj1.hasOwnProperty(key)) {
            obj1[key] = obj2[key];
        }
    }
    return obj1;
};
/**
 * 获取深层的key的value
 */
const getDeepObjKeysValue = (target, path) => {
    // fields = ['a', 'b', 'c', 'd']
    // obj = {a: {b: {c: { d: 123123, e: '我是eee' } } } }
    const fields = path.split('.');
    // obj = {a: {b: {c: { d: 123123, e: '我是eee' } } } }
    let obj = target;
    // l = 4
    const l = fields.length;
    // 通过循环，逐层深入，这里i最大是2
    for (let i = 0; i < l - 1; i++) {
        const key = fields[i];
        if (!obj[key]) {
            return undefined;
        }
        obj = obj[key];
    }
    // obj = { d: 123123, e: '我是eee' }
    // fields[l - 1] = d
    // 所以 obj[fields[l - 1]] = obj[d] = 123123
    return obj[fields[l - 1]];
};
/**
 * 数组扁平化 [1,2,3,{}, [4, 5]] => [1, 2, 3, 4, {}, 4, 5]将数组展开，concat
 * @param arr
 */
const flattenDeep = arr => {
    return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
};
/**
 * deepClone 深拷贝
 */
const deepClone = target => {
    let result;
    if (typeof target === 'object') {
        if (Array.isArray(target)) {
            result = [];
            for (let i in target) {
                result.push(deepClone(target[i]));
            }
        } else if (target === null) {
            result = null;
        } else if (target.constructor === RegExp) {
            result = target;
        } else {
            result = {};
            for (let i in target) {
                result[i] = deepClone(target[i]);
            }
        }
    } else {
        result = target;
    }
    return result;
};
/**
 * 吧 ['', '']模式数组对象遍历，筛掉相应的key的多余索引元素(arr, ['name', 'userid'])
 */
const arrayDeepRemoveList = (array, keys) => {
    return deepClone(array).reduce((pre, cur) => {
        if (!keys.some(item => {
            return cur === item;
        })) {
            pre.push(cur);
        }
        return pre;
    }, []);
};
/**
 * [''] = arr1
 * [{}, {}] = arr2 从数组1中 遍历到arr2取出arr1中有的元素返回 arr3 = ['', '']
 * option{
 *  arr1,arr2,key,filer
 * }
 */
function getArrObjectString(option) {
    const { arr1, arr2, key, filer } = option;
    const arr = [];
    arr1.forEach((item, index) => {
        arr2.forEach((ele, ji) => {
            if (item.toString() === ele[key].toString()) {
                arr.push(ele[filer]);
            }
        });
    });
    const set = new Set(arr);
    return Array.from(set);
}
/**
 * 取数组1的元素，到数组2中取出 匹配对象生成[{filer}, {filer}] 返回
 * filer = ['id', 'user']
 */
function getFilerArrayObjectString(option) {
    const { arr1, arr2, key, filer } = option;
    const arr = [];
    arr1.forEach((item, index) => {
        arr2.forEach((ele, ji) => {
            const brr = Object.create({});
            if (item.toString() === ele[key].toString()) {
                filer.map(item => {
                    return Object.assign(brr, {
                        [item]: ele[item]
                    });
                });
                arr.push(brr);
            }
        });
    });
    const set = new Set(arr);
    return Array.from(set);
}
function getFilteraArrayList(arr1, arr2) {
    return arr1.concat(arr2).filter((v, i, arr) => {
        return arr.indexOf(v) === arr.lastIndexOf(v);
    });
}
;
function getSmallObjectString(option) {
    const { arr1, arr2, key } = option;
    const arr = [];
    arr1.forEach((item, index) => {
        const isIn = arr2.some(cur => item[key].toString() == cur);
        if (!isIn) arr.push(item);
    });
    const set = new Set(arr);
    return Array.from(set);
}
function uniqueData(data) {
    var newArr = [];
    for (var i = 0; i < data.length; i++) {
        if (newArr.indexOf(data[i]) < 0) {
            newArr.push(data[i]);
        }
    }
    return newArr;
}
function getArrIsOne(arr, key) {
    let isDubbo = true;
    if (uniqueData(arr.map(item => item[key])).length > 1) {
        isDubbo = false;
    }
    return isDubbo;
}
function getTwoArrayObiectKeys(arr, brr, option) {
    const { aid, bid, keys } = option;
    arr.forEach(element => {
        brr.forEach(cur => {
            if (element[aid] === cur[bid]) {
                for (const key of keys) {
                    cur[key] = element[key];
                }
            }
        });
    });
    return [...brr];
}
/**
 * 寻找字符串出现最多的字符，并且统计次数
 * @param str
 */
function findMaxDuplicate(str) {
    str = str.replace(/\s+/g, "");
    console.log(str);
    let maxCar = '',
        maxValue = 1;
    let mapStr = new Map();
    for (let i = 0; i < str.length; i++) {
        if (mapStr.get(str[i])) {
            mapStr.set(str[i], mapStr.get(str[i]) + 1);
        } else {
            mapStr.set(str[i], 1);
        }
    }
    mapStr.forEach((value, key) => {
        if (value > maxValue) {
            maxCar = key;
        }
        maxValue = Math.max(value, maxValue);
    });
    return {
        maxCar,
        maxValue
    };
}
/**
 * 数组中的数组取长度最长的，返回长度和数组
 * @param str
 */
function getLongField(data1, field) {
    var num = 0;
    var arr = [];
    data1.forEach(element => {
        if (element && element[field].length > num) {
            num = element[field].length;
            arr = element[field];
        }
    });
    return {
        arr: arr,
        length: num
    };
}
/**
 * 数组[],去key的value最大到小排序，然后截取max位数；
 * @param str
 */
function getSortValue(option) {
    const { dbj, max, key } = option;
    const backArr = [];
    const values = dbj.map(ma => ma[key]).sort((a, b) => {
        return b - a;
    });
    const newvalues = values.slice(0, max);
    return dbj.filter(fl => {
        return newvalues.includes(fl[key]);
    });
}
export default {
    findArrayMaxCount, findArrayNumCount,
    handleDataSameInArray, removeDeduplication, handleArrayDifferent, getSomeIdAssign,
    getMergeObject, getDeepObjKeysValue, flattenDeep, deepClone, arrayDeepRemoveList,
    getArrObjectString, getFilteraArrayList, getFilerArrayObjectString, getSmallObjectString,
    uniqueData, getArrIsOne, getTwoArrayObiectKeys, findMaxDuplicate, getLongField, getSortValue
};
//# sourceMappingURL=data.js.map