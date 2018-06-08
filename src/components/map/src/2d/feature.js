// import * as _geometry from './../utils/geometryObj';
/**
 * 获得ol geometry
 * @param {TYPE_GEOMETRY} type 几何对象类型
 * @param {_geometry} geometry 集合对象
 */
export function getFeature(type, geometry) {
    if (type === CIRCLE_GEOMETRY) {
        return getCircle(geometry);
    } else if (type === POLYGON_GEOMETRY) {
        return getPology(geometry);
    } else if (type === POINT_GEOMETRY) {
        return getPoint(geometry);
    }
}

let getCircle = (geometry) => {
    return new ol.Feature(new ol.geom.Circle([geometry.x, geometry.y, 1000], geometry.r));
}

let getPoint = (geometry) => {
    return new ol.Feature(new ol.geom.Point([geometry.x, geometry.y, 1000]));
}

let getPology = (geometry) => {
    return new ol.geom.Polygon([geometry]);
}

// 圆形
export const CIRCLE_GEOMETRY = Symbol('CIRCLE_GEOMETRY');
// 点
export const POINT_GEOMETRY = Symbol('POINT_GEOMETRY');
// 多边形
export const POLYGON_GEOMETRY = Symbol('POLYGON_GEOMETRY');
// 折线
export const LINESTRING_GEOMETRY = Symbol('LINESTRING_GEOMETRY');

//export const TYPE_GEOMETRY = CIRCLE_GEOMETRY | POINT_GEOMETRY | POLYGON_GEOMETRY | LINESTRING_GEOMETRY;
