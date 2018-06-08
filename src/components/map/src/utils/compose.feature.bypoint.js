import {
    getFeature,
    POLYGON_GEOMETRY
} from '../2d/feature';

import * as _ from 'lodash';
/**
 * compose方法
 * 根据点集合动态生成features
 * @param {*} pts 点集合
 */
export function setFeaturesByPoint(pts) {
    return (evt, next) => {
        let markers = [];
        _.map(pts, (value, index) => {
            markers.push({
                smx: value[0],
                smy: value[1],
                smz: 70
            });
        });
        evt.setFeatures(evt.self.getMakers(markers));
        next();
    }
}
