import {
    URL_CONFIG
} from '../../config/service.url';
import * as _ from 'lodash';
import ajaxOper from '../../../../assets/scripts/ajax/ajaxOper';
import {
    pagerLinkUrl
} from '../common/pager';

export class PeopleService {
    /**
     * 按照类别查询数量
     * @param {*} type 类型（人房、网格、学校）
     */
    static getGridCountByType(type, fn) {
        let url = URL_CONFIG.Grid_CountByType;
        if (type) {
            url = _.replace(url, '${type}', type);
        } else {
            return;
        }
        ajaxOper.ajaxHttp({
            type: 'get',
            url: url,
            successFunc: (data) => {
                fn.call(this, data);
            }
        })
    }

    /**
     * 根绝区域类型获得分页
     * @param {*} type 类型
     * @param {*} fn 编码
     * @param {*} param 分页参数「page，pageSize，order，orderBy」
     */
    static getGridPageByType(type, gridCode, category, fn, ...param) {
        let url = URL_CONFIG.Grid_FindPageByType;
        if (type) {
            url = _.replace(url, '${type}', type);
        } else {
            return;
        }
        if (gridCode) {
            url = _.replace(url, '${gridCode}', gridCode);
        }
        if (category != undefined) {
            url = _.replace(url, '${category}', category);
        }
        url = pagerLinkUrl(url, param);
        ajaxOper.ajaxHttp({
            type: 'get',
            url: url,
            successFunc: (data) => {
                fn.call(this, data);
            }
        });
    }

    /**
     *
     * @param {*} gridCode 楼栋网格id
     * @param {*} fn 回调
     * @param {*} param 分页参数「page，pageSize，order，orderBy」
     */
    static getHouseById(type, gridCode, fn, ...param) {
        /**
         * 2018-4-10
         * 民房数据调整，判定编码超过19位时只截取前19位
         */
        if ((gridCode + "").length > 19) {
            gridCode = (gridCode + "").substr(0, 19);
        }
        let url = URL_CONFIG.Grid_findOneByType;
        if (type) {
            url = _.replace(url, '${type}', type);
        }
        if (gridCode) {
            url = _.replace(url, '${gridCode}', gridCode);
        }
        url = pagerLinkUrl(url, param);
        ajaxOper.ajaxHttp({
            type: 'get',
            url: url,
            successFunc: (data) => {
                fn.call(this, data);
            }
        });
    }

    static getHouseByCode(gridCode, fn) {
        let url = URL_CONFIG.Grid_FindHouse;
        if (gridCode) {
            url = _.replace(url, '${gridCode}', gridCode);
        }
        ajaxOper.ajaxHttp({
            type: 'get',
            url: url,
            successFunc: (data) => {
                fn.call(this, data);
            }
        });
    }

    /**
     * 查询楼层、单元信息
     * @param {*} type 类型
     * @param {*} gridCode 网格编码
     * @param {*} layer 图层
     * @param {*} unit 单元
     * @param {*} fn 回调
     * @param {*} param 分页参数
     */
    static getHouseLayers(type, gridCode, layer, unit, fn, ...param) {
        /**
         * 2018-4-10
         * 民房数据调整，判定编码超过19位时只截取前19位
         */
        if ((gridCode + "").length > 19) {
            gridCode = (gridCode + "").substr(0, 19);
        }
        let url = URL_CONFIG.Grid_findLayers;
        if (type != "") {
            url = _.replace(url, '${type}', type);
        }
        if (gridCode != "") {
            url = _.replace(url, '${gridCode}', gridCode);
        }
        url = _.replace(url, '${layer}', layer);
        if (unit != "") {
            url = _.replace(url, '${unit}', unit);
        }
        url = pagerLinkUrl(url, param);
        ajaxOper.ajaxHttp({
            type: 'get',
            url: url,
            successFunc: (data) => {
                fn.call(this, data);
            }
        });
    }

    /**
     * 关键词模糊查询所有分类
     * @param {*} fuzzy 关键词
     * @param {*} fn
     * @param {*} param
     */
    static getFuzz(fuzzy, fn, ...param) {
        let url = URL_CONFIG.Grid_Buzz;
        if (fuzzy != "") {
            url = _.replace(url, '${fuzzy}', fuzzy);
        }
        url = pagerLinkUrl(url, param);
        ajaxOper.ajaxHttp({
            type: 'get',
            url: url,
            successFunc: (data) => {
                // // 将数据处理成fuzz格式
                let _data = [];
                data = data.data;
                _.map(data, (value, index) => {
                    let type = index;
                    _.map(value, (value1, index1) => {
                        _data.push({
                            type: type,
                            value: value1.name,
                            address: value1.address,
                            code: value1.gridCode,
                            id: value1.id
                        })
                    });
                });
                fn.call(this, _data);
            }
        });
    }
}
