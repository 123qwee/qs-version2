/**
 * 实现osgb的选中功能
 */
import {
    queryBysqlGeometry
} from '../2d/supermap/map.service';
import * as _ from 'lodash';
export class OsgbSelect {
    /**
     * 构造函数
     * @param {*} ol 自定义组件this
     * @param {*} olcusium3 场景对象
     */
    constructor(ol, olcusium3) {
        this.ol = ol;
        this.olcusium3 = olcusium3;
        this.viewer = this.olcusium3.getViewer();
        this.scene = this.viewer.scene;
        // 绑定点击事件
        this.pickEvent();
    }
    /**
     * Supermap封装的选中事件
     * 这里暂定场景只会用到这一个组件，不需要再写多模块插接
     */
    pickEvent() {
        var handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
        let self = this;
        //设置鼠标左键单击回调事件
        handler.setInputAction((e) => {

            //首先移除之前添加的点
            // viewer.entities.removeAll();
            //获取点击位置笛卡尔坐标
            var position = this.scene.pickPosition(e.position);

            //将笛卡尔坐标转化为经纬度坐标
            var cartographic = Cesium.Cartographic.fromCartesian(position);
            var longitude = Cesium.Math.toDegrees(cartographic.longitude);
            var latitude = Cesium.Math.toDegrees(cartographic.latitude);
            var height = cartographic.height;
            if (height < 0) {
                height = 0;
            }

            //创建弹出框信息
            var entity = new Cesium.Entity({
                name: "位置信息",
                description: this.createDescription(Cesium, [longitude, latitude, 850 + height])
            });
            this.viewer.selectedEntity = entity;

            // 获得图层集合
            var layers = this.scene.layers;
            // 获得图层长度
            var layerCount = layers._layers.length;
            for (var i = 0; i < layerCount; i++) {
                let layer = layers.findByIndex(i);
                let layerName = layer._name;
                if (layerName === "三维湖面")
                    continue;
                if (layer.getSelection().length === 0) {
                    continue;
                }
                // 从配置文件里面取出查询参数
                let truelayer = _.filter(this.ol.layers, (value) => {
                    return value.name === "GEO_BUILD@grid";
                });
                // 获得选择集合
                let ids = layer.getSelection();
                let id = ids[0];
                if (id > 0) {
                    queryBysqlGeometry(truelayer[0].url, truelayer[0].name, "wg_code=" + id).then((feature) => {
                        // 发送三维选择状态
                        self.ol.global.notifyDataChanged("feature3dSelect", feature);
                    })
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
    //创建描述位置的对话框
    createDescription(Cesium, properties) {
        var simpleStyleIdentifiers = ['经度', '纬度', '高度'];
        var html = '';
        for (var key in properties) {
            if (properties.hasOwnProperty(key)) {
                if (simpleStyleIdentifiers.indexOf(key) !== -1) {
                    continue;
                }
                var value = properties[key];
                if (Cesium.defined(value) && value !== '') {
                    html += '<tr><td>' + simpleStyleIdentifiers[key] + '</td><td>' + value + '</td></tr>';
                }
            }
        }
        if (html.length > 0) {
            html = '<table class="zebra"><tbody>' + html + '</tbody></table>';
        }
        return html;
    }
}
