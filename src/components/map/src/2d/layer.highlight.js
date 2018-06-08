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
    Config,
    MAP,
    SCENE
} from '../../config/Config';
import {
    queryBySql
} from './supermap/map.service'
import uuid from 'node-uuid';
import * as _ from 'lodash';
import {
    olStyle
} from '../utils/olStyle';
import {
    Observable,
    Subject
} from 'rxjs'
const snaf = Symbol('snaf');
/**
 * 图层高亮类
 */
export class LayerHighLight {

    /**
     * 构造函数
     * @param {init} ol 自定义组件this
     * @param {*} olcusium 地图对象
     */
    constructor(ol, olcusium) {
        this.ol = ol;
        this.olcusium = olcusium;
        this.tooltipElement = null;
        // 绑定鼠标事件
        this.bindMouseListener();
        // 设置高亮层
        this.setFeatureOverlay();
        // 设置提示层
        this.setTooltipOverlay();
        this.middleware = [this.setStyle];
        this.compose = null;
        // 用来存储已经添加到地图中的feature对象
        this.featureArr = {};
    }
    // 获得地图鼠标监听事件
    bindMouseListener() {
        let self = this;
        this.olcusium.on('pointermove', (evt) => {
            if (evt.dragging) {
                return;
            }
            if (this.tooltipElement) {
                this.Tooltip.setPosition(evt.coordinate);
            }
        });
        this.ol.listener.mouseMovePixelPos.subscribe(pixel => {
            if (self.ol.olcusium3.getEnabled())
                return;
            this.highLightDisplayFeatureByOver(pixel);
        });
        this.ol.listener.mouseClickPixelPos$.subscribe(pixel => {
            if (self.ol.olcusium3.getEnabled())
                return;
            this.highLightDisplayFeatureByClick(pixel)
        });
    }

    // 高亮 鼠标移入的feature
    // openalyer同一时间只有一个可以高亮的层
    highLightDisplayFeatureByOver(pixel) {
        let key;
        var feature = this.olcusium.forEachFeatureAtPixel(pixel, (feature, layer) => {
            key = this[snaf](layer);
            if (!key) {
                return 'skip';
            }
            return feature;
        }, {
            layerFilter: (layer) => {
                return layer == this.ol.layer.layerMap.get('house');
            }
        });
        // 判断是否匹配到任意一个feature，否则清空所有图层
        if (!feature) {
            _.map(this.featureArr, (value, index) => {
                _.map(value, (value1, index1) => {
                    this.removeFeature(value1);
                });
            });
            this.featureArr = {};
            this.tooltipElement.classList.add('hidden-overlay');
            return;
        }
        if (feature === 'skip') {
            this.tooltipElement.classList.add('hidden-overlay');
            return;
        }
        this.tooltipElement.innerHTML =
            "<div style='overflow:hidden'>" +
            "<div>" + feature.getProperties().House_Name + "</div>" +
            "</div>";
        this.tooltipElement.classList.remove('hidden-overlay');
        if (_.isArray(this.featureArr[key]) && this.featureArr[key].length) {
            // console.log(feature.getProperties().House_Name + "---" + this.featureArr[key][0].getProperties().House_Name);
            // console.log(_.indexOf(this.featureArr[key], feature));
            // console.log(feature && !_.indexOf(this.featureArr[key], feature));
            if (feature && _.indexOf(this.featureArr[key], feature) === -1) {
                if (this.compose) {
                    let arr = this.featureArr[key];
                    _.map(arr, (value, index) => {
                        if (feature != value) {
                            this.removeFeature(value);
                        }
                    });
                    this.featureArr[key] = [feature];
                    // 当前添加的高亮层对象
                    let featureResponse = new FeatureResponse(this, feature);
                    this.compose(featureResponse);
                }
            } else {

            }
        } else {
            if (feature) {
                this.featureArr[key] = [feature];
                let featureResponse = new FeatureResponse(this, feature);
                this.compose(featureResponse);
            }
        }
    }

    removeFeature(feature) {
        if (feature)
            this.featureOverlay.getSource().removeFeature(feature);
    }

    // 高亮点击的feature
    highLightDisplayFeatureByClick(pixel) {
        var feature = this.olcusium.forEachFeatureAtPixel(pixel, (feature, layer) => {
            if (!this[snaf](layer)) {
                return;
            }
        });
    }

    // 是否属于事件监听图层(未完成名称重组，避免重名)
    [snaf](layer) {
        let bool = false;
        for (let f of this.ol.layer.layerMap) {
            if (f[1] == layer) {
                bool = f[0]
            }
        }
        return bool;
    }

    setFeatureOverlay() {
        this.featureOverlay = new ol.layer.Vector({
            source: new ol.source.Vector(),
            map: this.olcusium
        });
    }
    setTooltipOverlay() {
        if (this.tooltipElement) {
            this.tooltipElement.parentNode.removeChild(this.measureTooltipElement);
        }

        this.tooltipElement = document.createElement('div');
        this.tooltipElement.className = 'tooltip tooltip-overlay';
        this.Tooltip = new ol.Overlay({
            element: this.tooltipElement,
            autoPan: true,
            offset: [15, 10],
            autoPanAnimation: {
                duration: 250
            }
        });
        this.tooltipElement.classList.add('hidden-overlay');
        this.olcusium.addOverlay(this.Tooltip);
    }

    // 设置默认高亮样式（多边形样式）
    setStyle(evt, next) {
        let cloneFeature = _.clone(evt.feature);
        cloneFeature.setStyle([olStyle.highlightStyle]);
        evt.feature = cloneFeature;
        next();
    }

    // 渲染
    render(evt, next) {
        evt.self.featureOverlay.getSource().addFeature(evt.feature);
        next();
    }

    // 配置中间键
    // 传入方法
    // 这个方法建议只调用一次，如果是对同一个图层检视，可以绑定多个事件监听，但建议将use后的对象保存起来，避免内存浪费
    use(arr) {
        let self = this;
        if (!_.isArray(arr)) {
            arr = [];
        }
        this.middleware = _.concat(this.middleware, arr, [this.render]);
        this.compose = compose(this.middleware);
        /**
         * 需要监听的参数
         * mouseover，mouseclick
         * @param {*} type 需要监听的参数
         * @param {*} fn 回调方法
         */
        let callback = (fn, pixel) => {
            this.olcusium.forEachFeatureAtPixel(pixel, (feature, layer) => {
                if (!this[snaf](layer)) {
                    return;
                }
                fn.call(self, feature);
            });
        }
        return (type, fn) => {
            if (self.render === SCENE)
                return;
            if (type === 'mouseover') {
                self.ol.listener.mouseMovePixelPos.subscribe(pixel => {
                    callback(fn, pixel);
                });
            } else if (type === 'mouseclick') {
                self.ol.listener.mouseClickPixelPos$.subscribe(pixel => {
                    callback(fn, pixel);
                });
            }
            return self;
        }
    }
}

export class FeatureResponse {
    constructor(self, feature) {
        // 指向LayerHighLight对象，供调用
        this.self = self;
        // 用来存放原始数据
        this.feature = feature;
    }

}
export * from './supermap/map.service';
