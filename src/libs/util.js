import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'

const util = {
  cookies,
  db,
  log
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
  const processTitle = process.env.VUE_APP_TITLE || 'D2Admin'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'd2admin-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('d2admin-link-temp'))
}
util.timeFormat = (val) => {
  if (val <= 0) return val
  let ret = ''
  const date = new Date(val)
  const Y = date.getFullYear()
  let M = date.getMonth() + 1
  let D = date.getDate()
  let H = date.getHours()
  let m = date.getMinutes()
  let s = date.getSeconds()
  // 月/天/时/分/秒小于10前面补0
  if (M < 10) {
    M = '0' + M
  }
  if (D < 10) {
    D = '0' + D
  }
  if (H < 10) {
    H = '0' + H
  }
  if (m < 10) {
    m = '0' + m
  }
  if (s < 10) {
    s = '0' + s
  }
  ret = Y + '-' + M + '-' + D + ' ' + H + ':' + m + ':' + s
  return ret
}
util.dateFormat = (val) => {
  if (val <= 0) return val
  let ret = ''
  const date = new Date(val)
  const Y = date.getFullYear()
  let M = date.getMonth() + 1
  let D = date.getDate()

  // 月/天/时/分/秒小于10前面补0
  if (M < 10) {
    M = '0' + M
  }
  if (D < 10) {
    D = '0' + D
  }

  ret = Y + '-' + M + '-' + D
  return ret
}
util.fixEmpty = (val) => {
  if (!val || val === 'undefined' || val === 'null' || val === null || typeof val === 'undefined') {
    return ''
  }
  return val
}
util.fixEmptyVal = (obj = {}) => {
  const newObj = {}
  for (const item in obj) {
    if (obj.hasOwnProperty(item)) {
      newObj[item] = util.fixEmpty(obj[item])
    }
  }
  return newObj
}

export default util
