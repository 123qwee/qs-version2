/**
 * 根据当前业务动态生成json数据
 */
import * as _ from 'lodash';
import {
    config
} from '../../config/olconfig';

/**
 * 根据要显示的图层名称获得图层配置json
 * 任何时候只会有一个网格图层被显示
 * @param {*} name 传入的用于显示的图层名称
 */
export function transformByLayerName(name) {
    let c = _.cloneDeep(config);
    if (name) {
        // 获得该图层配置，并配置显影为true
        c[name].show = true;
    }
    return c;
}

/**
 * 深度合并json
 * @param {*} obj 需要合并的json源对象
 * @param {*} json json对象
 */
export function transform(obj, json) {
    return _.merge(obj, json);
}
