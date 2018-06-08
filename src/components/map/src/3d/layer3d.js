import {
    RestObj
} from '../utils/layerRestObj';
import sysConfig from '#/constants';
/**
 * 添加标准的超图S3M REST服务到场景中
 * @param {*} olcusium3 场景viewer
 * @param {*} olcusium3Scene 场景组件
 * @param {*} S3MTileRestUrl 服务地址
 * @param {RestObj} param 所有参数
 */
export function pushS3MTilesLayer(olcusium3, olcusium3Scene, S3MTileRestUrl, restObj, layers) {
    let widget = olcusium3.cesiumWidget;
    try {
        //场景添加S3M图层服务
        let promise = olcusium3Scene.addS3MTilesLayerByScp(S3MTileRestUrl, {
            name: restObj.name
        });
        Cesium.when(promise, function (layer) {
            if (!olcusium3Scene.pickPositionSupported) {
                alert('不支持深度拾取,属性查询功能无法使用！');
            }
            // layer.setQueryParameter({
            //     url: sysConfig.OSGB_SCENE_DATA_URL,
            //     dataSourceName: 'qs_gridcode',
            //     dataSetName: 'GEO_BUILD',
            //     keyWord: 'wg_code'
            // });
            layers.set(restObj.index, olcusium3Scene.layers.find(restObj.name));
        }, function (e) {
            if (widget._showRenderLoopErrors) {
                var title = '渲染时发生错误，已停止渲染。';
                widget.showErrorPanel(title, undefined, e);
            }
        });
        // 返回初始化成功的三维图层
        return olcusium3Scene.layers.find(restObj.name);
    } catch (e) {
        if (widget._showRenderLoopErrors) {
            var title = '渲染时发生错误，已停止渲染。';
            widget.showErrorPanel(title, undefined, e);
        }
    }
}

/**
 *
 * @param {*} olcusium3Scene 场景组件
 * @param {*} STKUrl 服务地址
 * @param {RestObj} restObj 所有参数
 */
export function pushSTKLayer(olcusium3Scene, STKUrl, restObj) {
    const terrainProvider = new Cesium.CesiumTerrainProvider({
        url: STKUrl
    });
    olcusium3Scene.terrainProvider = terrainProvider;
}

// 图层类型枚举
export const S3M_TILES_LAYER = Symbol('S3M_TILES_LAYER');
export const TERRAIN_STK = Symbol('TERRAIN_STK');
