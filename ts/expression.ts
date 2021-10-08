const expression = {
    phone: /^1(3|4|5|6|7|8|9)\d{9}$|^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/, // 手机号
    bankReg: /^(\d{16}|\d{18}|\d{19})$/, // 银行卡
    emailReg: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,  // 邮箱
    idReg: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/ // 身份证
}

export default {
    expression
};
