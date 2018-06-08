/**
 * @desc EventBus 文件，用于非父子组件间的通讯
 */

import Vue from 'vue'
export default new Vue()

/**
 * 在此备注所有添加的触发事件
 * 
 * triScreenResize: 浏览器窗体宽度修改触发事件
 * 
 * triTodoListRefresh:  待办任务页面触发列表实时刷新
 * 
 * triTodoListAutoRefresh:  待办任务页面触发列表自动刷新启用
 * 
 * triSelectRow:  待办任务页面触发列表记录行选择
 * 
 * triSetUserInfo: 获取到用户信息后触发时间
 * 
 * triMapDrawing: 当前地图处于可绘制状态，不可执行单元信息查询
 * 
 * triPressReply: 触发督办信息回复
 * 
 * triRefleshPress: 响应督办信息刷新请求
 * 
 * transferPopleType 人员类型选择
 */