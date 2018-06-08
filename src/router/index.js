import Vue from 'vue'
import Router from 'vue-router'

import routes from './routes'
import loginOper from '../assets/scripts/common/loginOper.js'

Vue.use(Router)

const router = new Router({
    // 使用HTML5 history模式时，nginx代理路径不被识别
    // mode: 'history',
    routes
})

// 路由执行前拦截操作
router.beforeEach((to, from, next) => {
    next()
})

// // 路由执行后操作
// router.afterEach(transition => {

// })



export default router
