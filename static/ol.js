/**
 * 地图默认配置
 * 当有新配置继承此配置文件
 */
import constants from './constants';
// 加载图层类型枚举
import {
    // 超图rest图层
    TILE_SUPERMAP_REST,
    // 超图三维图层
    S3M_TILES_LAYER,
    // stk地形数据
    TERRAIN_STK
} from '../src/components/map/src/2d/layer'
export const olconfig = {
    // 沁水县中心点
    centerX: 112.176,
    centerY: 35.689,
    // 显示模式
    DEFAULT_RENDER: "2d",
    zoomLevel: 15,
    projection: 'EPSG:4326',
    Layers: {
        "shiliang": {
            url: constants.SHILIANG_MAP_URL,
            name: '矢量图',
            type: TILE_SUPERMAP_REST,
            show: true
        },
        'yingxiang1': {
            url: constants.YINGXIANG_MAP_URL1,
            name: '影像图1',
            type: TILE_SUPERMAP_REST,
            show: false
        },
        "yingxiang": {
            url: constants.YINGXIANG_MAP_URL,
            name: '影像图',
            type: TILE_SUPERMAP_REST,
            show: false
        },
        // "osgb": {
        //     url: constants.OSGB_SCENE_URL,
        //     name: '倾斜摄影',
        //     type: S3M_TILES_LAYER,
        //     show: true
        // },
        // "osgb1": {
        //     url: constants.OSGB_SCENE_WATER_URL,
        //     name: '三维湖面',
        //     type: S3M_TILES_LAYER,
        //     show: true
        // },
        // "street": {
        //     url: constants.STREET_MAP_NAME,
        //     name: '专题图',
        //     type: TILE_SUPERMAP_REST,
        //     show: false,
        //     transparent: true
        // },
        // "building": {
        //     url: constants.HOUSE_MAP_NAME,
        //     name: '专题图',
        //     type: TILE_SUPERMAP_REST,
        //     show: false
        // },
        //,
        // "terrain": {
        //     url: '//assets.agi.com/stk-terrain/world',
        //     name: '地形数据',
        //     type: TERRAIN_STK,
        //     show: true
        // }
    }
}
