import olImageWms from 'ol/source/ImageWMS';

class queryOper {
  constructor(map) {
    this.map = map;
  }

  /**
   * 
   * @param {*} wmsSource 
   * @param {*} coordinate 
   * @param {*} resolution 
   * @param {*} projection 
   * @param {*} params INFO_FORMAT 支持的类型 【text/plain, application/vnd.ogc.gml, 
   * text/xml, application/vnd.ogc.gml/3.1.1, text/xml; subtype=gml/3.1.1, text/html, application/json】
   */
  queryWmsFeatureInfoUrl(wmsSource, coordinate, resolution, projection = 'EPSG:4326', params = {
    INFO_FORMAT: 'application/json',
    FEATURE_COUNT: 1
  }) {
    let url;
    if (wmsSource instanceof olImageWms) {
      url = wmsSource.getGetFeatureInfoUrl(coordinate, resolution, projection, params);
    }
    return url;
  }
}

export default queryOper