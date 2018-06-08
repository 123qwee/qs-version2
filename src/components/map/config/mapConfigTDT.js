import constants from "../../../../static/constants.js";

const mapConfig = {
  domId: 'map',
  //  centerX: 112.7160,
  //  centerY: 38.4418,
  centerX: 108.7273,
  centerY: 34.4016,
  zoomLevel: 13,
  projection: 'EPSG:4326',
  // 默认全国范围
  bounds: [55.356269, 10.612695, 149.003704, 58.337304],
  initLayers: [{
      id: '101',
      name: '基础底图-天地图路网',
      type: 'WMTS',
      url: 'http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}',
      // 天地图应为2000坐标系【EPSG:4490】，但OpenLayer默认不识别，所以这里设置为84坐标系
      projection: 'EPSG:4326',
      isLoad: true,
      isVisible: true
    }, {
      id: '102',
      name: '基础底图-天地图影像',
      type: 'WMTS',
      url: 'http://t4.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}',
      // 天地图应为2000坐标系【EPSG:4490】，但OpenLayer默认不识别，所以这里设置为84坐标系
      projection: 'EPSG:4326',
      isLoad: true,
      isVisible: false
    }, {
      id: '103',
      name: '基础底图-天地图标注',
      type: 'WMTS',
      url: 'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}',
      projection: 'EPSG:4326',
      isLoad: true,
      isVisible: true
    }, {
      id: '201',
      name: '默认矢量图层',
      type: 'Vector',
      isLoad: true,
      isVisible: true,
    }, {
      id: '202',
      name: '默认标记图层',
      type: 'Vector',
      isLoad: true,
      isVisible: true,
    }, {
      id: '301',
      name: '基础图层-网格',
      type: 'WMS',
      url: constants.MAP_WMS_URL,
      projection: 'EPSG:4326',
      isLoad: true,
      isVisible: false,
      layers: 'qhOracle:GRID_UNIT',
    }, {
      id: '302',
      name: '基础图层-社区',
      type: 'WMS',
      url: constants.MAP_WMS_URL,
      projection: 'EPSG:4326',
      isLoad: true,
      isVisible: false,
      layers: 'qhOracle:GRID_TCOMMUNITY',
    }, {
      id: '303',
      name: '基础图层-街道办',
      type: 'WMS',
      url: constants.MAP_WMS_URL,
      projection: 'EPSG:4326',
      isLoad: true,
      isVisible: false,
      layers: 'qhOracle:GRID_STREET',
    }, {
      id: '304',
      name: '基础图层-区界',
      type: 'WMS',
      url: constants.MAP_WMS_URL,
      projection: 'EPSG:4326',
      isLoad: true,
      isVisible: false,
      layers: 'qhOracle:GRID_REGION',
    }, {
      id: '305',
      name: '基础图层-网格信息',
      type: 'WMS',
      url: constants.MAP_WMS_URL,
      projection: 'EPSG:4326',
      isLoad: true,
      isVisible: false,
      layers: 'qhOracle:GRID_UNITINFO',
    },
    {
      id: '401',
      name: '矢量图层-0101',
      type: 'WFS',
      url: 'http://10.211.55.3:6880/geoserver/Grid/ows',
      wmsUrl: 'http://10.211.55.3:6880/geoserver/Grid/wms',
      projection: 'EPSG:4326',
      isLoad: false,
      isVisible: false,
      layers: 'Grid:CMP_0101',
      styleImg: require('../images/component/01/01.png')
    }
  ],
}

export default mapConfig;