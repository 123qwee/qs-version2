import olFeature from 'ol/Feature';
import olPoint from 'ol/geom/Point';
import olStyle from 'ol/style/Style';
import olStyleIcon from 'ol/style/Icon';
import olStyleCircle from 'ol/style/Circle';
import olStyleStroke from 'ol/style/Stroke';
import olStyleFill from 'ol/style/Fill';

// 引入图层操作
import layerOper from './layerOper';

class markerOper {
  constructor(map) {
    this.map = map;

    // 初始化图层操作
    this.layerApi = new layerOper(this.map);
    // 默认图层名称
    this.defaultLayerName = "默认标记图层";

    this.defaultLayer = this.layerApi.getLayerByName(this.defaultLayerName);

    this.defaultSource = this.defaultLayer.getSource();

    // 设置案卷样式
    this.mStyles = {
      'redHot': new olStyle({
        image: new olStyleCircle({
          radius: 6,
          snapToPixel: false,
          fill: new olStyleFill({
            color: 'red'
          }),
          stroke: new olStyleStroke({
            color: 'white',
            width: 2
          })
        })
      }),
      'curMarker': new olStyle({
        image: new olStyleIcon({
          anchor: [0.5, 1],
          src: require('../images/map_marker.png'),
        })
      })
    };
    // this.initLyStyle();
  }

  /**
   * 初始化图层样式
   */
  initLyStyle() {
    let that = this;

    this.defaultLayer.setStyle((feature) => {
      return that.mStyles[feature.get('type')];
    });

  }

  addMarker(params) {
    const marker = new olFeature({
      type: params.type,
      taskNum: params.taskNum,
      geometry: new olPoint([params.lon, params.lat])
    });

    marker.setStyle([this.mStyles[marker.get('type')]]);

    this.defaultSource.addFeature(marker);

    return marker;
  }

  addMarkers(markers) {
    let that = this;

    const features = _.map(markers, (item) => {
      return new olFeature({
        type: item.type,
        taskNum: item.taskNum,
        geometry: new olPoint([item.lon, item.lat])
      });
    })

    _.map(features, (item) => {
      item.setStyle([that.mStyles[item.get('type')]]);
    })

    this.defaultSource.addFeatures(features);
  }

  removeMarker(params) {
    // 设置默认矢量图层
    if (!params.layerName) {
      params.layerName = this.defaultLayerName;
    }

    const layer = this.layerApi.getLayerByName(params.layerName);
    layer.getSource().removeFeature(params.marker);
  }

  /**
   * 根据要素ID移除要素
   * @param {*} id 要素编号
   */
  removeMarkerById(id) {
    const layer = this.layerApi.getLayerByName(params.layerName);
    const source = layer.getSource();

    source.removeFeature(source.getFeatureById(id));
  }

  /**
   * 根据要素类型移除要素
   * @param {*} type 
   */
  removeMarkerByType(type) {
    let that = this;
    let features = this.defaultSource.getFeatures();

    _.map(features, (item) => {
      if (item.get('type') == 'redHot') {
        that.defaultSource.removeFeature(item);
      }
    })
  }

  removeMarkerByTypeAndTaskNum(type, taskNum) {
    let that = this;
    let features = this.defaultSource.getFeatures();

    for (let i = 0; i < features.length; i++) {
      if (features[i].get('type') == 'redHot' && features[i].get('taskNum') == taskNum) {
        that.defaultSource.removeFeature(features[i]);
        break;
      }
    }
  }

  /**
   * 清空矢量图层上的所有元素
   * @param {*} layerName 
   */
  clearMarkers(layerName) {
    this.defaultLayer.getSource().clear();
  }
}

export default markerOper