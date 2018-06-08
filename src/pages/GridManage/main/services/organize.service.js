import {
    URL_CONFIG
} from '../../config/service.url';
import * as _ from 'lodash';
import ajaxOper from '../../../../assets/scripts/ajax/ajaxOper';

import {
    pagerLinkUrl
} from '../common/pager';

export class OrganizeService {
    /**
     *  获取组织列表
     * @param {*} gridCode 网格编号
     * @param {*} type 类型
     * @param {*} category 排序类型
     * @param {*} fn 回调函数
     * @param {*} param 分页参数列表 【page，pageSize，order，orderBy】
     */
    static getOrganizeList(gridCode, type, category, fn, ...param) {
        let url = URL_CONFIG.Grid_FindPageByType;

        if (gridCode) {
            url = _.replace(url, '${gridCode}', gridCode);
        }
        if (type != undefined) {
            url = _.replace(url, '${type}', type);
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
    };

    /**
     * 查询组织详细信息
     * @param {*} type 查询类别
     * @param {*} gridCode 组织编号
     * @param {*} fn 回调函数
     */
    static getOrganizeInfoById(type, gridCode, fn) {
        let url = URL_CONFIG.Grid_findOneByType;
        if (type) {
            url = _.replace(url, '${type}', type);
        }
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
}