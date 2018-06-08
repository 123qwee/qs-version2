import TileLayer from 'ol/layer/tile';
import sourceWMTS from 'ol/source/WMTS';
import tileWMTS from 'ol/tilegrid/WMTS';
import olProj from 'ol/proj';
import olExtent from 'ol/extent';

import olVectorLayer from 'ol/layer/Vector';
import olVectorSource from 'ol/source/Vector';
import olXyzSource from 'ol/source/XYZ';

import olImageWms from 'ol/source/ImageWMS';
import olImageLayer from 'ol/layer/Image';

import olTileGrid from 'ol/tilegrid/TileGrid';
import olImageSource from 'ol/source/TileImage';

import olGeoJson from 'ol/format/GeoJSON';

import olStyle from 'ol/style/Style';
import olStyleFill from 'ol/style/Fill';
import olStyleStroke from 'ol/style/Stroke';
import olStyleCircle from 'ol/style/Circle';
import olStyleIcon from 'ol/style/Icon';

class layerOper {
  constructor(map) {
    this.map = map;
  }

  createBaiduLayer(params) {
    let projection = olProj.get(params.projection);
    let resolutions = [];
    for (let i = 0; i < 19; i++) {
      resolutions[i] = Math.pow(2, 18 - i);
    }
    let tilegrid = new olTileGrid({
      origin: [0, 0],
      resolutions: resolutions
    });

    let baidu_source = new olImageSource({
      projection: projection,
      tileGrid: tilegrid,
      tileUrlFunction: function (tileCoord, pixelRatio, proj) {
        if (!tileCoord) {
          return "";
        }

        var z = tileCoord[0];
        var x = tileCoord[1];
        var y = tileCoord[2];

        if (x < 0) {
          x = "M" + (-x);
        }
        if (y < 0) {
          y = "M" + (-y);
        }

        let url = params.url + "/?qt=tile&x=" + x + "&y=" + y + "&z=" + z + "&styles=pl&udt=20170908&scaler=1&p=1";
        return url;
      }
    });

    let baiduLayer = new TileLayer({
      source: baidu_source
    });

    return baiduLayer;
  }

  /**
   * 创建WMTS图层
   * @param {*} params 
   */
  createWmtsLayer(params) {
    return new TileLayer({
      title: params.name,
      visible: params.isVisible,
      source: new olXyzSource({
        url: params.url,
        tileUrlFunction: function (tileCoord) {
          let x = tileCoord[1]
          let y = -tileCoord[2] - 1;
          let l = tileCoord[0];
          let url = params.url.replace('{x}', x).replace('{y}', y).replace('{z}', l);
          return url;
        }
      })
    });
  }

  /**
   * 创建WMS图层
   * @param {*} params 
   */
  createWmsLayer(params) {
    let projection = olProj.get(params.projection)

    const wmsSource = new olImageWms({
      url: params.url,
      params: {
        'LAYERS': params.layers
      },
      serverType: 'geoserver',
      // projection: projection
    });

    const wmsLayer = new olImageLayer({
      name: params.name,
      source: wmsSource,
      visible: params.isVisible
    });

    return wmsLayer;
  }

  /**
   * 创建Vector矢量图层
   * @param {*} params 
   */
  createVectorLayer(params) {
    const source = new olVectorSource();

    // 设置矢量图层样式
    const style = new olStyle({
      fill: new olStyleFill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new olStyleStroke({
        color: '#ffcc33',
        width: 2
      }),
      image: new olStyleCircle({
        radius: 7,
        fill: new olStyleFill({
          color: '#ffcc33'
        })
      })
    });

    const vectorLayer = new olVectorLayer({
      name: params.name,
      source: source,
      visible: params.isVisible,
      style: [style]
    });

    return vectorLayer;
  }

  /**
   * 根据WFS服务创建矢量图层
   * @param {*} params 
   */
  createVectorLayerByWFS(params) {
    // 配置点图层所用样式图片
    const style = new olStyle({
      image: new olStyleIcon({
        src: params.styleImg
      })
    });

    const source = new olVectorSource({
      url: params.url + "?" +
        'service=WFS&' +
        'version=1.0.0&' +
        'request=GetFeature&' +
        'typeNames=' + params.layers + "&" +
        'outputFormat=json&' +
        'srsname=' + params.projection,
      format: new olGeoJson()
    })

    const vectorLayer = new olVectorLayer({
      name: params.name,
      source: source,
      preload: Infinity,
      visible: params.isVisible,
      style: [style]
    });

    return vectorLayer;
  }

  /**
   * 根据Name获取图层
   * @param {*} name 
   */
  getLayerByName(name) {
    let layers = this.map.getLayers().getArray();
    let layer = null;

    for (let i = 0; i < layers.length; i++) {
      if (layers[i].get('name') == name) {
        layer = layers[i];
        break;
      }
    }

    return layer;
  }

  /**
   * 添加图层到地图
   * @param {*} layer 
   */
  addLayer(layer) {
    this.map.addLayer(layer);
  }

  /**
   * 设置图层可见性
   * @param {*} name 图层名称
   * @param {*} isVisible 可见性
   */
  setLayerVisibility(name, isVisible = false) {
    let layer = this.getLayerByName(name);
    layer.setVisible(isVisible);
  }
}

export default layerOper