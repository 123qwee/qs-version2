import ajaxOper from '../ajax/ajaxOper.js'

/**
 * 字典表查询
 */
const getDict = (params) => {
    ajaxOper.ajaxHttp({
        type: 'post',
        data: params.data,
        postType: "form",
        url: "/manage/dictionary/findByTypeIds",
        successFunc: (data) => {
            params.successFunc && params.successFunc(data);
        }
    })
};
/**
 * 行政区划获取
 */
const getReg = (params) => {
    ajaxOper.ajaxHttp({
        type: 'get',
        url: "/manage/divisions/list",
        successFunc: (data) => {
            params.successFunc && params.successFunc(data);
        }
    })
}
/**
 * 区域数据获取（镇，小区，网格）
 */
const getRegionGridInfo = (params) => {
    ajaxOper.ajaxHttp({
        type: 'get',
        url: "/manage/grid/info/findAll",
        successFunc: (data) => {
            params.successFunc && params.successFunc(data);
        }
    })
}
/**
 * 职业类型
 */
const getOccupationType = (params) => {
    ajaxOper.ajaxHttp({
        type: 'get',
        url: "/manage/dictionary/occ/list",
        successFunc: (data) => {
            params.successFunc && params.successFunc(data);
        }
    })
}
/**
 *  门牌号查询
 */
const getDoorplate = (params) => {
    ajaxOper.ajaxHttp({
        type: 'get',
        url: "/manage/grid/info/house/list/" + params.code,
        successFunc: (data) => {
            params.successFunc && params.successFunc(data);
        }
    })
};

const queryList = (params) => {
    ajaxOper.ajaxHttp({
        type: 'get',
        data: params.data,
        url: params.URL,
        successFunc: (data) => {
            params.successFunc && params.successFunc(data);
        },
        errorFunc: data => {
            params.errorFunc && params.errorFunc(data);
        }
    })
};
export default {
    getDict,
    getReg,
    getRegionGridInfo,
    getOccupationType,
    getDoorplate,
    queryList,
}
