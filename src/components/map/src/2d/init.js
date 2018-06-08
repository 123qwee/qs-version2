require('../../supermap/index');
import {
    Config,
    MAP,
    SCENE
} from '../../config/Config';

import {
    Measure,
    Layer,
    Operation,
    Listener,
    getFeature,
    Marker,
    Overlay,
    CIRCLE_GEOMETRY,
    POINT_GEOMETRY
} from './index';

import {
    Measure3D
} from '../3d/index'

import {
    sceneSetConfig,
    OsgbSelect
} from '../3d/index';

import {
    GlobalState
} from '../utils/global.state';

import sysConfig from '#/constants';


import _ from 'lodash';

import {
    RestObj
} from '../utils/layerRestObj'

import {
    Observable,
    Subject
} from 'rxjs'
// 是否具备焦点
let _focus = new Subject();
export class Init {
    static getVersion() {
        return Config.getVersion();
    }

    /**
     * 构建函数
     * @param {*} dom 要渲染的元素
     * @param {*} config ol相关配置
     */
    constructor(dom, config, ...c) {
        this.dom = dom;
        // 初始化类
        this.c = c[0];
        // 地图状态机
        this.global = new GlobalState();
        this.olcusium = this.getol2d();
        this.view = this.olcusium.getView();
        // 基础操作组件
        this.operation = new Operation(this, this.olcusium, this.view);
        this.olcusium3 = this.getol3d();
        // 测量组件
        this.meature = new Measure(this, this.olcusium, this.view, this.olcusium3);
        this.meature3d = new Measure3D(this, this.olcusium, this.view, this.olcusium3);
        // 监听组件
        this.listener = new Listener(this, this.olcusium, this.olcusium3);
        this.olcusium3Scene = this.olcusium3.getCesiumScene();
        this.camera = this.olcusium3.getCamera();
        // 图层组件
        this.layer = new Layer(this, this.olcusium, this.olcusium3, this.olcusium3Scene);
        // 覆盖物组件
        this.overlay = new Overlay(this, this.olcusium, this.olcusium3);
        // 要添加的图层
        this.layers = config;
        // 二维地图对象
        this.map = null;
        // 当前的渲染模式
        this.render;
        this.olrun();
        // setTimeout(() => {
        //     let feature = getFeature(CIRCLE_GEOMETRY, {
        //         x: this.c.centerX,
        //         y: this.c.centerY,
        //         r: 0.01
        //     });
        //     //feature.getGeometry().set('altitudeMode', 'clampToGround');
        //     this.vectorLayer2.getSource().addFeature(feature);
        // }, 2000);
    }

    // ol-cesium初始化方法
    olrun() {
        _.map(this.layers, (value, index) => {
            this.layer.addLayer(value
                /** {type} RestObj */
            );
        });
        let render;
        // 判定用户传入的显示模式是否为空，为空的话
        if (this.c.DEFAULT_RENDER) {
            if (this.c.DEFAULT_RENDER === '3d') {
                this.render = SCENE;
            } else if (this.c.DEFAULT_RENDER === '2d') {
                this.render = MAP;
            } else {
                // 设置不正确默认显示MAP
                this.render = MAP;
            }
        } else {
            this.render = Config.DEFAULT_RENDER
        }
        // 判断地图默认显示的模式
        if (this.render === MAP)
            this.olcusium3.setEnabled(false);
        else if (this.render === SCENE) {
            this.olcusium3.setEnabled(true);
            // 暂时不支持的特性
            sceneSetConfig(this.olcusium3Scene);
        }
    }

    /**
     * 初始化二维
     */
    getol2d() {
        // 判断类型
        _.isInteger(this.c.zoomLevel) || (this.c.zoomLevel = 11);
        // 这里初始化一个图层，作为二三维同步图层
        // const vectorSource = new ol.source.Vector({});
        // this.vectorSyncLayer = new ol.layer.Vector({
        //     zIndex: 999,
        //     source: vectorSource
        // });
        let map = new ol.Map({
            renderer: 'canvas',
            controls: ol.control.defaults({
                attribution: false,
                zoom: false,
                rotate: true
            }),
            view: new ol.View({
                center: [this.c.centerX, this.c.centerY],
                zoom: this.c.zoomLevel,
                projection: this.c.projection
            }),
            target: this.dom
            // layers: [this.vectorSyncLayer]
        });
        map.loadTilesWhileAnimating = true;
        return map;
    }

    /**
     * 初始化三维
     */
    getol3d() {
        const ol3d = new olcs.OLCesium({
            map: this.olcusium,
            sceneOptions: {
                scene3DOnly: true,
                shadows: false,
                terrainShadows: Cesium.ShadowMode.DISABLED,
                navigation: false
            }
        });
        // 初始化三维选择器
        this.select3d = new OsgbSelect(this, ol3d);
        ol3d.enableAutoRenderLoop();
        return ol3d;
    }

    /**
     * 是否被激活（获得焦点）
     */
    makeFocus(args) {
        _focus.next(args);
    }

    /**
     * 获得_focus对象（每一次地图组件获得焦点都会触发一次_focus的next方法）
     */
    getFocus() {
        return _focus;
    }

    /**
     * 销毁方法
     */
    destroy() {

    }
}
