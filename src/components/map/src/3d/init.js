import {
    Config
} from '../../config/Config';

/**
 * 根据配置设置三维场景
 * @param {*} olcusium3Scene ol scene对象
 */
export function sceneSetConfig(olcusium3Scene) {
    // 是否开启太阳光
    if (olcusium3Scene.globe.enableLighting && Config.ENABLE_LIGTHING) {
        olcusium3Scene.globe.enableLighting = true;
    }
}
