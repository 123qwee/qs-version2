import * as _ from 'lodash';

import ajaxOper from '../../../../assets/scripts/ajax/ajaxOper.js';

import {
    URL_CONFIG
} from '../../config/service.url';
import {
    pagerLinkUrl
} from '../common/pager';
export class GridService {
    static getGridByID(gridCode, fn) {
        let url = URL_CONFIG.Grid_FindAllGirdMember;
        if (gridCode) {
            url = _.replace(url, '${gridcode}', gridCode);
        }
        ajaxOper.ajaxHttp({
            type: 'get',
            url: url,
            successFunc: (data) => {
                fn.call(this, data.data);
            }
        })
    };

    /**
     * 
     * @param {*} gridType 类型
     * @param {*} gridCode 网格编号
     * @param {*} fn 回调函数
     * @param {*} params 参数列表【page，pageSize，order，orderBy】
     */
    static getGridListData(gridType, gridCode, category, fn, ...params) {
        let url = URL_CONFIG.Grid_FindPageByType;
        if (gridType != undefined) {
            url = _.replace(url, '${type}', gridType);
        }
        if (gridCode != undefined) {
            url = _.replace(url, '${gridCode}', gridCode);
        }
        if (category != undefined) {
            url = _.replace(url, '${category}', category);
        }
        url = pagerLinkUrl(url, params);
        ajaxOper.ajaxHttp({
            type: 'get',
            url: url,
            successFunc: (data) => {
                fn.call(this, data.data);
            }
        })
    }
}
