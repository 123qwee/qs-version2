/**
 * @desc 当前文件存储弹框相关方法
 * @author Originaljoy
 */

import {
  Notification,
  Loading,
  MessageBox
} from 'element-ui';

/**
 * 显示系统通知
 * @param title 标题
 * @param message 通知信息
 * @param type 通知类型
 * @param offset 位置偏移量
 * @param duration 存在时长 
 */
const showNotification = (params) => {
  Notification({
    title: params.title || '提示',
    message: params.message,
    type: params.type || 'warning',
    offset: params.offset || 120,
    // 默认3000毫秒
    duration: params.duration || 3000
  });
}

/**
 * 显示系统通知消息【成功】
 * @param {*} params 
 */
const showSuccessNoti = (params) => {
  params = _.assign(params, {
    type: 'success'
  });

  showNotification(params);
}

/**
 * 显示系统通知消息【错误】
 * @param {*} params 
 */
const showErrorNoti = (params) => {
  params = _.assign(params, {
    type: 'error'
  });

  showNotification(params);
}

/**
 * 显示加载等待页面
 * @param {*} text 等待提示信息
 */
const showLoading = (text) => {
  text = text == undefined ? "加载中，请稍候..." : text;
  window.mainLoading = Loading.service({
    fullscreen: true,
    text: text,
    customClass: 'page-loading'
  });
}

/**
 * 关闭加载等待页面
 */
const closeLoading = () => {
  setTimeout(function () {
    window.mainLoading && window.mainLoading.close();
  }, 200);
}

/**
 * 显示模态提示对话框
 * @param title 标题
 * @param message 通知信息
 * @param type 通知类型
 * @param sureFunc 确认回调函数
 */
const showModalAlert = (params) => {
  MessageBox.alert(params.message, params.title || '提示', {
    type: params.type || 'info',
    closeOnClickModal: true,
    showConfirmButton: true
  }).then(function () {
    params.sureFunc && params.sureFunc.call();
  });
}

/**
 * 显示确认对话框
 * @param title 标题
 * @param message 通知信息
 * @param confirmButtonText 确认按钮描述文字
 * @param cancelButtonText 取消按钮描述文字
 * @param successFunc 确认回调函数
 */
const showConfirm = (params) => {
  let title = params.title == undefined ? '确认' : params.title;
  window.rootVm.$confirm(params.message, title, {
    confirmButtonText: params.confirmButtonText == undefined ? '确定' : params.confirmButtonText,
    cancelButtonText: params.cancelButtonText == undefined ? '取消' : params.cancelButtonText,
    type: 'warning'
  }).then(() => {
    params.successFunc && params.successFunc();
  }).catch(() => {
    params.errorFunc && params.errorFunc();
  });
};

export default {
  showNotification,
  showSuccessNoti,
  showErrorNoti,
  showLoading,
  closeLoading,
  showModalAlert,
  showConfirm
}