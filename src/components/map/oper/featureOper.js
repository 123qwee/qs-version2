import olFormatWFS from 'ol/format/WFS';
import olFormatGML from 'ol/format/GML';

import olFeature from 'ol/feature';
import olGeoPolygon from 'ol/geom/polygon';

import olStyle from 'ol/style/Style';
import olStyleFill from 'ol/style/Fill';
import olStyleStroke from 'ol/style/Stroke';
import olStyleCircle from 'ol/style/Circle';

/**
 * @desc 要素操作
 */
class featureOper {
    constructor(map) {
        this.map = map;

        this.formatWFS = new olFormatWFS();
    }

    /**
     * 更新要素信息
     * @param {*} feature
     * @param {*} geomType
     * @param {*} projection
     */
    updateFeature(feature, geomType, projection = 'EPSG:4326') {
        const formatGML = new olFormatGML({
            featureNS: 'http://opengeo.org/Grid', // Your namespace
            featureType: 'CMP_0101',
            geometryName: "GEOMETRY",
            version: '1.0.1'
            // srsName: projection
        });

        let node = this.formatWFS.writeTransaction(null, [feature], null, formatGML);

        let xml = new XMLSerializer();
        let data = xml.serializeToString(node);

        $.ajax('http://10.211.55.3:6880/geoserver/Grid/ows', {
            type: 'POST',
            dataType: 'xml',
            processData: false,
            contentType: 'text/xml',
            data
        }).done(function (e) {});
    }

    /**
     * 添加多边形要素到矢量图层
     * @param {*} layer 图层
     * @param {*} polyCoords 多边形点串
     */
    addPolygon(layer, polyCoords) {
        let feature = new olFeature({
            geometry: new olGeoPolygon(polyCoords)
        });

        // 设置feature样式
        const style = new olStyle({
            fill: new olStyleFill({
                color: 'rgba(238, 153, 0, 0.4)'
            })
        });

        feature.setStyle([style]);

        layer.getSource().addFeature(feature);
    }
}

export default featureOper
