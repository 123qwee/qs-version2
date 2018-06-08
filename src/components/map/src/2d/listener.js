import {
    Observable,
    Subject
} from 'rxjs'
import uid from 'node-uuid';
/**
 * 三维并没有办法实现滑动高亮，但是我们还是会记录二三维鼠标平移坐标和点击像素坐标 2017-12-14
 */
export class Listener {
    // 鼠标点击观察者对象
    mouseClickPixelPos$ = new Subject();
    // 鼠标平移观察者对象
    mouseMovePixelPos = new Subject();
    mouseDown$ = new Subject();
    mouseUp$ = new Subject();
    mouseMove$ = new Subject();
    mapMouseMove$ = new Subject();
    /**
     * 初始化构建地图对象
     * @param {*} ol 自定义组件this
     * @param {*} map 地图对象
     * @param {*} olcusium 场景对象
     */
    constructor(ol, olcusium, olcusium3) {
        this.ol = ol;
        this.olcusium = olcusium;
        this.olcusium3 = olcusium3;
        this.observable = null;
        this.onfocus();
        this.onBindFocus();
    }

    // 激活组件获得焦点事件
    onfocus() {
        // 绑定鼠标按下事件
        var handler = new Cesium.ScreenSpaceEventHandler(this.olcusium3.getCesiumScene().canvas);
        handler.setInputAction((event) => {
            this.mouseDown$.next(event);
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
        // 绑定鼠标抬起事件
        var handler1 = new Cesium.ScreenSpaceEventHandler(this.olcusium3.getCesiumScene().canvas);
        handler1.setInputAction((event) => {
            this.mouseUp$.next(event);
        }, Cesium.ScreenSpaceEventType.LEFT_UP);
        // 绑定鼠标移动事件
        var handler2 = new Cesium.ScreenSpaceEventHandler(this.olcusium3.getCesiumScene().canvas);
        handler2.setInputAction((event) => {
            this.mouseMove$.next(event);
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        // 地图拖拽事件
        this.olcusium.on('pointerdrag', (event) => {
            this.mapMouseMove$.next(event);
        });

        this.olcusium.on('pointermove', (evt) => {
            if (evt.dragging) {
                return;
            }
            var pixel = this.olcusium.getEventPixel(evt.originalEvent);
            this.mouseMovePixelPos.next(pixel);
        });

        this.olcusium.on('click', (evt) => {
            this.mouseClickPixelPos$.next(evt.pixel)
        });
    }

    onBindFocus() {
        let uuid = uid.v1();
        this.mouseDown$
            .do(() => {
                // do something
            })
            .map(event => {
                uuid = uid.v1();
                return ({
                    event,
                    uuid: uuid
                });
            })
            .switchMap(initialState => {
                const _uuid = initialState.uuid;
                return this.mouseMove$.map((moveEvent) => {
                    return {
                        uuid: _uuid,
                        downPos: initialState.event,
                        movePos: {
                            moveEvent
                        }
                    }
                }).takeUntil(this.mouseUp$);
            })
            .subscribe(pos => {
                if (uuid === pos.uuid) {
                    uuid = uid.v1();
                    this.ol.makeFocus(pos);
                } else {
                    return;
                }
            });
        this.mapMouseMove$.debounceTime(150).subscribe((pos) => {
            uuid = uid.v1();
            this.ol.makeFocus(pos)
        });
    }
}
