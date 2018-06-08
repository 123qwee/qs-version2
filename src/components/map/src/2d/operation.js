export class Operation {
    olcusium = null;
    view = null;

    constructor(ol, olcusium, view) {
        if (!olcusium || !view) {
            throw '请检查传入的数据源是否正确';
        }
        this.ol = ol;
        this.olcusium = olcusium;
        this.view = view;
    }

    // 获取当前地图缩放级别
    getZoom() {
        return this.view.getZoom();
    }

    // 获取当前地图最小缩放级别
    getMinZoom() {
        return this.view.getMinZoom();
    }

    // 获取当前地图最大缩放级别
    getMaxZoom() {
        return this.view.getMaxZoom();
    }

    // 地图放大一级
    zoomIn() {
        const zoom = this.getZoom();

        if (zoom != this.getMaxZoom()) {
            this.view.animate({
                zoom: zoom + 1,
                duration: 1000
            })
        }
    }

    // 地图缩小一级
    zoomOut() {
        if (this.getZoom() != this.getMinZoom()) {
            // this.map.setZoom(this.getZoom() - 1);
            this.view.animate({
                zoom: this.getZoom() - 1,
                duration: 1000
            })
        }
    }

    /**
     * 设置图层显影
     * @param {*} json 图层显影配置
     *  "grid1": {
            show: false
        },
        "grid2": {
            show: false
        }
     */
    setLayersVisible(json) {
        this.ol.global.notifyDataChanged('layersChanged', json);
    }

    // 设置全图
    setFullExtent() {
        this.setCenterAndZoom([this.ol.c.centerX, this.ol.c.centerY], this.ol.c.zoomLevel);
    }

    // 设置地图中心点及缩放级别
    setCenterAndZoom(center, zoom) {
        if (this.ol.olcusium3.getEnabled()) {
            this.view.animate({
                center,
                duration: 1000
            })
        } else {
            this.view.animate({
                center,
                zoom,
                duration: 1000
            })
        }
    }
}
