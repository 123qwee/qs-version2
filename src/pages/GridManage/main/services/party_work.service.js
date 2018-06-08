import {
    URL_CONFIG
} from '../../config/service.url';
import * as _ from 'lodash';
import ajaxOper from '../../../../assets/scripts/ajax/ajaxOper';

import {
    pagerLinkUrl
} from '../common/pager';

export class PartyWorkService {
    /**
     *  获取党务列表
     * @param {*} gridCode 网格编号
     * @param {*} type 类型
     * @param {*} category 排序类型
     * @param {*} fn 回调函数
     * @param {*} param 分页参数列表 【page，pageSize，order，orderBy】
     */
    static getPartyWorkList(gridCode, type, category, fn, ...param) {
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
     * 查询党务详细信息
     * @param {*} type 查询类别
     * @param {*} gridCode 党建编号
     * @param {*} fn 回调函数
     */
    static getPartyWorkInfoById(type, gridCode, fn) {
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
    };

    /**
     * 查询党组织下属党员列表
     * 
     * @param {any} partyId 党组织ID
     * @param {any} fn  回调函数
     * @memberof PartyWorkService
     */
    static getPartyMemberList(partyId, fn){
        let url = URL_CONFIG.Grid_FindPartyList;
        if (partyId) {
            url = _.replace(url, '${partyId}', partyId);
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