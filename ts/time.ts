const dateFormat = (date, format) => { // dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
let $date: any;
const padLeftZero = (str) => {
    return ('00' + str).substr(str.length);
};
if ( !date ) {
    return '';
} else if (typeof date === 'string') {
    const resetDate = date.indexOf('T') > -1 ? date : date.replace(/-/g, '/');
    $date = new Date(resetDate);
} else {
    $date = new Date(date);
}
if (isNaN($date.getTime())) {
    return date;
}
if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, ($date.getFullYear() + '').substr(4 - RegExp.$1.length));
}
const dateKey = {
    'M+': $date.getMonth() + 1,
    'd+': $date.getDate(),
    'h+': $date.getHours(),
    'm+': $date.getMinutes(),
    's+': $date.getSeconds()
};
for (const key in dateKey) {
    if (new RegExp(`(${key})`).test(format)) {
        const str = dateKey[key].toString();
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
}
return format;
};

const getPastHalfYear = () => { // 半年前的时间
    // 先获取当前时间
    var curDate = (new Date()).getTime();
    // 将半年的时间单位换算成毫秒
    var halfYear = 365 / 2 * 24 * 3600 * 1000;
    var pastResult = curDate - halfYear;  // 半年前的时间（毫秒单位）

    // 日期函数，定义起点为半年前
    var pastDate = new Date(pastResult),
        pastYear = pastDate.getFullYear(),
        pastMonth = pastDate.getMonth() + 1,
        pastDay = pastDate.getDate();

    return pastYear + '-' + pastMonth + '-' + pastDay;
}


export default {
    dateFormat,
    getPastHalfYear
};
