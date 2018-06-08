/**
 * 配置常量
 */
import constants from '#/constants';
import {
    olconfig
}
from '#/ol'
import {
    // 超图rest图层
    TILE_SUPERMAP_REST,
    // 超图三维图层
    S3M_TILES_LAYER,
    // stk地形数据
    TERRAIN_STK,
    // vector图层
    OL_VECTOR_LAYER
} from '@/components/map/src/2d/layer'
import _ from 'lodash';
import {
    olStyle
} from '@/components/map/src/utils/olStyle'

// 默认配置文件，初始化等操作都应当复原此状态
// es6默认不支持乱序参数传入，不支持过量参数传入
export let config = {
    "grid1": {
        url: constants.GRID_MAP_URL,
        name: 'GEO_TOWN@grid',
        type: OL_VECTOR_LAYER,
        show: false,
        style: olStyle.gridStyle1
    },
    "grid2": {
        url: constants.GRID_MAP_URL,
        name: 'GEO_COMMUNITY@grid',
        type: OL_VECTOR_LAYER,
        show: false,
        style: olStyle.gridStyle1
    },
    "grid3": {
        url: constants.GRID_MAP_URL,
        name: 'GEO_GRID@grid',
        type: OL_VECTOR_LAYER,
        show: false,
        style: olStyle.gridStyle
    },
    // "house": {
    //     url: constants.GRID_MAP_URL,
    //     name: 'GEO_BUILD@grid',
    //     type: OL_VECTOR_LAYER,
    //     show: true,
    //     style: olStyle.houseStyle,
    //     key: 'PERIMETER_1',
    //     queryType: 'geometry'
    // },
    // "school": {
    //     url: constants.GRID_MAP_URL,
    //     name: 'GEO_SCHOOL@grid',
    //     type: OL_VECTOR_LAYER,
    //     show: true,
    //     style: olStyle.gridStyle,
    //     key: 'USERID_1',
    //     queryType: 'point'
    // },
    // "bussiness": {
    //     url: constants.GRID_MAP_URL,
    //     name: 'GEO_BUSSINESS@grid',
    //     type: OL_VECTOR_LAYER,
    //     show: true,
    //     style: olStyle.gridStyle,
    //     key: 'GeoPosition_1',
    //     queryType: 'point'
    // },
    // "organize": {
    //     url: constants.GRID_MAP_URL,
    //     name: 'GEO_SOCIALORG@grid',
    //     type: OL_VECTOR_LAYER,
    //     show: true,
    //     style: olStyle.gridStyle,
    //     key: 'GeoPosition_1',
    //     queryType: 'point',
    // },
    // "partyWork": {
    //     url: constants.GRID_MAP_URL,
    //     name: 'GEO_PARTY@grid',
    //     type: OL_VECTOR_LAYER,
    //     show: true,
    //     style: olStyle.gridStyle,
    //     key: 'GeoPosition_1',
    //     queryType: 'point',
    // },
    // "street":{
    //     url: constants.STREET_MAP_NAME,
    //     name: 'highRoadL@qs_street',
    //     type: OL_VECTOR_LAYER,
    //     show: false,
    //     style: olStyle.gridStyle
    // }
}

let layersConfig = _.extend({}, olconfig.Layers, config);
const CONFIG = _.cloneDeep(olconfig);
CONFIG.Layers = layersConfig;

export {
    CONFIG
};
