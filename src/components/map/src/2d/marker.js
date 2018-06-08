/**
 * 中间件处理函数
 * 为了提供更高的适配性
 * 可以传入一个或多个中间处理函数用来处理数据和对象
 * 实现的函数需要具备两个变量
 * ctx,next
 */
import {
    compose
} from '../utils/compose';
import {
    queryBysqlGeometry
} from './supermap/map.service';
import {
    getFeature,
    POLYGON_GEOMETRY
} from './feature';
import {
    olStyle
} from '../utils/olStyle'
import uuid from 'node-uuid';
import {
    Subject
} from 'rxjs/Subject';
import * as _ from 'lodash';

export class Marker {
    /**
     * 构造函数
     * @param {init} ol 自定义组件this
     * @param {*} olcusium 地图对象
     */
    constructor(ol, olcusium) {
        this.ol = ol;
        this.olcusium = olcusium;
        this.middleware = [this.setStyle];
        this.compose = null;
    }

    setMarkerOverlay(uuid) {
        let markerOverlay = new ol.layer.Vector({
            name: uuid,
            source: new ol.source.Vector()
        });
        this.olcusium.addLayer(markerOverlay);
        //let markerOverlay = this.ol.vectorSyncLayer
        return markerOverlay;
    }

    // 默认的初始化方法
    defaultInit(evt, next) {
        // 获得当前作用域
        let self = evt.self;
        let _uuid = uuid.v1();
        evt.setUuid(_uuid);
        let layer = self.setMarkerOverlay(_uuid);
        evt.setLayer(layer);
        next();
    }

    // 获得markers对象
    getMakers(markers) {
        return _.map(markers, (marker) => {
            return this.getMarker(marker)
        })
    }

    // 获得marker对象
    getMarker(marker) {
        const _marker = new ol.Feature({
            geometry: new ol.geom.Point([marker.smx, marker.smy, marker.smz])
        });
        return _marker;
    }

    setStyle(evt, next) {
        if (evt.features) {
            _.map(evt.features, (feature, index) => {
                feature.setStyle([olStyle.MarkerDefaultStyles]);
            });
        }
        next();
    }

    // 渲染
    render(evt, next) {
        if (evt.features) {
            evt.addFeatures(evt.features);
        }
        evt.getObservable().next({
            type: 'afterInit',
            val: evt
        });
        next();
    }

    // 适配一个超图的rest查询
    queryBySupermap(url, layers, ids, type, key) {
        if (!_.isArray(ids)) return '';
        let idsStr = '';
        idsStr += (key + " in (");
        let sqlstr1 = '';
        _.map(ids, (value, index) => {
            sqlstr1 += ("'" + value + "'");
            if (index < ids.length - 1) sqlstr1 += ","
        });

        idsStr = idsStr + sqlstr1 + ")"
        return async (evt, next) => {
            let features = await queryBysqlGeometry(url, layers, idsStr);
            let geometrys = features.result.recordsets[0].features.features;
            let markers = [];
            if (features.result.currentCount > 0) {
                for (let i = 0; i < geometrys.length; i++) {
                    if (type === "geometry") {
                        let point = getFeature(POLYGON_GEOMETRY, geometrys[i].geometry.coordinates[0][0]).getInteriorPoint().getCoordinates();
                        markers.push({
                            smx: point[0],
                            smy: point[1],
                            smz: 70
                        });
                    } else if (type === "point") {
                        markers.push({
                            smx: geometrys[i].geometry.coordinates[0],
                            smy: geometrys[i].geometry.coordinates[1],
                            smz: 70
                        });
                    }
                }
            }
            evt.setFeatures(evt.self.getMakers(markers));
            next();
        }
    }

    /**
     * 添加marker
     * 每次绑定动态添加一个marker图层，支持多次调用
     * @param {*} arrF 前置方法（不能为空）用来添加要素
     * @param {*} arrE 后置方法 (可以为空)
     */
    async use(arrF, arrE) {
        let self = this;
        if (!_.isArray(arrF)) {
            arrF = [];
        }
        if (!_.isArray(arrE)) {
            arrE = [];
        }
        // 生成当前环境的中间件
        // 步骤 添加图层=》添加要素=》设置默认样式=》用户自定义操作=》渲染
        let middleware = _.concat([this.defaultInit], arrF, this.middleware, arrE, [this.render]);
        let _compose = compose(middleware);

        // 因为_compose并不完全为同步方法，初始化一个对象用来保存各种状态
        let finalObservable = new Subject();
        let markerResponse = new MarkerResponse(this);
        markerResponse.setObservable(finalObservable);
        // 开始执行方法流
        var evt = await _compose(markerResponse);
        // 必须阻塞才会获得控制权，才能取到动态生成的uuid
        let _uuid = markerResponse.getUuid();
        /**
         * 需要监听的参数
         * mouseover，mouseclick
         * @param {*} type 需要监听的参数
         * @param {*} fn 回调方法
         */
        let callback = (fn, pixel) => {
            this.olcusium.forEachFeatureAtPixel(pixel, (feature, layer) => {
                fn.call(self, feature);
            }, {
                layerFilter: (layer) => {
                    return layer.get('name') === _uuid;
                }
            });
        }

        /**
         * 绑定事件和状态
         * @param {*} type 状态
         * @param {*} fn 回调函数
         */
        return (type, fn) => {
            let observe = [];
            /**
             * 类JQUERY式写法，支持两个变量的事件传入或者传入json类的事件
             */
            if (_.isObject(type)) {
                observe = self.bindListener.call(self, type, callback, markerResponse);
            } else {
                let json = {};
                json[type] = fn;
                observe = self.bindListener.call(self, json, callback, markerResponse);
            }
            return new markerObj(self, observe, markerResponse);
        };
    }
    /**
     * 绑定流程中用到的事件
     * @param {*} type 事件绑定
     * @param {*} callback 回调
     * @param {*} markerResponse 作用域状态类
     */
    bindListener(type, callback, markerResponse) {
        let observe = [];
        if (type['mouseclick']) {
            let _observe = this.ol.listener.mouseClickPixelPos$.subscribe(pixel => {
                callback(type['mouseclick'], pixel);
            });
            observe.push(_observe);
        }
        let _observe = markerResponse.getObservable().subscribe(val => {
            if (type[val.type]) {
                type[val.type].call(this, val);
            }
        });
        observe.push(_observe);
        return observe;
    }
}

class markerObj {
    constructor(self, observe, evt) {
        this.self = self;
        this.observe = observe;
        this.evt = evt;
    }

    destroy() {
        this.unListener();
        this.unLayer();
    }

    unListener() {
        // 释放事件绑定
        if (_.isArray(this.observe)) {
            _.forEach((val) => {
                val.unsubscribe();
            });
        } else {
            this.observe.unsubscribe();
        }
        // 释放生命周期观察者对象
        this.evt.getObservable().unsubscribe();
    }

    unLayer() {
        this.self.olcusium.removeLayer(this.evt.getLayer());
    }
}

export class MarkerResponse {
    features = [];
    constructor(self, features, uuid, layer) {
        // 指向this对象，供调用
        this.self = self;
        // 用来存放原始数据
        if (!features) {
            features = [];
        }
        this.setFeatures(features);
        this.uuid = uuid;
        this.layer = layer
    }

    // 这个状态用来发射声明周期当中各种状态
    setObservable(_observable) {
        this.observable = _observable;
    }
    getObservable() {
        return this.observable;
    }

    setLayer(layer) {
        this.layer = layer;
    }

    getLayer() {
        return this.layer;
    }

    getUuid() {
        return this.uuid;
    }
    setUuid(uuid) {
        this.uuid = uuid;
    }

    setFeatures(features) {
        this.features = features;
    }

    addFeature(feature) {
        this.getLayer().getSource().addFeature(feature);
    }

    addFeatures(features) {
        this.getLayer().getSource().addFeatures(features);
    }

    clearFeatures(_features) {
        this.features = new ol.source.Vector();
    }

    removeFeature(feature) {
        this.features.clear();
    }

}
