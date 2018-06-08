
import commonAjax from '@/assets/scripts/common/commonAjax';


const state = {

};

const actions = {
    // 获取数据
    getPopulationTypeData() {
        let setLocalName = {
            "婚姻状况": 'maritalStatus',
            "民族": 'nation',
            "学历": 'educational',
            "政治面貌": 'appearance',
            "宗教信仰": 'religiousbeliefs',
            "流入原因": 'causeinflow',
            "办证类型": 'certificatetype',
            "住所类型": 'residencetype',
            "人户一致标识": 'householdsign',
            "家庭关系": 'householdrelationship',
            "常用证件": 'credType',
        };
        // 本地存储人口类型 key值
        let PopulationLocal = _.values(setLocalName),
            dictId = [];
        // 判断此类型是否还在本地存储，如果没有，请求该类型数据
        _.map(PopulationLocal, name => {
            if (!lscache.get(name)) {
                dictId.push(name.toLocaleUpperCase())
            }
        });
        commonAjax.getDict({
            data: {
                typeIds: dictId.toString()
            },
            successFunc: data => {
                if (data.code == 200) {
                    _.map(data.data, (item, key) => {
                        // 存储获得的数据
                        lscache.set(setLocalName[key], _.map(data.data[key], item => {
                            return { label: item.dataName, value: item.dataCode };
                        }), constants.SESSION_LIMIT);
                    });
                }
            }
        });
    },
};

const getters = {
};

// // 同步方法
const mutations = {
    systemOneMenu(state, payload) {
        state.systemOneMenu = payload;
    },
};


export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}