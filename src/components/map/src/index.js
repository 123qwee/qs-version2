/**
 * 非标准化ts模块，缺少类型判断，为了使模块不崩溃
 * 引入了一个处理层用来处理传入的配置，并且合并通用参数
 */
import {
    Init
} from './2d/init';
import {
    // 地图模块组件通用配置
    Config,
    MAP,
    SCENE
} from '../config/Config';
import {
    layerRestObj
} from './utils/layerRestObj'

/**
 * 初始化地图场景
 * @param {*} dom 要渲染的dom id
 * @param {*} config 应用传入的ol配置对象
 */
export function run(dom, config) {
    let init = new Init(dom, convertConfigToObj(config), config);
    return init;
}

/**
 * 将json类型转换
 */
let convertConfigToObj = (config) => {
    return layerRestObj.getRestFromObj(config.Layers);
}
