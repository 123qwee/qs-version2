// 引入Observable对象
import {
    VistualEmit
} from "./vistual.emit.js";
import {
    olStyle
} from '../../../components/map/src/utils/olStyle';
import {
    queryBysqlGeometry
} from '../../../components/map/src/2d/supermap/map.service';
import {
    setFeaturesByPoint
} from '../../../components/map/src/utils/compose.feature.bypoint';
import {
    GridService,
    PeopleService
} from './services/index';
import {
    config
} from "../config/olconfig";
import {
    parseSql
} from './common/parse.sql';

let select_feature = null;
/**
 * 设置地图模式
 * @param {*} map 地图对象
 * @param {*} type 类型（2d，3d）
 */
export function setEnabletype(map, type) {
    if (type === '2d') {
        clear(map);
        map.olcusium3.setEnabled(false);
    } else if (type === '3d') {
        clear(map);
        map.olcusium3.setEnabled(true);
    }
}

/**
 * 缩小放大地图
 * @param {*} map 地图对象
 * @param {*} type 类型（in，out）
 */
export function setMapZoom(map, type) {
    if (type === 'in') {
        map.operation.zoomIn();
    } else if (type === 'out') {
        map.operation.zoomOut();
    }
}

/**
 * 设置图层状态（目前实现显影控制）
 * @param {*} map 地图对象
 * @param {*} json 图层显影配置
 */
export function setLayerVisible(map, json) {
    map.operation.setLayersVisible(json);
}

/**
 * 地图全副
 * @param {*} map 地图对象
 */
export function setFullExtent(maps) {
    maps.operation.setFullExtent();
}

/**
 * 设置图层可高亮
 * @param {*} map 地图对象
 */
export function setLayerLight(self, map) {
    /**
     * 调用简单做个说明
     * evt包含两个参数self和feature
     * 如果要对feature做任何操作，按照顺序注入function即可
     * 4-8日更新动态更新渲染颜色
     */
    map.layer.layerHighLight.use([(evt, next) => {
        evt.feature.setStyle(olStyle.gridHighStyle);
        next();
    }])("mouseclick", (feature) => {
        if (feature.name == "GEO_GRID@grid") {
            feature.setStyle(olStyle.highlightStyle);
            clearFeatures();
            select_feature = feature;
            GridService.getGridByID(feature.getProperties().PERIMETER_1, data => {
                self.$refs["$vistualComponent"].pushSelect({
                    type: '网格',
                    value: data.name,
                    address: data.name
                });

                VistualEmit.emit("change", {
                    keyword: data.name,
                    type: '网格',
                    region: data.gridCode,
                });

            });
        }
        /**
         * 2018-4-11
         * 增加判定条件
         * Type1 倒数第六位等于0 为楼房
         * Type2 倒数第六位大于0 为平房
         */
        else if (feature.name == "GEO_BUILD@grid") {
            // 网格编码
            let grid_code = feature.getProperties().PERIMETER_1;
            if ((grid_code.substr(15, 1)) === '0') {
                PeopleService.getHouseById("人房", grid_code, data => {
                    if (data.data === null) {
                        VistualEmit.emit("popup", "此房屋暂无数据!");
                        return;
                    }
                    self.$refs["$vistualComponent"].pushSelect({
                        type: '人房',
                        value: data.data.house.housesName,
                        address: data.data.house.communityName,
                        code: data.data.house.gridCode
                    });
                });
            } else {
                let house_code = grid_code.substring(grid_code.length, grid_code.length - 6);
                let house_type = "庭院房";
                if (house_code.split("")[0] + house_code.split("")[1] !== "00") {
                    house_type = "单元房"
                }
                PeopleService.getHouseLayers("人房", grid_code, house_code.substr(2, 4), house_type, data => {
                    if (data.data === null) {
                        VistualEmit.emit("popup", "此房屋暂无数据!");
                        return;
                    }
                    self.$refs["$vistualComponent"].pushSelect({
                        type: '人房',
                        value: data.data.house.housesName,
                        address: data.data.house.communityName,
                        code: data.data.house.gridCode,
                        id: grid_code
                    });
                });
            }
        }
    });
}

/**
 * 设置图层颜色
 * @param {*} map 地图对象
 * @param {*} tag 图层name参数对象
 * @param {*} color 要渲染的颜色
 */
export function setlayerStyle(self, map, tag, color) {
    let layer = map.layer.getLayerByTag(tag);
    if (color === 'red') {
        map.operation.setLayersVisible({
            "house": {
                show: true
            }
        });
        layer.setStyle([olStyle.gridStyle_RED]);
    } else if (color === 'yellow') {
        map.operation.setLayersVisible({
            "house": {
                show: true
            }
        });
        layer.setStyle([map.c.Layers.house.style]);
    } else if (color === 'none') {
        map.operation.setLayersVisible({
            "house": {
                show: false
            }
        });
    }
}

let markerLayer = null;
let markerLayer1 = null;

/**
 * 删除图钉点
 */
export function removeMarker() {
    if (markerLayer) {
        markerLayer.destroy();
    }
    if (markerLayer1) {
        markerLayer1.destroy();
    }
}
/**
 * 添加marker到地图中
 */
export async function addMarker(self, map, ids, fn) {
    let param = {};
    if (self == '人房') {
        param = config.house;
        // 三维选中相应楼房
        let layer = map.layer.getLayerByTag("osgb");
        // 根据ids查询三维对象
        queryBysqlGeometry(param.url, param.name, parseSql(ids, param.key)).then((val) => {
            let recordset = val.result.recordsets;
            let ids3d = [];
            if (recordset[0].features.features.length !== 0) {
                _.map(recordset, (value) => {
                    ids3d.push(value.features.features[0].properties["wg_code"]);
                });
            }
            if (ids3d.length > 0) {
                layer && layer.setSelection(ids3d);
            }
        });
    } else if (self == '学校') {
        param = config.school;
    } else if (self == '工商') {
        param = config.bussiness;
    } else if (self == '组织') {
        param = config.organize;
    } else if (self == '党务') {
        param = config.partyWork;
    };
    let markerOper = await map.layer.markerLayer.use([map.layer.markerLayer.queryBySupermap(param.url, param.name, ids, param.queryType, param.key)]);
    markerLayer = markerOper({
        "mouseclick": (data) => {
            // map.overlay.add({

            // });
            // alert(data);
        },
        "afterInit": (val) => {
            if (!fn)
                return;
            if (_.isFunction(fn))
                fn(val);
        }
    });
    return markerLayer;
}

/**
 * 添加marker到地图中
 * @param {*} map 地图对象
 * @param {*} pts 点集合
 * @param {*} fn 回调
 */
export async function addMarkerByLonLat(map, pts, fn) {
    let markerOper = await map.layer.markerLayer.use([setFeaturesByPoint(pts)]);
    markerLayer1 = markerOper({
        "mouseclick": (data) => {
            // map.overlay.add({

            // });
            // alert(data);
        },
        "afterInit": (val) => {
            if (!fn)
                return;
            if (_.isFunction(fn))
                fn(val);
        }
    });
    return markerLayer1;
}

/**
 * 激活测距
 * @param {*} self map.vue
 * @param {*} map 地图对象
 */
export function activeMeature(self, map) {
    if (!map.olcusium3.getEnabled())
        map.meature.activeMeasureLength();
    else
        map.meature3d.activeMeature();
}

/**
 * 激活测面积
 * @param {*} self map.vue
 * @param {*} map 地图对象
 */
export function activeArea(self, map) {
    if (!map.olcusium3.getEnabled())
        map.meature.activeMeasureArea();
    else
        map.meature3d.activeArea();
}

/**
 * 清除
 */
export function clear(map) {
    if (!map.olcusium3.getEnabled())
        map.meature.deactiveMeasure();
    else
        map.meature3d.deactiveAll();
}

/**
 * 清楚添加的feature样式
 */
export function clearFeatures() {
    if (select_feature) select_feature.setStyle(olStyle.gridStyle);
}

// 监听三维选择状态
export function bindSceneSelect(self, map) {
    map.global.subscribe("feature3dSelect", (feature) => {
        if (feature.result.recordsets.length === 0) return;
        if (feature.result.recordsets[0].features.features.length === 0) return;
        let _feature = feature.result.recordsets[0].features.features[0];
        // 网格编码
        let grid_code = _feature.properties.PERIMETER_1;
        if ((grid_code.substr(15, 1)) === '0') {
            PeopleService.getHouseById("人房", grid_code, data => {
                if (data.data === null) {
                    VistualEmit.emit("popup", "此房屋暂无数据!");
                    return;
                }
                self.$refs["$vistualComponent"].pushSelect({
                    type: '人房',
                    value: data.data.house.housesName,
                    address: data.data.house.communityName,
                    code: data.data.house.gridCode
                });
            });
        } else {
            let house_code = grid_code.substring(grid_code.length, grid_code.length - 6);
            let house_type = "庭院房";
            if (house_code.split("")[0] + house_code.split("")[1] !== "00") {
                house_type = "单元房"
            }
            PeopleService.getHouseLayers("人房", grid_code, house_code.substr(2, 4), house_type, data => {
                if (data.data === null) {
                    VistualEmit.emit("popup", "此房屋暂无数据!");
                    return;
                }
                self.$refs["$vistualComponent"].pushSelect({
                    type: '人房',
                    value: data.data.house.housesName,
                    address: data.data.house.communityName,
                    code: data.data.house.gridCode,
                    id: grid_code
                });
            });
        }
    });
}
