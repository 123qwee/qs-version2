
const state = {
    sidebarWidth: '240',
    mapWidth: '1680',
    contentHeight: '70vh',
};

const actions = {
};

const getters = {
    sidebarWidth(state, getters, rootState, rootGetters) {
        // 调用统计组件数据,判断统计按钮是否点击
        if (rootGetters["statisModels/isStatisMod"]) {
            return parseInt(state.sidebarWidth);
        } else {
            return parseInt(state.sidebarWidth) + 20;
        }
    },
    mapWidth(state) {
        return state.mapWidth;
    },
    contentHeight(state, getters, rootState, rootGetters) {
        // 调用统计组件数据,判断统计按钮是否点击
        if (rootGetters["statisModels/isStatisMod"]) {
            return '100%';
        } else {
            return state.contentHeight;
        }
    }
};

// // 同步方法
const mutations = {
    systemSidberWidth(state, payload) {
        state.sidebarWidth = payload;
    },
    sidebarOpenCall(state) {
        state.mapWidth = $(document).width() - state.sidebarWidth;
    }
};


export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}