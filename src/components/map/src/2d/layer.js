import {
    pushS3MTilesLayer,
    pushSTKLayer,
    S3M_TILES_LAYER,
    TERRAIN_STK
} from '../3d/index';
import _ from 'lodash';
import {
    RestObj
} from '../utils/layerRestObj';
import {
    GlobalState
} from '../utils/global.state';
import {
    queryBySql
} from './supermap/map.service';
import {
    LayerHighLight,
    Marker
} from './index';
import {
    olStyle
} from '../utils/olStyle'

export class Layer {

    layerMap = new Map();
    /**
     * 初始化构建地图对象
     * @param {*} ol 自定义组件this
     * @param {*} olcusium 地图对象
     * @param {*} olcusium3 场景对象
     * @param {*} olcusium3Scene 场景
     */
    constructor(ol, olcusium, olcusium3, olcusium3Scene) {
        this.ol = ol;
        this.olcusium = olcusium;
        this.olcusium3 = olcusium3;
        this.olcusium3Scene = olcusium3Scene;
        this.layerHighLight = new LayerHighLight(this.ol, this.olcusium);
        this.markerLayer = new Marker(this.ol, this.olcusium);

        // 绑定监听事件
        this.ol.global.subscribe('layersChanged', (e) => {
            _.map(e, (value, index) => {
                if (this.layerMap.get(index))
                    this.layerMap.get(index).setVisible(value.show);
            });
        });
    }

    /**
     *
     * @param {RestObj} restObj 图层配置对象
     */
    addLayer(restObj) {
        let layer = null;
        switch (restObj.type) {
            case TILE_SUPERMAP_REST:
                layer = this.getTile(restObj.url, restObj);
                this._addLayer(layer);
                if (!restObj.isVisible) {
                    layer.setVisible(false);
                }
                this.layerMap.set(restObj.index, layer);
                break;
            case S3M_TILES_LAYER:
                pushS3MTilesLayer(this.olcusium3, this.olcusium3Scene, restObj.url, restObj, this.layerMap);
                break;
            case TERRAIN_STK:
                layer = pushSTKLayer(this.olcusium3Scene, restObj.url, restObj);
                break;
            case OL_VECTOR_LAYER:
                layer = this.getVector(restObj.url, restObj);
                this._addLayer(layer);
                if (!restObj.isVisible) {
                    layer.setVisible(false);
                }
                this.layerMap.set(restObj.index, layer);
                break;
        }
    }

    /**
     * 获得SuperMap iServer TileImage图层源
     * @param {*} TileSupermapRestUrl 地址{http://117.34.95.9:58092/iserver/services/map-map/rest/maps/DOM}
     */
    getTile(TileSupermapRestUrl, ...param) {
        let layer = new ol.layer.Tile({
            source: new ol.source.TileSuperMapRest({
                url: TileSupermapRestUrl,
                wrapX: true,
                transparent: true,
                crossOrigin: 'anonymous'
            }),
            projection: 'EPSG:4326'
        });
        return layer;
    }

    /**
     * 初始化ol.layer.vector图层
     * @param {*} TileSupermapRestUrl 地址{http://117.34.95.9:58092/iserver/services/map-map/rest/maps/DOM}
     * @param {*} param 参数
     */
    getVector(TileSupermapRestUrl, ...param) {
        let vector;
        if (TileSupermapRestUrl && TileSupermapRestUrl !== "") {
            vector = queryBySql(TileSupermapRestUrl, param[0].name, '1=1')
        } else {
            let source = new ol.source.Vector({
                wrapX: false
            });
            vector = new ol.layer.Vector({
                name: param[0].name,
                source: source
            });
        }
        let style;
        // 判断是否有样式参数
        if (!param[0].style)
            style = olStyle.gridStyle;
        else
            style = param[0].style;
        vector.setStyle(style);
        return vector;
    }

    getLayerByTag(tag) {
        return this.layerMap.get(tag);
    }

    _addLayer(layer) {
        this.olcusium.addLayer(layer);
    }
}

// 图层类型枚举
export const TILE_SUPERMAP_REST = Symbol('TILE_SUPERMAP_REST');
// 二三维vector图层
export const OL_VECTOR_LAYER = Symbol('OL_VECTOR_LAYER');
export {
    S3M_TILES_LAYER,
    TERRAIN_STK
}
from '../3d/layer3d';
