/**
 * 量算
 */

export class Measure3D {
    /**
     * 构造函数
     * @param {*} ol 自定义组件this
     * @param {*} olcusium 地图组件
     * @param {*} view 视图组件
     * @param {*} olcusium3 场景组件
     */
    constructor(ol, olcusium, view, olcusium3) {
        this.olcusium3 = olcusium3;
        this.viewer = this.olcusium3.getViewer();
        this.handlerDis;
        this.handlerArea;
    }

    /**
     * 激活量算距离
     */
    activeMeature() {
        //初始化测量距离
        this.handlerDis = new Cesium.MeasureHandler(this.viewer, Cesium.MeasureMode.Distance, 0);

        // 设置是否贴地
        this.handlerDis.clampMode = 0;
        //注册测距功能事件
        this.handlerDis.measureEvt.addEventListener((result) => {
            var distance = (result.distance / 1) > 1000 ? (result.distance / 1000).toFixed(2) + 'km' : (result.distance / 1).toFixed(2) + 'm';
            this.handlerDis.disLabel.text = '距离:' + distance;

        });
        this.handlerDis.activeEvt.addEventListener((isActive) => {
            if (isActive == true) {
                this.viewer.enableCursorStyle = false;
                this.viewer._element.style.cursor = '';
            } else {
                this.viewer.enableCursorStyle = true;
            }
        });

        this.handlerDis.activate();
    }

    /**
     * 激活量算面积
     */
    activeArea() {
        this.handlerArea = new Cesium.MeasureHandler(this.viewer, Cesium.MeasureMode.Area, 0);
        this.handlerArea.measureEvt.addEventListener((result) => {
            var area = (result.area / 1) > 1000000 ? (result.area / 1000000).toFixed(2) + 'km²' : (result.area / 1).toFixed(2) + '㎡'
            this.handlerArea.areaLabel.text = '面积:' + area;
        });
        this.handlerArea.activeEvt.addEventListener((isActive) => {
            if (isActive == true) {
                this.viewer.enableCursorStyle = false;
                this.viewer._element.style.cursor = '';
            } else {
                this.viewer.enableCursorStyle = true;
            }
        });
        this.handlerArea.activate();
    }

    clearAll() {
        this.handlerDis && this.handlerDis.clear();
        this.handlerArea && this.handlerArea.clear();
    }

    deactiveAll() {
        this.clearAll();
        this.handlerDis && this.handlerDis.deactivate();
        this.handlerArea && this.handlerArea.deactivate();
    }
}
