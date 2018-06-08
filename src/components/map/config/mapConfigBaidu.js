const mapConfig = {
  domId: 'map',
  //  centerX: 103.487899,
  //  centerY: 35.249161,
  // centerX: 112.7160,
  // centerY: 38.4418,
  centerX: 112.72913654448,
  centerY: 38.448168903225,
  zoomLevel: 11,
  projection: 'EPSG:3857',
  // 默认全国范围
  bounds: [55.356269, 10.612695, 149.003704, 58.337304],
  initLayers: [{
    id: '103',
    name: '基础图层',
    type: 'Baidu',
    url: 'http://online3.map.bdimg.com/onlinelabel',
    isLoad: true,
    isVisible: true
  }, {
    id: '201',
    name: '基础图层-网格',
    type: 'WMS',
    url: 'http://10.211.55.3:6880/geoserver/Grid/wms',
    projection: 'EPSG:3857',
    isLoad: true,
    isVisible: false,
    layers: 'Grid:GRID_UNIT',
  }, {
    id: '202',
    name: '基础图层-社区',
    type: 'WMS',
    url: 'http://10.211.55.3:6880/geoserver/Grid/wms',
    projection: 'EPSG:3857',
    isLoad: true,
    isVisible: false,
    layers: 'Grid:GRID_TCOMMUNITY',
  }, {
    id: '301',
    name: '默认矢量图层',
    type: 'Vector',
    isLoad: true,
    isVisible: true,
  }],
}

export default mapConfig;