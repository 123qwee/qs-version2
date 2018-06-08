import * as _ from 'lodash';
/**
 * 转换数组为sql语句
 * 拼接[a,b,c] 为 key = a and key =b and key =c
 * @param {*} ids id串
 * @param {*} key 拼接的字段名
 */
export function parseSql(ids, key) {
    if (!_.isArray(ids)) return '';
    let sqlstr = '';
    sqlstr += (key + " in (");
    let sqlstr1 = '';
    _.map(ids, (value, index) => {
        sqlstr1 += ("'" + value + "'");
        if (index < ids.length - 1) sqlstr1 += ","
    });

    sqlstr = sqlstr + sqlstr1 + ")"
    return sqlstr;
}
