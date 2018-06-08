/**
 * 覆盖物
 */
export class Overlay {
    /**
     * 构造函数
     * @param {*} ol 自定义组件this
     * @param {*} olcusium 地图组件
     * @param {*} olcusium3 场景组件
     */
    constructor(ol, olcusium, olcusium3) {
        this.ol = ol;
        this.olcusium = olcusium;
        this.olcusium3 = olcusium3;
        this.Element = document.createElement('div');
        this.Element.innerHTML =
            "<div>" +
            "<div class='popup_content'>123</div>" +
            "<div id='popup-closer' class='popup_closed'>123</div>" +
            "</div>"
    }
    /**
     *  根据要素添加覆盖物
     * @param {*} feature {
     *  coordinates:[x,y],
     *  content:['111','222','333']
     * }
     */
    add(feature) {
        const overlay = this.getOverlay();
        overlay.setPosition(coordinates);
        this.setOverlayContent(overlay, feature);
    }
    // 获得覆盖物
    getOverlay() {
        return this.addOverlay();
    }

    // 设置覆盖物内容
    setOverlayContent(overlay, feature) {
        const element = overlay.getElement();
        element.childNodes.forEach(function (child) {
            if (child.id === 'popup-content') {
                // child.innerHTML = `<p>The location you clicked was:</p><code>${hdms}</code>`;
            } else if (child.id === 'popup-closer') {
                child.onclick = this.onCloseClick.bind(this, overlay);
            }
        }, this);
    }

    // 气泡关闭事件
    onCloseClick(overlay) {
        this.olcusium.removeOverlay(overlay);
    }

    // 添加覆盖物
    addOverlay() {
        let element;
        element = this.Element.cloneNode(true);
        const overlay = new ol.Overlay({
            element
        });
        this.olcusium.addOverlay(overlay);
        return overlay;
    }
}
