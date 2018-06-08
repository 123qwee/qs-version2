import {
    URL_CONFIG
} from '../../config/service.url';
import * as _ from 'lodash';
import ajaxOper from '../../../../assets/scripts/ajax/ajaxOper';
import {
    pagerLinkUrl
} from '../common/pager';

export class SchoolService {
    /**
     * 根绝办学类型获得分页数据
     * gridCode 网格编号
     * type 查询类型
     * category 排序类别
     * @param {*} param 分页参数「page，pageSize，order，orderBy」
     */
    static getSchoolPageByName(gridCode, type, category, fn, ...param) {
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
     * 
     * @param {*} type 查询类型
     * @param {*} gridCode 编号
     * @param {*} fn 回调函数
     */
    static getSchoolInfoById(type, gridCode, fn) {
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

    /** 
     * 重点人群 
     * 
     * @param {*} param 分页参数「page，pageSize，order，orderBy」
     */
    static getKeyPeopleList(gridCode, focus, fn, ...param) {
        let url = URL_CONFIG.Grid_FindPageKeyPeople;

        if (gridCode) {
            url = _.replace(url, '${gridCode}', gridCode);
        }
        if (focus) {
            url = _.replace(url, '${focus}', focus);
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
     * 校园案件
     * 
     * @static
     * @param {any} name 学校名称
     * @param {any} fn 回调函数
     * @param {any} param 查询分页参数「page，pageSize，order，orderBy」
     * @memberof SchoolService
     */
    static getSchoolCase(name, fn, ...param){
        let url = URL_CONFIG.Grid_SchoolCaseList;

        if (name) {
            url = _.replace(url, '${name}', name);
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

}