import Raphael from 'Raphael/raphael.js';
import DiagramGenerator from './oper/DiagramGenerator';

class DiagramApi {

    init(domId, diagramLayout, overFunc, outFunc, clickFunc) {
        let that = this;
        this.overFunc = overFunc;
        this.outFunc = outFunc;
        this.clickFunc = clickFunc;

        // 初始化流程图
        DiagramGenerator.init({
            diagramHolderId: domId,
            diagramLayout: diagramLayout,
            on: {
                click(canvas, element, contextObject) {
                    if (contextObject.properties.activityInfo) {
                        that.clickFunc && that.clickFunc(contextObject.properties.activityInfo, canvas);
                    }
                },
                rightClick: function (canvas, element, contextObject) {
                    var mouseEvent = this;
                    console.log("[RIGHTCLICK] mouseEvent: %o, canvas: %o, clicked element: %o, contextObject: %o", mouseEvent, canvas, element, contextObject);
                },
                over(canvas, element, contextObject) {
                    if (element[2].properties.activityInfo) {
                        that.overFunc && that.overFunc(element[2].properties.activityInfo, canvas);
                    } else {
                        that.outFunc && that.outFunc();
                    }
                },
                out(canvas, element, contextObject) {
                    that.outFunc && that.outFunc();
                }
            }
        });

        this.processDiagram = DiagramGenerator.generateDiagram(diagramLayout);

    }
}

export default new DiagramApi();
