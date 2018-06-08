import * as reflect from 'reflect-metadata';
import constants from "#/constants";
import * as _ from 'lodash';
const urlMetadataKey = Symbol('url');
const queryMetadataKey = Symbol('query');
const BASE_URL = constants.SERVER_URL;


// Class used as a "narrowing" interface that exposes a minimal urlservice
// Other members of the actual implementation are invisible
export class MinimalUrl {
    urlMap;
    getUrl;
}

export function urlServiceFactory(config) {
    return new UrlService(config);
}

export function url(target, propertyKey, parameterIndex) {
    let existingRequiredParameters = Reflect.getOwnMetadata(urlMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(urlMetadataKey, existingRequiredParameters, target, propertyKey);
}
export function query(target, propertyKey, parameterIndex) {
    let existingRequiredParameters = Reflect.getOwnMetadata(queryMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(queryMetadataKey, existingRequiredParameters, target, propertyKey);
}

export function GET(url) {
    return function (target, propertyName, descriptor) {
        let method = descriptor.value;
        descriptor.value = function () {
            let url1, query;
            let service = this.minimalUrl;
            let urlParameters = Reflect.getOwnMetadata(urlMetadataKey, target, propertyName);
            if (urlParameters) {
                for (let parameterIndex of urlParameters) {
                    if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
                        throw new Error(propertyName + '丢失url字符串');
                    }
                    url1 = arguments[parameterIndex];
                }
            }
            let queryParameters = Reflect.getOwnMetadata(queryMetadataKey, target, propertyName);
            if (queryParameters) {
                for (let parameterIndex of queryParameters) {
                    if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
                        throw new Error(propertyName + '丢失query字符串');
                    }
                    query = arguments[parameterIndex];
                }
            }
            url1 = service.getUrl(url, query);
            if (arguments.length === 0) {
                return method.apply(this, arguments);
            } else {
                return method.call(this, ...(_.slice(Array.prototype.concat.apply(arguments, arguments), 1, arguments.length)), url1);
            }
        };
    };
}

export class UrlService extends MinimalUrl {

    // 用来存储配置的所有服务
    urlMap = new Map();

    constructor(config) {
        super();
        this.setUrl(BASE_URL);
    }

    /**
     * 根据url，获得参数
     * @param name 服务名称
     * @param queryString 查询参数
     * {
     *    type1:value1,
     *    type2:value2
     * }
     */
    getUrl = (name, queryString) => {
        if (queryString) {
            // 判断是否为json类型
            if (!(_.isObjectLike(queryString) && !_.isArray(queryString))) {
                throw new Error('MinimalUrl 传入的参数不为json类型');
            }
        }
        return this.traceUrl(name, queryString);
    }

    setUrl = (baseUrl) => {
        _.forEach(URL_CONFIG, (value, index) => {
            type(index);
            this.urlMap.set(index, baseUrl + value);
        });
    }

    // 处理url
    traceUrl(name, queryString) {
        if (!this.urlMap.get(name))
            return '';
        // 获得url 根地址
        if (name === 'login')
            return this.urlMap.get(name);
        let fUrl = this.urlMap.get(name).split('?')[0];
        if (!queryString || queryString === {}) {
            return fUrl;
        }
        // 获得预先保存的url
        let url = this.urlMap.get(name);
        fUrl += '?';
        _.map(queryString, (value, index) => {
            let paramter = this.regularUrl(url.split('?')[1], index);
            if (paramter !== '') {
                if (fUrl.substr(fUrl.length - 1, 1) === '?') {
                    fUrl += index + '=' + value;
                } else {
                    fUrl += '&' + index + '=' + value;
                }
            }
        });
        return fUrl;
    }

    regularUrl(url, name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = url.match(reg); //获取url中"?"符后的字符串并正则匹配
        var context = '';
        if (r !== null)
            context = r[2];
        reg = null;
        r = null;
        return context === null || context === '' || context === 'undefined' ? '' : context;
    }
}

let typeCache = {};

function type(label) {
    if (typeCache[label]) {
        throw new Error(`设置的服务名称 "${label}" 不唯一"`);
    }

    typeCache[label] = true;

    return label;
}
export const URL_CONFIG = {
    Grid_FindAll: BASE_URL + "/manage/grid/info/findAll",
    Grid_FindAllGirdMember: BASE_URL + "/manage/grid/info/findAllGirdMember/${gridcode}",
    Grid_list: BASE_URL + "/manage/grid/info/house/list/${gridcode}",
    /** 查询统计数 */
    Grid_CountByType: BASE_URL + "/manage/grid/countByType/${type}",
    /** 在某一区域根据类型【学校，组织，人房，工商，党务】查询列表 */
    Grid_FindPageByType: BASE_URL + "/manage/grid/findPageByType?type=${type}&gridCode=${gridCode}&category=${category}",
    Grid_FindHouse: BASE_URL + "/manage/grid/findHouse/${gridCode}",
    /** 根据类型【学校，组织，人房，工商，党务】和编号查询本条详细信息 */
    Grid_findOneByType: BASE_URL + "/manage/grid/findOneByType?type=${type}&gridCode=${gridCode}",
    Grid_findLayers: BASE_URL + "/manage/grid/find/layers?type=${type}&gridCode=${gridCode}&layer=${layer}&unit=${unit}",
    Grid_Buzz: BASE_URL + "/manage/grid/fuzzy?fuzzy=${fuzzy}&page=1&pageSize=10",
    /** 查询重点人群 */
    Grid_FindPageKeyPeople: BASE_URL + "/manage/view/population/findPage?gridCode=${gridCode}&focus=${focus}",

    /**查询人口密度信息 */
    // Grid_densityByCode:BASE_URL+"http://117.34.95.9:8003/manage/statis/house/population?gridCode=140521"
    /** 查询党员列表 */
    Grid_FindPartyList: BASE_URL + "/manage/partyOrganiztion/members?organizationId=${partyId}",
    /** 查询校园案件 */
    Grid_SchoolCaseList: BASE_URL + "/manage/school/info/case?name=${name}",
}
