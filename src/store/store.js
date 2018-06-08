import Vue from 'vue';
import Vuex from 'vuex';

import systemInfo from './modules/systemInfo'; // 系统信息
import populationInfo from './modules/populationInfo'; // 人口信息
import statisModels from './modules/statisModels'; // 统计模块
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        systemInfo,
        populationInfo,
        statisModels
    },
    strict: true
});