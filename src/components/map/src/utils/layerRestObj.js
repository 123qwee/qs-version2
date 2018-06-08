/**
 * name: '默认矢量图层',
    type: 'Vector',
    isLoad: true,
    isVisible: true,
 */
const snaf = Symbol('snaf');
import uuid from 'node-uuid';
import _ from "lodash";
export class layerRestObj {
    constructor() {

    }
    // 获取字符串对象
    static getJsonFromObj(
        name, type
        /**
         * OSGB_LAYER
         * REST_LAYER
         */
        , isVisible
    ) {
        return _.assign({}, new RestObj(...arguments));
    }

    // 获取图层对象
    static getRestFromObj() {
        let Rests = [];
        if (arguments.length === 0) {
            return Rests.push(this[snaf](
                '测试图层',
                REST_LAYER,
                "http://support.supermap.com.cn:8090/iserver/services/map-world/rest/maps/World",
                true
            ));
        }
        _.map(arguments[0], (value, index) => {
            Rests.push(this[snaf](value, index));
        });
        return Rests;
    }

    static[snaf](getRestObj, index) {
        return new RestObj(index, ..._.values(arguments[0]));
    }
}

export class RestObj {
    /**
     * 构造函数
     * @param {*} index 编码
     * @param {*} url 数据服务地址
     * @param {*} name 名称
     * @param {*} type 类型
     * @param {*} isVisible 是否显示
     * @param {*} style 风格
     */
    constructor(index, url, name, type, isVisible, style) {
        this._id = uuid.v1();
        this.index = index;
        this._name = name;
        this._type = type;
        this._url = url;
        this._isVisible = isVisible;
        this._style = style;
        this.rendered = 'canvas';
    }
    get id() {
        return this._id;
    }
    set id(v) {
        this._id = uuid.v1();
    }
    get name() {
        return this._name;
    }
    set name(v) {
        this._name = v;
    }
    get type() {
        return this._type;
    }
    set type(v) {
        this._type = v;
    }
    get url() {
        return this._url;
    }
    set url(v) {
        this._url = v;
    }
    get isVisible() {
        return this._isVisible;
    }
    set isVisible(v) {
        this._isVisible = v;
    }
    get style() {
        return this._style;
    }
    set style(v) {
        this._style = v;
    }

    *[Symbol.iterator]() {
        yield this.id;
        yield this.name;
        yield this.type;
        yield this.url;
        yield this.isVisible;
        yield this.style;
    }
}

export const OSGB_LAYER = Symbol('OSGB_LAYER');
export const REST_LAYER = Symbol('REST_LAYER');
