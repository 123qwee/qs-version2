/**
 * @desc 当前文件存储Ajax相关方法
 * @author Originaljoy
 */

import Vue from 'vue';
import axios from 'axios';
import vueAxios from 'vue-axios';

import constants from '../../../../static/constants.js';
import loginOper from '../common/loginOper.js';

Vue.use(vueAxios, axios);

const qs = require('qs');

// 全局 axios 默认配置
Vue.axios.defaults.baseURL = constants.SERVER_URL;
Vue.axios.defaults.withCredentials = true;
Vue.axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/**
 * 封装的ajax请求
 * @param {*} params
 * type     可选值 get或post
 * url      请求的接口URL
 * data    传的参数，没有则传空对象
 */
const ajaxHttp = function (params) {
    if (params.type == "get") {
        ajaxGet(params.url, {
            params: params.data
        }, params.successFunc, params.errorFunc);
    } else {
        if (params.postType == "form") {
            params.data = qs.stringify(params.data);
        }

        /** 请求传递的配置 */
        const config = {
            // crossDomain: true,
            // withCredentials: true
        };
        ajaxPost(params.url, params.data, config, params.successFunc, params.errorFunc);
    }
}

/**
 * 封装Axios的Get请求
 * @param {*} url         请求的接口URL
 * @param {*} config      配置项
 * @param {*} successFunc 成功回调函数
 * @param {*} errorFun    失败回调函数
 */
const ajaxGet = (url, config, successFunc = defaultFunc, errorFunc = defaultFunc) => {
    Vue.axios.get(url, config).then((res) => {
// debugger
        // 判断是否是单点登录拦截,则回到登录页面
        if (_.isString(res.data) && res.data.indexOf("单点登录") > 0) {
            // loginOper.userLogout();
            return;
        }

        if (res.status === 200) {
            successFunc(res.data);
        } else {
            errorFunc(res.data);
        }
    }).catch((err) => {
        console.log(err.message);

        errorFunc();
    });
}

/**
 * 封装Axios的Post请求
 * @param {*} url         请求的接口URL
 * @param {*} data        传递的数据
 * @param {*} config      配置项
 * @param {*} successFunc 成功回调函数
 * @param {*} errorFunc   失败回调函数
 */
const ajaxPost = (url, data, config, successFunc = defaultFunc, errorFunc = defaultFunc) => {
    Vue.axios.post(url, data, config).then((res) => {
        if (res.status === 200) {
            successFunc(res.data);
        } else {
            errorFunc(res.data);
        }
    }).catch((err) => {
        console.log(err.message);
        // 请求失败，重新登录
        loginOper.userLogout();
        errorFunc();
    });
}

/**
 * 封装Axios的单个Get请求
 * @param {*} url
 * @param {*} config
 */
const ajaxGetFunc = (url, config) => {
    return Vue.axios.get(url, config);
}
/**
 * 封装Axios的单个post请求
 * @param {*} url
 * @param {*} config
 */
const ajaxPostFunc = (url, config) => {
    return Vue.axios.post(url, config);
}

/**
 * 封装Axios的多个请求
 * @param {*} params
 * getFunc 单个Ajax请求的函数数组
 *
 */
const ajaxAll = (params) => {
    Vue.axios.all(params.getFunc).then(Vue.axios.spread((...response) => {
        let data = [];
        for (let i = 0; i < response.length; i++) {
            if (response[i].status == 200) {
                data.push(response[i].data);
            }
        }
        params.successFunc && params.successFunc(data);
        // 两个请求现在都执行完成
    })).catch((err) => {
        console.log(err.message);
        params.errorFunc && params.errorFunc();
    });
}

// 默认函数
const defaultFunc = () => {

};

export default {
    ajaxHttp,
    ajaxGet,
    ajaxPost,
    ajaxGetFunc,
    ajaxPostFunc,
    ajaxAll
}
