// refresh防抖
export function debounce(func, delay) {
  let time = null
  return function (...args) {
    if (time) clearTimeout(time)
    time = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 用正则表达式（字符串匹配利器）写的封装格式化时间
export function formatDate(date, fmt) {
  // 获取年份
  // y+ -> 1个或者多个y
  // y* -> 0个或者多个y
  // y？ -> 0个或者1个y
  // 这里RegExp.$1表示yyyy，用真实年份替代yyyy，并做一个截取
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
// 用于补0（4 -> 04）
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
