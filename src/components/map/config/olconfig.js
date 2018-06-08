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
} from '../src/2d/layer'
import _ from 'lodash';
import {
    olStyle
} from '../src/utils/olStyle'

// 默认配置文件，初始化等操作都应当复原此状态
// es6默认不支持乱序参数传入，不支持过量参数传入
export let config = {
    "grid1": {
        url: constants.GRID_MAP_URL,
        name: 'GEO_TOWN@grid',
        type: OL_VECTOR_LAYER,
        show: false,
        style: olStyle.gridStyle
    },
    "grid2": {
        url: constants.GRID_MAP_URL,
        name: 'GEO_COMMUNITY@grid',
        type: OL_VECTOR_LAYER,
        show: false,
        style: olStyle.gridStyle
    },
    "grid3": {
        url: constants.GRID_MAP_URL,
        name: 'GEO_GRID@grid',
        type: OL_VECTOR_LAYER,
        show: false,
        style: olStyle.gridStyle
    },
}

let layersConfig = _.extend({}, _.pick(olconfig.Layers, ["shiliang", 'yingxiang1', "yingxiang"]), config);

const CONFIG=_.cloneDeep(olconfig);
CONFIG.Layers = layersConfig;

export {
    CONFIG
};
