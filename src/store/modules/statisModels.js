const state = {
    isStatisMod: false,
    statisModels: {
        show: true,
        img: require('@/assets/images/menu/test.png'),
        path: 'PopulationStatis',
    }
};

const actions = {
};

const getters = {
    statisModels(state) {
        return state.statisModels;
    },
    isStatisMod(state) {
        return state.isStatisMod
    }
};

// // 同步方法
const mutations = {
    handleStatisModels(state, payload) {
        rootVm.$router.push('/' + state.statisModels.path);
        state.isStatisMod = true;
    },
    backMap(state){
        state.isStatisMod = false;
    }
};


export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}