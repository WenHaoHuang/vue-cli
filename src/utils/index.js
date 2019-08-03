/**
 * @Author: wenhao.huang
 * @UserId: 18073766
 * @Create: 2019-04-25 11:25:07
 * @Description: 公共方法
 */

import { MessageBox } from 'element-ui'

const Util = {
  // 验证电话号码
  checkPhone(phone) {
    if (!/^1[3456789]\d{9}$/.test(phone)) {
      return false
    }
    return true
  },
  /**
   * IP确认，豆芽验证码校验
   * @param {string} str [必填] 校验的字符
   * @return {boolean} 返回验证结果
   */
  checkCode(str) {
    if (!/^\d{6}$/.test(str)) {
      return false
    }
    return true
  },
  /**
   * @function format 日期格式化
   * @params timestamp 必填，需格式化的时间戳或者其他日期格式
   * @return fmt 选填，需返回的时间格式，默认 yyy-MM-dd hh:mm:ss
   * 或者：yyyy年MM月dd日 hh时mm分ss秒
   * 或者<i>ss<i>
   * */
  format(timestamp, fmt) {
    fmt = fmt == undefined ? 'yyyy-MM-dd hh:mm:ss' : fmt
    if (timestamp == undefined) {
      timestamp = new Date().getTime()
    } else if (String(timestamp).length == 10) {
      timestamp = timestamp * 1000
    }
    timestamp = new Date(timestamp)
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (timestamp.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    const o = {
      'M+': timestamp.getMonth() + 1,
      'd+': timestamp.getDate(),
      '[H|h]+': timestamp.getHours(),
      'm+': timestamp.getMinutes(),
      's+': timestamp.getSeconds()
    }
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        const str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
      }
    }
    return fmt
  },
  /**
   * @description: 确认消息提示弹窗
   * @param {object} options [必填] 接收参数 可为空{}
   * @param {function} callback [必选] 确认回调方法
   * @param {function} catchFn [可选] 取消回调方法
   */
  confirm(options, callback, catchFn) {
    const option = Object.assign(
      {
        msg: '删除后不可恢复，请确认是否删除？',
        title: '提示',
        type: 'warning'
      },
      typeof options === 'string' ? { msg: options } : options
    )
    MessageBox.confirm(option.msg, option.title, {
      type: option.type,
      dangerouslyUseHTMLString: true
    })
      .then(() => {
        callback()
      })
      .catch(action => {
        if (typeof catchFn === 'function') {
          catchFn(action)
        }
      })
  }
}
const UTIL = {
  install: Vue => {
    Vue.prototype.$utils = Util
  }
}

export default UTIL
