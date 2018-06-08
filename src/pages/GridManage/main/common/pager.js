const PAGER = "page=${page}&pageSize=${pageSize}&order=${order}&orderBy=${orderBy}";
import * as _ from 'lodash';
export function pagerLinkUrl(url, ...params) {
    if (!_.isArray(params[0]))
        return url;
    if (params[0] && _.isNumber(params[0][0])) {
        url += "&" + _.replace(PAGER.split("&")[0], "${page}", params[0][0]);
    }
    if (params[0] && _.isNumber(params[0][1])) {
        url += "&" + _.replace(PAGER.split("&")[1], "${pageSize}", params[0][1]);
    }
    if (params[0] && params[0][2]) {
        url += "&" + _.replace(PAGER.split("&")[2], "${order}", params[0][2]);
    }
    if (params[0] && params[0][3]) {
        url += "&" + _.replace(PAGER.split("&")[3], "${orderBy}", params[0][3]);
    }
    return url;
}
