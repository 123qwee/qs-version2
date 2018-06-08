let olDraw = ol.interaction.Draw;
let olOverlay = ol.Overlay;
let olObservable = ol.Observable;

let olSphere = ol.Sphere;
let olGeoLineString = ol.geom.LineString;
let olGeoPolygon = ol.geom.Polygon;
let olProj = ol.proj;

let olStyle = ol.style.Style;
let olStyleFill = ol.style.Fill;
let olStyleStroke = ol.style.Stroke;
let olStyleCircle = ol.style.Circle;
export class Measure {
    /**
     * 构造函数
     * @param {*} ol 自定义组件this
     * @param {*} olcusium 地图组件
     * @param {*} view 视图组件
     */
    constructor(ol, olcusium, view, olcusium3) {
        window.olcusium3 = olcusium3;
        this.map = olcusium;
        // var vectorLayer = new ol.layer.Vector();
        // 绘图对象
        this.draw = null;

        /**
         * Currently drawn feature.
         * @type {ol.Feature}
         */
        this.sketch = null;

        // 量算提示信息
        this.startDrawMsg = "请在地图上单击，开始绘制。";
        this.continuePolygonMsg = "单击继续绘制，双击结束。";
        this.continueLineMsg = "单击继续绘制，双击结束";

        // 量算提示Div
        this.helpTooltip = null;
        this.helpTooltipElement = null;

        this.measureTooltip = null;
        this.measureTooltipElement = null;

        this.source = null;

        this.sphere = new olSphere(6378137);

        this.meatureOverlay = this.setLayerOverlay();

        this.listener;
        this.pointerMoveListener;

    }

    setLayerOverlay() {
        let meatureOverlay = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#ffcc33'
                    })
                })
            }),
            map: this.map
        });
        return meatureOverlay;
    }

    // 初始化量算样式
    initMeasureStyle() {
        // 设置绘图样式
        const stroke = new olStyleStroke({
            color: 'rgba(255, 255, 0, 0.5)',
            lineDash: [10, 10],
            width: 2
        });

        const image = new olStyleCircle({
            radius: 5,
            stroke: new olStyleStroke({
                color: 'rgba(0, 0, 0, 0.7)'
            }),
            fill: new olStyleFill({
                color: 'rgba(255, 255, 255, 0.2)'
            })
        });

        const style = new olStyle({
            fill: new olStyleFill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke,
            image
        });

        return style;
    }

    /**
     * 激活距离量算
     */
    activeMeasureLength() {
        const style = this.initMeasureStyle();

        this.deactiveMeasure();
        this.source = this.meatureOverlay.getSource();

        // 创建绘图对象
        this.draw = new olDraw({
            source: this.source,
            style: [style],
            type: "LineString"
        });

        // 给地图添加绘制对象
        this.map.addInteraction(this.draw);

        // 添加地图移动事件
        this.addMapMoveEvent();

        // 创建提示信息
        this.createMeasureTooltip();
        this.createHelpTooltip();

        this.addDrawEvent();

    }

    /**
     * 激活面积量算
     */
    activeMeasureArea() {
        const style = this.initMeasureStyle();

        this.deactiveMeasure();
        this.source = this.meatureOverlay.getSource();

        // 创建绘图对象
        this.draw = new olDraw({
            source: this.source,
            style: [style],
            type: "Polygon"
        });

        this.map.addInteraction(this.draw);

        // 添加地图移动事件
        this.addMapMoveEvent();

        // 创建提示信息
        this.createMeasureTooltip();
        this.createHelpTooltip();

        this.addDrawEvent();
    }

    /** 取消地图量算 */
    deactiveMeasure() {
        // 移除绘图交互
        this.draw && this.map.removeInteraction(this.draw);
        // 移除提示
        if (this.helpTooltip) {
            this.map.removeOverlay(this.helpTooltip);
            this.helpTooltip = null;
        }
        if (this.measureTooltip) {
            this.map.removeOverlay(this.measureTooltip);
            this.measureTooltip = null;
        }
        if (this.draw) {
            this.draw.un('drawstart', this.drawstartEvent);
            this.draw.un('drawend', this.drawsendEvent);
        }
        olObservable.unByKey(this.pointerMoveListener);
        // 移除已绘制图形
        this.source && this.source.clear();
    }

    /**
     * 添加绘图事件
     */
    addDrawEvent() {

        let that = this;

        // 创建绘图事件
        this.draw.on('drawstart', this.drawstartEvent.bind(this), this);

        this.draw.on('drawend', this.drawsendEvent.bind(this), this);
    }
    drawstartEvent(evt) {
        // set sketch
        this.sketch = evt.feature;

        /** @type {ol.Coordinate|undefined} */
        var tooltipCoord = evt.coordinate;

        this.listener = this.sketch.getGeometry().on('change', (evt) => {
            var geom = evt.target;
            var output;
            if (geom.getType() == "Polygon") {
                output = this.formatArea(geom);
                tooltipCoord = geom.getInteriorPoint().getCoordinates();
            } else if (geom.getType() == "LineString") {
                output = this.formatLength(geom);
                tooltipCoord = geom.getLastCoordinate();
            }
            this.measureTooltipElement.innerHTML = output;
            this.measureTooltip.setPosition(tooltipCoord);
        });
    }

    drawsendEvent() {
        this.measureTooltipElement.className = 'tooltip tooltip-static';
        this.measureTooltip.setOffset([0, -7]);
        // unset sketch
        this.sketch = null;
        // unset tooltip so that a new one can be created
        this.measureTooltipElement = null;
        olObservable.unByKey(this.listener);
        // 移除绘图交互
        this.draw && this.map.removeInteraction(this.draw);
        // 移除提示
        if (this.helpTooltip) {
            this.map.removeOverlay(this.helpTooltip);
            this.helpTooltip = null;
        }
        if (this.draw) {
            this.draw.un('drawstart', this.drawstartEvent);
            this.draw.un('drawend', this.drawsendEvent);
        }
        olObservable.unByKey(this.pointerMoveListener);
    }


    /**
     * 添加地图移动事件
     */
    addMapMoveEvent() {
        this.pointerMoveListener = this.map.on('pointermove', this.drawPointerMove.bind(this));
    }

    drawPointerMove(evt) {
        if (evt.dragging) {
            return;
        }
        /** @type {string} */
        var helpMsg = this.startDrawMsg;

        if (this.sketch) {
            var geom = (this.sketch.getGeometry());
            if (geom.getType() == "Polygon") {
                helpMsg = this.continuePolygonMsg;
            } else if (geom.getType() == "LineString") {
                helpMsg = this.continueLineMsg;
            }
        }

        this.helpTooltipElement.innerHTML = helpMsg;
        this.helpTooltip.setPosition(evt.coordinate);

        this.helpTooltipElement.classList.remove('hidden');
    }

    /**
     * 计算长度
     * @param {*} line
     */
    formatLength(line) {

        //获取坐标串
        let coordinates = line.getCoordinates();
        //初始长度为0
        let length = 0;
        //获取源数据的坐标系
        var sourceProj = this.map.getView().getProjection();
        //进行点的坐标转换
        for (let i = 0; i < coordinates.length - 1; i++) {
            //第一个点
            let c1 = olProj.transform(coordinates[i], sourceProj, 'EPSG:4326');
            //第二个点
            let c2 = olProj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
            //获取转换后的球面距离
            //Returns the distance from c1 to c2 using the haversine formula.
            length += this.sphere.haversineDistance(c1, c2);
        }

        // var length = olSphere.getLength(line) * 6378137;
        var output;
        if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) +
                ' ' + 'km';
        } else {
            output = (Math.round(length * 100) / 100) +
                ' ' + 'm';
        }
        return output;
    };


    /**
     * 计算面积
     * @param {*} polygon
     */
    formatArea(polygon) {
        var sourceProj = this.map.getView().getProjection();
        //Make a complete copy of the geometry.
        //Transform each coordinate of the geometry from one coordinate reference system to another.
        //The geometry is modified in place. For example, a line will be transformed to a line and a circle to a circle.
        //If you do not want the geometry modified in place, first clone() it and then use this function on the clone.
        //克隆该几何对象然后转换坐标系
        var geom = polygon.clone().transform(sourceProj, 'EPSG:4326');
        //Return the Nth linear ring of the polygon geometry.
        //Return null if the given index is out of range.
        //The exterior linear ring is available at index 0 and the interior rings at index 1 and beyond.
        //获取多边形的坐标系
        var coordinates = geom.getLinearRing(0).getCoordinates();
        //Returns the geodesic area for a list of coordinates.
        //获取球面面积
        var area = Math.abs(this.sphere.geodesicArea(coordinates));

        var output;
        if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) +
                ' ' + 'km<sup>2</sup>';
        } else {
            output = (Math.round(area * 100) / 100) +
                ' ' + 'm<sup>2</sup>';
        }
        return output;
    };

    /**
     * 创建量测帮助提示
     */
    createHelpTooltip() {
        if (this.helpTooltipElement) {
            this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
        }

        this.helpTooltipElement = document.createElement('div');
        this.helpTooltipElement.className = 'tooltip hidden';
        this.helpTooltip = new olOverlay({
            element: this.helpTooltipElement,
            offset: [15, 0],
            positioning: 'center-left'
        });
        this.map.addOverlay(this.helpTooltip);
    }

    /**
     * 创建量测结果提示
     */
    createMeasureTooltip() {
        if (this.measureTooltipElement) {
            this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
        }

        this.measureTooltipElement = document.createElement('div');
        this.measureTooltipElement.className = 'tooltip tooltip-measure';
        this.measureTooltip = new olOverlay({
            element: this.measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        });
        this.map.addOverlay(this.measureTooltip);
    }
}
