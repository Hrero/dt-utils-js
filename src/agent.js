/**
 * 是否是移动端
 */
const checkIsMobile = () => {
    const userAgentInfo = navigator.userAgent;
    const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
    let flag = false;
    // tslint:disable-next-line:prefer-for-of
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = true;
            break;
        }
    }
    return flag || document.documentElement.clientWidth < 640;
};
const allAgentInfo = () => {
    var appName = navigator.appName; //浏览器的正式名称
    var appVersion = navigator.appVersion; //浏览器的版本号
    var platform = navigator.platform; // 浏览器正在运行的操作系统平台，包括Win16(windows3.x) 
    var userAgent = navigator.userAgent; //包含以下属性中所有或一部分的字符
    return appName + platform + userAgent + appVersion;
};
export default {
    checkIsMobile,
    allAgentInfo
};
//# sourceMappingURL=agent.js.map