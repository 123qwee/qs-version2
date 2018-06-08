/**
 * @desc 该文件为项目入口文件
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 1.1 引入Vue、Vue-Router框架
import Vue from 'vue'

// 1.2 引入ElementUI界面库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 默认主题
// import 'element-ui/lib/theme-default/index.css' // 默认主题

Vue.use(ElementUI)

// 1.3 引入babel和promise的polyfill使系统兼容IE浏览器11
import 'babel-polyfill';

require("es6-promise").polyfill();

// 1.4 引入滚动轴控件
import Vuebar from 'vuebar'
// import 'vuebar/site/css/pure-min.css'
Vue.use(Vuebar)

// 1.5 引入滚动轴插件, 配合监听插件共同使用
import HappyScroll from "vue-happy-scroll";
import "vue-happy-scroll/docs/happy-scroll.css";
Vue.use(HappyScroll);

import ElementResizeEvent from "element-resize-event";
window.ElementResizeEvent = ElementResizeEvent;

// 2.1 样式文件使不同的浏览器在渲染网页元素的时候形式更统一
import 'normalize.css'
import './assets/styles/animate.css';

// 2.2 引入material字体
import './assets/icons/material-design-icons/material-icons.css'

// 2.3 引入UiKit样式
import './assets/styles/uikit/css/uikit.almost-flat.min.css'

// 2.4 引入Lodash，并将其设置为全局变量
import _ from 'lodash'
window._ = _

// 2.5 引入lscache存储离线数据
import lscache from 'lscache'
window.lscache = lscache

// 2.6 引入moment时间处理库
const moment = require('moment');
moment.locale('zh-cn');

window.moment = moment;

// 2.7 引入echarts
import eCharts from 'echarts/lib/echarts.js';
Vue.prototype.$echarts = eCharts;

// 引入echarts组件
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/dataZoom';

// 2.8 页面顶部进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.prototype.$progress = NProgress;

// 2.9 设置jQuery 全局变量
import $ from 'jquery';
window.jQuery = window.$ = $;

// 3.1 引入根组件
import App from './App'

// 3.2 引入非父子组件间交互组件EventBus
import Bus from './components/common/EventBus.js'
Vue.prototype.$bus = Bus

// 3.3 引入系统全局变量配置
import constants from '../static/constants.js';
window.constants = constants;

// 3.4 引入封装的Ajax操作文件
import ajaxOper from './assets/scripts/ajax/ajaxOper.js'
Vue.prototype.$ajax = ajaxOper

// 3.5 引入封装的弹框提示操作文件
import popupOper from './assets/scripts/common/popupOper.js'
Vue.prototype.$popup = popupOper;

// 3.6 引入封装的工具函数操作文件
import utilsOper from './assets/scripts/common/utilsOper.js'
window.utilsOper = utilsOper;

// 3.7 引入自定义页面样式文件
import './assets/styles/main.css'
import './assets/styles/subpage.css'
import './assets/styles/popup.css'
import './assets/styles/element-custom.css'


Vue.config.productionTip = false

import mock from "@/assets/scripts/ajax/mock";
import store from './store/store'

// 引入vue-router路由框架
import router from './router'
/* eslint-disable no-new */
window.rootVm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
