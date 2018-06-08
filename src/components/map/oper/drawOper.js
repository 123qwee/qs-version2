import olDraw from 'ol/interaction/Draw';

import olStyle from 'ol/style/Style';
import olStyleFill from 'ol/style/Fill';
import olStyleStroke from 'ol/style/Stroke';
import olStyleCircle from 'ol/style/Circle';

class drawOper {

  constructor(map) {
    this.map = map;
    this.draw = null;

    this.sketch = null;
  }

  // 初始化绘图样式
  initDrawStyle() {
    // 设置绘图样式
    const stroke = new olStyleStroke({
      color: 'rgba(0, 0, 0, 0.5)',
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
   * 激活绘图工具
   * @param {*} source 图层数据源
   * @param type 绘图类型（多边形、矩形、圆形）
   * @param endFunc 绘图完成回调函数
   */
  activeDraw(params) {
    const style = this.initDrawStyle();
    let geoFunc = null;

    // 绘制矩形
    if (params.type == "Rectangle") {
      params.type = "Circle";
      geoFunc = olDraw.createBox();
    }

    // 创建绘图对象
    this.draw = new olDraw({
      source: params.source,
      style: [style],
      type: params.type,
      geometryFunction: geoFunc
    });

    this.addDrawEvent(params.endFunc);

    this.map.addInteraction(this.draw);
  }

  /**
   * 反激活绘图工具
   */
  deactiveDraw() {
    // 移除绘图交互
    this.draw && this.map.removeInteraction(this.draw);
  }

  /**
   * 添加绘图事件
   * @param endFunc 绘图完成回调函数
   */
  addDrawEvent(endFunc) {

    var listener;
    let that = this;

    // 创建绘图事件
    this.draw.on('drawstart',
      (evt) => {
        // set sketch
        this.sketch = evt.feature;

        /** @type {ol.Coordinate|undefined} */
        var tooltipCoord = evt.coordinate;

        listener = this.sketch.getGeometry().on('change', function (evt) {

          var geom = evt.target;

        });
      }, this);

    this.draw.on('drawend',
      (evt) => {
        // 绘制完成几何图形
        let geo = evt.feature.getGeometry();

        endFunc && endFunc(geo);
      }, this);
  }
}

export default drawOper;
