import * as _ from 'lodash';
/**
 * 按照sql查询
 * @param {String} url 地图地址
 * @param {*} dataNames 图层名称 GEO_BUILD@grid
 * @param {*} query 查询条件
 * @param {*} geometry 几何对象(new ol.geom.Polygon([[[0, 0], [-30, 0], [-10, 30], [0, 0]]]);)
 */
export function queryBySql(url, dataNames, query, geometry) {
    let source = new ol.source.Vector({
        wrapX: false
    });
    let resultLayer = new ol.layer.Vector({
        source: source,
    });

    var param;
    if (geometry) {
        param = new SuperMap.QueryBySQLParameters({
            queryParams: {
                name: dataNames,
                attributeFilter: query
            },
            geometry: polygon,
            spatialQueryMode: SuperMap.SpatialQueryMode.INTERSECT
        });
    } else {
        param = new SuperMap.QueryBySQLParameters({
            queryParams: {
                name: dataNames,
                attributeFilter: query
            }
        });
    }
    let queryService = new ol.supermap.QueryService(url).queryBySQL(param, function (serviceResult) {
        let features = (new ol.format.GeoJSON()).readFeatures(serviceResult.result.recordsets[0].features);
        _.map(features, (feature, index) => {
            feature.name = dataNames;
        });
        let vectorSource = new ol.source.Vector({
            features: features,
            wrapX: false
        });
        resultLayer.setSource(vectorSource);
    });
    return resultLayer;
}

/**
 * 按照sql查询
 * @param {String} url 地图地址
 * @param {*} dataNames 图层名称 GEO_BUILD@grid
 * @param {*} query 查询条件
 * @param {*} geometry 几何对象(new ol.geom.Polygon([[[0, 0], [-30, 0], [-10, 30], [0, 0]]]);)
 */
export function queryBysqlGeometry(url, dataNames, query) {
    return new Promise(function (resolve, reject) {
        var param;
        param = new SuperMap.QueryBySQLParameters({
            queryParams: {
                name: dataNames,
                attributeFilter: query
            }
        });
        let queryService = new ol.supermap.QueryService(url).queryBySQL(param, function (serviceResult) {
            resolve(serviceResult);
        });
    });
}

export function queryByGeoGeometry(url, dataNames, query, geometry) {
    return new Promise(function (resolve, reject) {
        if (!query) {
            query = "1=1"
        }
        var param;
        param = new SuperMap.QueryByGeometryParameters({
            queryParams: {
                name: dataNames,
                attributeFilter: query
            },
            geometry: geometry,
            spatialQueryMode: SuperMap.SpatialQueryMode.INTERSECT
        });
        let queryService = new ol.supermap.QueryService(url).queryByGeometry(param, function (serviceResult) {
            resolve(serviceResult);
        });
    });
}
