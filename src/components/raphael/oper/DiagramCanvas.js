import Raphael from 'Raphael';
import Color from './Color.js';
import LineBreakMeasurer from "./LineBreakMeasurer.js";

import {
    Polyline,
    Poligone
} from './Polyline.js';

/** 常量信息 */

const ARROW_HEAD_SIMPLE = "simple";
const ARROW_HEAD_EMPTY = "empty";
const ARROW_HEAD_FILL = "FILL";
const MULTILINE_VERTICAL_ALIGN_TOP = "top";
// 多行文本垂直居中
const MULTILINE_VERTICAL_ALIGN_MIDDLE = "middle";
const MULTILINE_VERTICAL_ALIGN_BOTTOM = "bottom";
const MULTILINE_HORIZONTAL_ALIGN_LEFT = "start";
// 多行文本水平居中
const MULTILINE_HORIZONTAL_ALIGN_MIDDLE = "middle";
const MULTILINE_HORIZONTAL_ALIGN_RIGHT = "end";

// 线宽信息
// 正常线宽
const NORMAL_STROKE = 1;
const SEQUENCEFLOW_STROKE = 1.5;
const SEQUENCEFLOW_HIGHLIGHT_STROKE = 2;
const THICK_TASK_BORDER_STROKE = 2.5;
const GATEWAY_TYPE_STROKE = 3.2;
const END_EVENT_STROKE = NORMAL_STROKE + 2;
const MULTI_INSTANCE_STROKE = 1.3;
const EVENT_SUBPROCESS_ATTRS = {
    "stroke": Color.black,
    "stroke-width": NORMAL_STROKE,
    "stroke-dasharray": ". "
};

// 字体信息
// 正常字体
const NORMAL_FONT = {
    font: "10px Arial",
    opacity: 1,
    fill: "#000000"
};
const LABEL_FONT = {
    font: "11px Arial",
    "font-style": "italic",
    opacity: 1,
    "fill": LABEL_COLOR
};
const LABEL_FONT_SMOOTH = {
    font: "10px Arial",
    "font-style": "italic",
    opacity: 1,
    "fill": LABEL_COLOR,
    stroke: LABEL_COLOR,
    "stroke-width": .4
};
const TASK_FONT = {
    font: "14px Arial",
    opacity: 1,
    fill: Color.black
};
// 开始节点字体
const START_FONT = {
    font: "14px Arial",
    opacity: 1,
    fill: Color.white
}
// 结束节点字体
const END_FONT = {
    font: "14px Arial",
    opacity: 1,
    fill: Raphael.getRGB("#FA5555 ")
}

const TASK_FONT_SMOOTH = {
    font: "11px Arial",
    opacity: 1,
    fill: Color.black,
    stroke: LABEL_COLOR,
    "stroke-width": .4
};
const POOL_LANE_FONT = {
    font: "11px Arial",
    opacity: 1,
    fill: Color.black
};
const EXPANDED_SUBPROCESS_FONT = {
    font: "11px Arial",
    opacity: 1,
    fill: Color.black
};

const CONNECTION_TYPE = {
    SEQUENCE_FLOW: "sequence_flow",
    MESSAGE_FLOW: "message_flow",
    ASSOCIATION: "association"
};

// 文本信息框外边距
const TEXT_PADDING = 3;
const ARROW_WIDTH = 4;
const CONDITIONAL_INDICATOR_WIDTH = 16;
const MARKER_WIDTH = 12;
const ANNOTATION_TEXT_PADDING = 7;
const ICON_SIZE = 30;
const ICON_PADDING = 4;
const USERTASK_IMAGE = require("../images/deployer/user.png");

// Task元素拐角弧度
const TASK_CORNER_ROUND = 10;
const EXPANDED_SUBPROCESS_CORNER_ROUND = 10;

// 绘图颜色
// 活动背景颜色
const TASK_COLOR = Raphael.getRGB("#F9FAFC	"); // original: Color.get(255, 255, 204);
// 已流转活动背景颜色
const TASK_FLOWED_COLOR = Raphael.getRGB("#D7F0EA	");
// 当前流转活动背景颜色
const TASK_CURRENT_COLOR = Raphael.getRGB("#D3E5F9	");
// 活动边框颜色
const TASK_STROKE_COLOR = Raphael.getRGB("#99A9BF  ");
// 已流转活动边框颜色
const TASK_FLOWED_STROKE_COLOR = Raphael.getRGB("#37B293  ");
// 当前流转活动边框颜色
const TASK_CURRENT_STROKE_COLOR = Raphael.getRGB("#237BE5  ");
// 连接线颜色
const SEQUENCEFLOW_COLOR = Raphael.getRGB("#00306C  ");
//
const IMAGE_STROKE_COLOR = Raphael.getRGB("#49a3de  ");

//var EXPANDED_SUBPROCESS_ATTRS = Color.black; /*Color.SlateGrey; */
const BOUNDARY_EVENT_COLOR = Color.white;
const CONDITIONAL_INDICATOR_COLOR = Color.get(255, 255, 255);
const HIGHLIGHT_COLOR = Color.Firebrick1;
//var SEQUENCEFLOW_COLOR = Color.DimGrey;
// const SEQUENCEFLOW_COLOR = Color.black;

const CATCHING_EVENT_COLOR = Color.black; /* Color.SlateGrey; */
// 开始节点颜色
const START_EVENT_COLOR = Raphael.getRGB("#67C23A ");
// 结束节点颜色
const END_EVENT_COLOR = Raphael.getRGB("#FA5555 ");
const NONE_END_EVENT_COLOR = Raphael.getRGB("#FA5555 ");

const START_EVENT_STROKE_COLOR = Color.black; /* Color.SlateGrey; */

//var END_EVENT_STROKE_COLOR = Color.black;

const NONE_END_EVENT_STROKE_COLOR = Color.Firebrick4;
const ERROR_END_EVENT_COLOR = Color.Firebrick;
const ERROR_END_EVENT_STROKE_COLOR = Color.Firebrick;
//var LABEL_COLOR = Color.get(112, 146, 190);
const LABEL_COLOR = Color.get(72, 106, 150);

class DiagramCanvas {
    constructor() {

    }
}

DiagramCanvas.prototype = {
    // 活动限制
    options: null,
    canvasHolder: "holder",
    canvasWidth: 0,
    canvasHeight: 0,
    paint: Color.black,
    strokeWidth: 0,
    font: null,
    fontSmoothing: null,

    init(processDefinitionId, options, width, height) {
        this.options = options;

        // TODO: name it as 'canvasName'
        if (!processDefinitionId)
            processDefinitionId = "holder";

        this.processDefinitionId = processDefinitionId;
        this.canvasHolder = this.processDefinitionId;

        var h = document.getElementById(this.canvasHolder);
        if (!h) return;

        h.style.width = width + 'px';
        h.style.height = height + 'px';

        this.g = Raphael(this.canvasHolder);
        this.g.clear();

        this.g.setSize(width, height);

        this.setPaint(Color.black);
        this.setStroke(NORMAL_STROKE);
        this.setFont(NORMAL_FONT);

        this.fontSmoothing = true;

        // ninja!
        this.RaphaelOriginal = Raphael;
        this.ninjaPaper = (function (local_raphael) {
            var paper = local_raphael(1, 1, 1, 1, processDefinitionId);
            return paper;
        })(Raphael.ninja());

    },

    /**
     * 为图表元素添加响应事件
     * @param {*} set 
     * @param {*} x 
     * @param {*} y 
     * @param {*} width 
     * @param {*} height 
     * @param {*} type 
     */
    addHandlers(set, x, y, width, height, type) {
        let contextObject = this.getConextObject();

        var cx = x + width / 2,
            cy = y + height / 2;
        if (type == "event") {
            var border = this.g.ellipse(cx, cy, width / 2 + 4, height / 2 + 4);
            var overlay = this.g.ellipse(cx, cy, width / 2, height / 2);
        } else if (type == "gateway") {
            // rhombus
            var border = this.g.path("M" + (x - 4) + " " + (y + (height / 2)) +
                "L" + (x + (width / 2)) + " " + (y + height + 4) +
                "L" + (x + width + 4) + " " + (y + (height / 2)) +
                "L" + (x + (width / 2)) + " " + (y - 4) +
                "z");
            var overlay = this.g.path("M" + x + " " + (y + (height / 2)) +
                "L" + (x + (width / 2)) + " " + (y + height) +
                "L" + (x + width) + " " + (y + (height / 2)) +
                "L" + (x + (width / 2)) + " " + y +
                "z");
        } else if (type == "task") {
            var border = this.g.rect(x - 4, y - 4, width + 9, height + 9, TASK_CORNER_ROUND + 4);
            var overlay = this.g.rect(x, y, width, height, TASK_CORNER_ROUND);
        }

        border.attr({
            stroke: Color.get(132, 112, 255) /*Color.Tan1*/ ,
            "stroke-width": 4,
            opacity: 0.0
        });
        border.id = contextObject.id + "_border";

        set.push(border);

        overlay.attr({
            stroke: Color.Orange,
            "stroke-width": 3,
            fill: Color.get(0, 0, 0),
            opacity: 0.0,
            cursor: "hand"
        });
        overlay.data("set", set);
        overlay.id = contextObject.id;
        overlay.data("contextObject", contextObject);

        var instance = this;
        // 添加响应事件
        // overlay.mousedown(function (event) {
        //   if (event.button == 2) instance.onRightClick(event, instance, this);
        // });
        overlay.click(function (event) {
            instance.onClick(event, instance, this);
        });
        overlay.hover(function (event) {
            instance.onHoverIn(event, instance, this);
        }, function (event) {
            instance.onHoverOut(event, instance, this);
        });
    },

    /**
     * 图表元素鼠标移入响应事件
     * @param {*} event 
     * @param {*} instance 
     * @param {*} element 
     */
    onHoverIn(event, instance, element) {
        var overlay = element;
        var set = overlay.data("set");
        var contextObject = overlay.data("contextObject");

        // 设置边框高亮
        let border = instance.g.getById(contextObject.id + "_border");
        border.attr("opacity", 0.3);

        // 判断是否传入事件响应函数
        if (this.options && this.options.on && this.options.on.over) {
            let args = [instance, element, contextObject];
            this.options.on.over(event, args);
        }
    },
    /**
     * 图表元素鼠标移出响应事件
     * @param {*} event 
     * @param {*} instance 
     * @param {*} element 
     */
    onHoverOut(event, instance, element) {
        var overlay = element;
        var set = overlay.data("set");
        var contextObject = overlay.data("contextObject");

        // 取消边框高亮
        let border = instance.g.getById(contextObject.id + "_border");
        border.attr("opacity", 0.0);

        // 判断是否传入事件响应函数
        if (this.options && this.options.on && this.options.on.out) {
            let args = [instance, element, contextObject];
            this.options.on.out.apply(event, args);
        }
    },

    /**
     * 图表元素鼠标点击响应事件
     * @param {*} event 
     * @param {*} instance 
     * @param {*} element 
     */
    onClick(event, instance, element) {
        var overlay = element;
        var set = overlay.data("set");
        var contextObject = overlay.data("contextObject");

        // 取消边框高亮
        let border = instance.g.getById(contextObject.id + "_border");
        border.attr("opacity", 0.0);

        // 判断是否传入事件响应函数
        if (this.options && this.options.on && this.options.on.click) {
            let args = [instance, element, contextObject];
            this.options.on.click.apply(event, args);
        }
    },


    /**
     * 绘制UserTask类型活动
     * @param name 活动名称
     * @param x X坐标
     * @param y Y坐标
     * @param width 宽度
     * @param height 高度
     */
    drawUserTask(name, x, y, width, height) {
        this.g.setStart();
        this.drawTask(name, x, y, width, height);

        let contextObject = this.getConextObject();

        if (contextObject.properties.activityInfo) {

            for (let i = 0; i < contextObject.properties.activityInfo.length; i++) {
                // 最多只放置两个头像
                // if (i > 1) {
                //     break;
                // }
                let userId = contextObject.properties.activityInfo[i].userId;

                if (userId) {
                    let userImage = constants.IMAGE_USER_URL + "/" + userId;

                    // 设置图片为圆形
                    // var circle = this.g.ellipse(x + ICON_PADDING * (i + 1) + ICON_SIZE / 2 + i * ICON_SIZE, y + height - ICON_PADDING - ICON_SIZE / 2, ICON_SIZE / 2, ICON_SIZE / 2);

                    // circle.attr({
                    //     "fill": 'url("' + userImage + '")',
                    //     width: 30,
                    //     height: 30,
                    //     "stroke": IMAGE_STROKE_COLOR,
                    // });

                    // var circle = this.g.ellipse(x + ICON_PADDING * (i + 1) + ICON_SIZE / 3 + i * ICON_SIZE, y + height - ICON_PADDING - ICON_SIZE / 3, ICON_SIZE / 3, ICON_SIZE / 3);

                    // circle.attr({
                    //     // fill: '1',
                    //     width: 15,
                    //     height: 15,
                    //     "stroke": IMAGE_STROKE_COLOR,
                    // });

                    let info = contextObject.properties.activityInfo[i].index + "";

                    var text = this.g.text(x + ICON_PADDING + ICON_SIZE / 4 + i * 20, y + height - ICON_PADDING - ICON_SIZE / 4, info);

                    text.attr({
                        stroke: IMAGE_STROKE_COLOR,
                        fill: "#49a3de",
                        "font-size": "15px",
                        width: 15,
                        height: 15,
                    })

                    // let img = this.g.image(userImage, x + ICON_PADDING, y + height - ICON_PADDING - ICON_SIZE, ICON_SIZE, ICON_SIZE);
                }
            }

        }
        let set = this.g.setFinish();

        // 添加活动事件
        this.addHandlers(set, x, y, width, height, "task");
    },

    /**
     * 绘制Task活动
     * @param {*} name 
     * @param {*} x 
     * @param {*} y 
     * @param {*} width 
     * @param {*} height 
     * @param {*} thickBorder 
     */
    drawTask(name, x, y, width, height, thickBorder) {
        // 设置Task活动绘图颜色
        let originalPaint = this.getPaint();

        let contextObject = this.getConextObject();
        let strokeColor = TASK_STROKE_COLOR;

        if (contextObject) {
            if (contextObject.getProperty('currentActiviti') == false) {
                this.setPaint(TASK_FLOWED_COLOR);
                strokeColor = TASK_FLOWED_STROKE_COLOR;
            } else if (contextObject.getProperty('currentActiviti') == true) {
                this.setPaint(TASK_CURRENT_COLOR);
                strokeColor = TASK_CURRENT_STROKE_COLOR;
            } else {
                this.setPaint(TASK_COLOR);
            }
        } else {
            this.setPaint(TASK_COLOR);
        }

        // 设置边框宽度
        let strokeWidth = 2;

        // 绘制活动的矩形
        let shape = this.g.rect(x, y, width, height, TASK_CORNER_ROUND);
        shape.attr({
            "stroke-width": strokeWidth,
            stroke: strokeColor,
            fill: this.getPaint()
        });
        //shape.attr({fill: "90-"+this.getPaint()+"-" + Color.get(250, 250, 244)});

        // 设置绘制活动的属性
        if (contextObject) {
            shape.id = contextObject.id;
            shape.data("contextObject", contextObject);
        }

        // 重置画笔
        this.setPaint(originalPaint);

        // 绘制边框的阴影
        this.drawShaddow(shape);

        // 绘制活动文字信息
        if (name) {
            var boxWidth = width - (2 * TEXT_PADDING);
            var boxHeight = height - ICON_PADDING - MARKER_WIDTH - 2 - 2;
            var boxX = x + width / 2 - boxWidth / 2;
            var boxY = y + height / 2 - boxHeight / 2 + ICON_PADDING - 2 - 2;

            this.drawTaskLabel(name, boxX, boxY, boxWidth, boxHeight);
        }
    },

    /**
     * 绘制图形阴影
     * @param {*} object 
     */
    drawShaddow(object) {
        var border = object.clone();
        border.attr({
            "stroke-width": this.strokeWidth + 6,
            "stroke": Color.white,
            "fill": Color.white,
            "opacity": 1,
            "stroke-dasharray": null
        });
        //border.toBack();
        object.toFront();

        return border;
    },



    /**
     * 绘制活动箭头连接线
     * @param {*} waypoints 
     * @param {*} conditional 
     * @param {*} isDefault 
     * @param {*} highLighted 
     */
    drawSequenceflow(waypoints, conditional, isDefault, highLighted) {
        var withArrowHead = true;
        this.drawFlow(waypoints, conditional, isDefault, highLighted, withArrowHead, CONNECTION_TYPE.SEQUENCE_FLOW);
    },

    /**
     * 绘制活动连接线
     * @param {*} waypoints 
     * @param {*} conditional 
     * @param {*} isDefault 
     * @param {*} highLighted 
     * @param {*} withArrowHead 是否带箭头
     * @param {*} connectionType 
     */
    drawFlow(waypoints, conditional, isDefault, highLighted, withArrowHead, connectionType) {
        var originalPaint = this.getPaint();
        var originalStroke = this.getStroke();

        this.setPaint(SEQUENCEFLOW_COLOR);
        this.setStroke(SEQUENCEFLOW_STROKE);

        if (highLighted) {
            this.setPaint(HIGHLIGHT_COLOR);
            this.setStroke(SEQUENCEFLOW_HIGHLIGHT_STROKE);
        }

        // TODO: generate polylineId or do something!!
        var uuid = Raphael.createUUID();

        var contextObject = this.getConextObject();
        var newWaypoints = waypoints;
        if (contextObject) {
            var newWaypoints = this.connectFlowToActivity(contextObject.sourceActivityId, contextObject.destinationActivityId, waypoints);

            if (!newWaypoints) {
                console.error("Error draw flow from '" + contextObject.sourceActivityId + "' to '" + contextObject.destinationActivityId + "' ");
                return;
            }
        }

        var polyline = new Polyline(uuid, newWaypoints, this.getStroke());
        //var polyline = new Polyline(waypoints, 3);

        polyline.element = this.g.path(polyline.path);
        polyline.element.attr("stroke-width", this.getStroke());
        polyline.element.attr("stroke", this.getPaint());

        if (contextObject) {
            polyline.element.id = contextObject.id;
            polyline.element.data("contextObject", contextObject);
        } else {
            polyline.element.id = uuid;
        }


        /*
        polyline.element.mouseover(function(){
        	this.attr({"stroke-width": NORMAL_STROKE + 2});
        }).mouseout(function(){
        	this.attr({"stroke-width": NORMAL_STROKE});
        });
        */

        var last = polyline.getAnchorsCount() - 1;
        var x = polyline.getAnchor(last).x;
        var y = polyline.getAnchor(last).y;
        //var c = this.g.ellipse(x, y, 5, 5);

        var lastLineIndex = polyline.getLinesCount() - 1;
        var line = polyline.getLine(lastLineIndex);
        var firstLine = polyline.getLine(0);

        var arrowHead = null,
            circleTail = null,
            defaultSequenceFlowIndicator = null,
            conditionalSequenceFlowIndicator = null;

        if (connectionType == CONNECTION_TYPE.MESSAGE_FLOW) {
            circleTail = this._drawCircleTail(firstLine, connectionType);
        }
        if (withArrowHead)
            arrowHead = this.drawArrowHead(line, connectionType);

        //console.log("isDefault: ", isDefault, ", isDefaultConditionAvailable: ", polyline.isDefaultConditionAvailable);
        if (isDefault && polyline.isDefaultConditionAvailable) {
            //var angle = polyline.getLineAngle(0);
            //console.log("firstLine", firstLine);
            defaultSequenceFlowIndicator = this._drawDefaultSequenceFlowIndicator(firstLine);
        }

        if (conditional) {
            conditionalSequenceFlowIndicator = this._drawConditionalSequenceFlowIndicator(firstLine);
        }

        // draw flow name
        var flowName = contextObject.name;
        if (flowName) {
            var xPointArray = contextObject.xPointArray;
            var yPointArray = contextObject.yPointArray;
            var textX = xPointArray[0] < xPointArray[1] ? xPointArray[0] : xPointArray[1];
            var textY = yPointArray[0] < yPointArray[1] ? yPointArray[1] : yPointArray[0];
            // fix xy
            textX += 20;
            textY -= 10;
            this.g.text(textX, textY, flowName).attr(LABEL_FONT);
        }

        var st = this.g.set();
        st.push(polyline.element, arrowHead, circleTail, conditionalSequenceFlowIndicator);
        polyline.element.data("set", st);
        polyline.element.data("withArrowHead", withArrowHead);

        var polyCloneAttrNormal = {
            "stroke-width": this.getStroke() + 5,
            stroke: Color.get(132, 112, 255),
            opacity: 0.0,
            cursor: "hand"
        };
        var polyClone = st.clone().attr(polyCloneAttrNormal).hover(function () {
            //if (polyLine.data("isSelected")) return;
            polyClone.attr({
                opacity: 0.2
            });
        }, function () {
            //if (polyLine.data("isSelected")) return;
            polyClone.attr({
                opacity: 0.0
            });
        });
        polyClone.data("objectId", polyline.element.id);
        polyClone.click(function () {
            var instance = this;
            var objectId = instance.data("objectId");
            var object = this.paper.getById(objectId);
            var contextObject = object.data("contextObject");
            // if (contextObject) {
            //   console.log("[flow], objectId: " + object.id + ", flow: " + contextObject.flow);
            //   ProcessDiagramGenerator.showFlowInfo(contextObject);
            // }
        }).dblclick(function () {
            console.log("!!! DOUBLE CLICK !!!");
        }).hover(function (mouseEvent) {
            var instance = this;
            var objectId = instance.data("objectId");
            var object = this.paper.getById(objectId);
            var contextObject = object.data("contextObject");
            // if (contextObject) {
            //   ProcessDiagramGenerator.showFlowInfo(contextObject);
            // }
        });
        polyClone.data("parentId", uuid);

        if (!connectionType || connectionType == CONNECTION_TYPE.SEQUENCE_FLOW)
            polyline.element.attr("stroke-width", this.getStroke());
        else if (connectionType == CONNECTION_TYPE.MESSAGE_FLOW)
            polyline.element.attr({
                "stroke-dasharray": "--"
            });
        else if (connectionType == CONNECTION_TYPE.ASSOCIATION)
            polyline.element.attr({
                "stroke-dasharray": ". "
            });

        this.setPaint(originalPaint);
        this.setStroke(originalStroke);
    },

    /**
     * 绘制箭头
     * @param {*} line 
     * @param {*} connectionType 
     */
    drawArrowHead(line, connectionType) {
        var doubleArrowWidth = 2 * ARROW_WIDTH;

        if (connectionType == CONNECTION_TYPE.ASSOCIATION)
            var arrowHead = this.g.path("M-" + (ARROW_WIDTH / 2 + .5) + " -" + doubleArrowWidth + "L 0 0 L" + (ARROW_WIDTH / 2 + .5) + " -" + doubleArrowWidth);
        else
            var arrowHead = this.g.path("M0 0L-" + (ARROW_WIDTH / 2 + .5) + " -" + doubleArrowWidth + "L" + (ARROW_WIDTH / 2 + .5) + " -" + doubleArrowWidth + "z");

        //arrowHead.transform("t" + 0 + ",-" + this.getStroke() + "");

        // anti smoothing
        if (this.strokeWidth % 2 == 1)
            line.x2 += .5, line.y2 += .5;

        arrowHead.transform("t" + line.x2 + "," + line.y2 + "");
        arrowHead.transform("...r" + Raphael.deg(line.angle - Math.PI / 2) + " " + 0 + " " + 0);

        if (!connectionType || connectionType == CONNECTION_TYPE.SEQUENCE_FLOW)
            arrowHead.attr("fill", SEQUENCEFLOW_COLOR);
        else if (connectionType == CONNECTION_TYPE.MESSAGE_FLOW)
            arrowHead.attr("fill", Color.white);

        arrowHead.attr("stroke-width", this.getStroke());
        arrowHead.attr("stroke", this.getPaint());

        return arrowHead;
    },

    /**
     * 连接流程线到活动
     * @param {*} sourceActivityId 
     * @param {*} destinationActivityId 
     * @param {*} waypoints 
     */
    connectFlowToActivity(sourceActivityId, destinationActivityId, waypoints) {
        var sourceActivity = this.g.getById(sourceActivityId);
        var destinationActivity = this.g.getById(destinationActivityId);
        if (sourceActivity == null || destinationActivity == null) {
            if (sourceActivity == null)
                console.error("source activity[" + sourceActivityId + "] not found");
            else
                console.error("destination activity[" + destinationActivityId + "] not found");
            return null;
        }
        var bbSourceActivity = sourceActivity.getBBox()
        var bbDestinationActivity = destinationActivity.getBBox()

        var path = [];
        var newWaypoints = [];
        for (var i = 0; i < waypoints.length; i++) {
            var pathType = ""
            if (i == 0)
                pathType = "M";
            else
                pathType = "L";

            path.push([pathType, waypoints[i].x, waypoints[i].y]);
            newWaypoints.push({
                x: waypoints[i].x,
                y: waypoints[i].y
            });
        }

        var ninjaPathSourceActivity = this.ninjaPaper.path(sourceActivity.realPath);
        var ninjaPathDestinationActivity = this.ninjaPaper.path(destinationActivity.realPath);
        var ninjaBBSourceActivity = ninjaPathSourceActivity.getBBox();
        var ninjaBBDestinationActivity = ninjaPathDestinationActivity.getBBox();

        // set target of the flow to the center of the taskObject
        var newPath = path;
        var originalSource = {
            x: newPath[0][1],
            y: newPath[0][2]
        };
        var originalTarget = {
            x: newPath[newPath.length - 1][1],
            y: newPath[newPath.length - 1][2]
        };
        newPath[0][1] = ninjaBBSourceActivity.x + (ninjaBBSourceActivity.x2 - ninjaBBSourceActivity.x) / 2;
        newPath[0][2] = ninjaBBSourceActivity.y + (ninjaBBSourceActivity.y2 - ninjaBBSourceActivity.y) / 2;
        newPath[newPath.length - 1][1] = ninjaBBDestinationActivity.x + (ninjaBBDestinationActivity.x2 - ninjaBBDestinationActivity.x) / 2;
        newPath[newPath.length - 1][2] = ninjaBBDestinationActivity.y + (ninjaBBDestinationActivity.y2 - ninjaBBDestinationActivity.y) / 2;

        var ninjaPathFlowObject = this.ninjaPaper.path(newPath);
        var ninjaBBFlowObject = ninjaPathFlowObject.getBBox();

        var intersectionsSource = Raphael.pathIntersection(ninjaPathSourceActivity.realPath, ninjaPathFlowObject.realPath);
        var intersectionsDestination = Raphael.pathIntersection(ninjaPathDestinationActivity.realPath, ninjaPathFlowObject.realPath);
        var intersectionSource = intersectionsSource.pop();
        var intersectionDestination = intersectionsDestination.pop();

        if (intersectionSource != undefined) {
            if (this.gebug) {
                var diameter = 5;
                var dotOriginal = this.g.ellipse(originalSource.x, originalSource.y, diameter, diameter).attr({
                    "fill": Color.white,
                    "stroke": Color.Pink
                });
                var dot = this.g.ellipse(intersectionSource.x, intersectionSource.y, diameter, diameter).attr({
                    "fill": Color.white,
                    "stroke": Color.Green
                });
            }

            newWaypoints[0].x = intersectionSource.x;
            newWaypoints[0].y = intersectionSource.y;
        }
        if (intersectionDestination != undefined) {
            if (this.gebug) {
                var diameter = 5;
                var dotOriginal = this.g.ellipse(originalTarget.x, originalTarget.y, diameter, diameter).attr({
                    "fill": Color.white,
                    "stroke": Color.Red
                });
                var dot = this.g.ellipse(intersectionDestination.x, intersectionDestination.y, diameter, diameter).attr({
                    "fill": Color.white,
                    "stroke": Color.Blue
                });
            }

            newWaypoints[newWaypoints.length - 1].x = intersectionDestination.x;
            newWaypoints[newWaypoints.length - 1].y = intersectionDestination.y;
        }

        this.ninjaPaper.clear();
        return newWaypoints;
    },

    /*
     * Start Events:
     * 
     *	drawNoneStartEvent
     *	drawTimerStartEvent
     *	drawMessageStartEvent
     *	drawErrorStartEvent
     *	drawSignalStartEvent
     *	_drawStartEventImage
     *	_drawStartEvent
     */

    drawNoneStartEvent: function (x, y, width, height) {
        this.g.setStart();

        var isInterrupting = undefined;
        this._drawStartEvent(x, y, width, height, isInterrupting, null);

        var set = this.g.setFinish();
        this.addHandlers(set, x, y, width, height, "event");
    },

    drawTimerStartEvent: function (x, y, width, height, isInterrupting, name) {
        this.g.setStart();

        this._drawStartEvent(x, y, width, height, isInterrupting, null);

        var cx = x + width / 2 - this.getStroke() / 4;
        var cy = y + height / 2 - this.getStroke() / 4;

        var w = width * .9; // - this.getStroke()*2;
        var h = height * .9; // - this.getStroke()*2;

        this._drawClock(cx, cy, w, h);

        if (this.gebug)
            var center = this.g.ellipse(cx, cy, 3, 3).attr({
                stroke: "none",
                fill: Color.green
            });

        var set = this.g.setFinish();
        this.addHandlers(set, x, y, width, height, "event");
    },

    drawMessageStartEvent: function (x, y, width, height, isInterrupting, name) {
        this.g.setStart();

        this._drawStartEvent(x, y, width, height, isInterrupting, null);

        this._drawStartEventImage(x, y, width, height, MESSAGE_CATCH_IMAGE);

        var set = this.g.setFinish();
        this.addHandlers(set, x, y, width, height, "event");
    },

    drawErrorStartEvent: function (x, y, width, height, name) {
        this.g.setStart();
        var isInterrupting = undefined;
        this._drawStartEvent(x, y, width, height, isInterrupting);

        this._drawStartEventImage(x, y, width, height, ERROR_CATCH_IMAGE);

        var set = this.g.setFinish();
        this.addHandlers(set, x, y, width, height, "event");
    },

    drawSignalStartEvent: function (x, y, width, height, isInterrupting, name) {
        this.g.setStart();
        this._drawStartEvent(x, y, width, height, isInterrupting, null);

        this._drawStartEventImage(x, y, width, height, SIGNAL_CATCH_IMAGE);

        var set = this.g.setFinish();
        this.addHandlers(set, x, y, width, height, "event");
    },

    drawMultipleStartEvent: function (x, y, width, height, isInterrupting, name) {
        this.g.setStart();

        this._drawStartEvent(x, y, width, height, isInterrupting, null);

        var cx = x + width / 2 - this.getStroke() / 4;
        var cy = y + height / 2 - this.getStroke() / 4;

        var w = width * 1;
        var h = height * 1;

        this._drawPentagon(cx, cy, w, h);

        var set = this.g.setFinish();
        this.addHandlers(set, x, y, width, height, "event");
    },

    _drawStartEventImage: function (x, y, width, height, image) {
        var cx = x + width / 2 - this.getStroke() / 2;
        var cy = y + height / 2 - this.getStroke() / 2;

        var w = width * .65; // - this.getStroke()*2;
        var h = height * .65; // - this.getStroke()*2;

        var img = this.g.image(image, cx - w / 2, cy - h / 2, w, h);
    },
    _drawStartEvent: function (x, y, width, height, isInterrupting) {
        var originalPaint = this.getPaint();
        if (typeof (START_EVENT_STROKE_COLOR) != "undefined")
            this.setPaint(START_EVENT_STROKE_COLOR);


        width -= this.strokeWidth / 2;
        height -= this.strokeWidth / 2;

        x = x + width / 2;
        y = y + height / 2;

        var circle = this.g.ellipse(x, y, width / 2, height / 2);

        circle.attr({
            "stroke-width": this.strokeWidth,
            "stroke": this.paint,
            //"stroke": START_EVENT_STROKE_COLOR,
            "fill": START_EVENT_COLOR
        });

        // white shaddow
        this.drawShaddow(circle);

        if (isInterrupting != null && isInterrupting != undefined && !isInterrupting)
            circle.attr({
                "stroke-dasharray": NON_INTERRUPTING_EVENT_STROKE
            });

        this.setContextToElement(circle);


        // 绘制活动文字信息

        var boxWidth = width;
        var boxHeight = height;
        var boxX = x - boxWidth / 2;
        var boxY = y - boxHeight / 2 + ICON_PADDING + 2;

        this.drawStartEventLabel("始", boxX, boxY, boxWidth, boxHeight);

        this.setPaint(originalPaint);
    },

    /*
     * End Events:
     * 
     *	drawNoneEndEvent
     *	drawErrorEndEvent
     *	drawMessageEndEvent
     *	drawSignalEndEvent
     *	drawMultipleEndEvent
     *  _drawEndEventImage
     *	_drawNoneEndEvent
     */

    drawNoneEndEvent: function (x, y, width, height) {
        this.g.setStart();

        this._drawNoneEndEvent(x, y, width, height, null, "noneEndEvent");

        var set = this.g.setFinish();
        this.addHandlers(set, x, y, width, height, "event");
    },

    drawErrorEndEvent: function (x, y, width, height) {
        this.g.setStart();
        var type = "errorEndEvent";
        this._drawNoneEndEvent(x, y, width, height, null, type);

        this._drawEndEventImage(x, y, width, height, ERROR_THROW_IMAGE);

        var set = this.g.setFinish();
        this.addHandlers(set, x, y, width, height, "event");
    },

    drawMessageEndEvent: function (x, y, width, height, name) {
        this.g.setStart();
        var type = "errorEndEvent";
        this._drawNoneEndEvent(x, y, width, height, null, type);

        this._drawEndEventImage(x, y, width, height, MESSAGE_THROW_IMAGE);

        var set = this.g.setFinish();
        this.addHandlers(set, x, y, width, height, "event");
    },

    drawSignalEndEvent: function (x, y, width, height, name) {
        this.g.setStart();
        var type = "errorEndEvent";
        this._drawNoneEndEvent(x, y, width, height, null, type);

        this._drawEndEventImage(x, y, width, height, SIGNAL_THROW_IMAGE);

        var set = this.g.setFinish();
        this.addHandlers(set, x, y, width, height, "event");
    },

    drawMultipleEndEvent: function (x, y, width, height, name) {
        this.g.setStart();
        var type = "errorEndEvent";
        this._drawNoneEndEvent(x, y, width, height, null, type);

        var cx = x + width / 2; // - this.getStroke();
        var cy = y + height / 2; // - this.getStroke();

        var w = width * 1;
        var h = height * 1;

        var filled = true;
        this._drawPentagon(cx, cy, w, h, filled);

        var set = this.g.setFinish();
        this.addHandlers(set, x, y, width, height, "event");
    },

    drawTerminateEndEvent: function (x, y, width, height) {
        this.g.setStart();
        var type = "errorEndEvent";
        this._drawNoneEndEvent(x, y, width, height, null, type);

        var cx = x + width / 2; // - this.getStroke()/2;
        var cy = y + height / 2; // - this.getStroke()/2;

        var w = width / 2 * .6;
        var h = height / 2 * .6;

        var circle = this.g.ellipse(cx, cy, w, h).attr({
            fill: Color.black
        });

        var set = this.g.setFinish();
        this.addHandlers(set, x, y, width, height, "event");
    },

    _drawEndEventImage: function (x, y, width, height, image) {
        var cx = x + width / 2 - this.getStroke() / 2;
        var cy = y + height / 2 - this.getStroke() / 2;

        var w = width * .65;
        var h = height * .65;

        var img = this.g.image(image, cx - w / 2, cy - h / 2, w, h);
    },

    /**
     * 绘制结束节点
     * @param {*} x 
     * @param {*} y 
     * @param {*} width 
     * @param {*} height 
     * @param {*} image 
     * @param {*} type 
     */
    _drawNoneEndEvent(x, y, width, height, image, type) {
        var originalPaint = this.getPaint();
        if (typeof (CATCHING_EVENT_COLOR) != "undefined")
            this.setPaint(CATCHING_EVENT_COLOR);

        var strokeColor = this.getPaint();
        var fillColor = this.getPaint();

        if (type == "errorEndEvent") {
            strokeColor = ERROR_END_EVENT_STROKE_COLOR;
            fillColor = ERROR_END_EVENT_COLOR;
        } else if (type == "noneEndEvent") {
            strokeColor = NONE_END_EVENT_STROKE_COLOR;
            fillColor = NONE_END_EVENT_COLOR;
        } else

            // event circles
            width -= this.strokeWidth / 2;
        height -= this.strokeWidth / 2;

        x = x + width / 2; // + this.strokeWidth/2;
        y = y + width / 2; // + this.strokeWidth/2;

        // outerCircle
        var outerCircle = this.g.ellipse(x, y, width / 2, height / 2);

        // white shaddow
        var shaddow = this.drawShaddow(outerCircle);

        outerCircle.attr({
            "stroke-width": this.strokeWidth,
            "stroke": strokeColor,
            "fill": fillColor
        });

        var innerCircleX = x;
        var innerCircleY = y;
        var innerCircleWidth = width / 2 - 2;
        var innerCircleHeight = height / 2 - 2;
        var innerCircle = this.g.ellipse(innerCircleX, innerCircleY, innerCircleWidth, innerCircleHeight);
        innerCircle.attr({
            "stroke-width": this.strokeWidth,
            "stroke": strokeColor,
            "fill": Color.white
        });

        // TODO: implement it
        //var originalPaint = this.getPaint();
        //this.g.setPaint(BOUNDARY_EVENT_COLOR);

        // 绘制活动文字信息

        var boxWidth = width;
        var boxHeight = height;
        var boxX = x - boxWidth / 2;
        var boxY = y - boxHeight / 2 + ICON_PADDING + 2;

        this.drawEndEventLabel("终", boxX, boxY, boxWidth, boxHeight);

        this.setPaint(originalPaint);
    },

    /*
     * Catching Events:
     * 
     *	drawCatchingTimerEvent
     *	drawCatchingErrorEvent
     *	drawCatchingSignalEvent
     *  drawCatchingMessageEvent
     *	drawCatchingMultipleEvent
     *	_drawCatchingEventImage
     *	_drawCatchingEvent
     */


    drawCatchingTimerEvent: function (x, y, width, height, isInterrupting, name) {
        this.g.setStart();
        this._drawCatchingEvent(x, y, width, height, isInterrupting, null);

        var innerCircleWidth = width - 4;
        var innerCircleHeight = height - 4;

        var cx = x + width / 2 - this.getStroke() / 4;
        var cy = y + height / 2 - this.getStroke() / 4;

        var w = innerCircleWidth * .9; // - this.getStroke()*2;
        var h = innerCircleHeight * .9; // - this.getStroke()*2;

        this._drawClock(cx, cy, w, h);

        var set = this.g.setFinish();
        this.addHandlers(set, x, y, width, height, "event");
    },

    drawCatchingErrorEvent: function (x, y, width, height, isInterrupting, name) {
        this.g.setStart();
        this._drawCatchingEvent(x, y, width, height, isInterrupting, null);

        this._drawCatchingEventImage(x, y, width, height, ERROR_CATCH_IMAGE);

        var set = this.g.setFinish();
        this.addHandlers(set, x, y, width, height, "event");
    },

    drawCatchingSignalEvent: function (x, y, width, height, isInterrupting, name) {
        this.g.setStart();
        this._drawCatchingEvent(x, y, width, height, isInterrupting, null);

        this._drawCatchingEventImage(x, y, width, height, SIGNAL_CATCH_IMAGE);

        var set = this.g.setFinish();
        this.addHandlers(set, x, y, width, height, "event");
    },

    drawCatchingMessageEvent: function (x, y, width, height, isInterrupting, name) {
        this.g.setStart();
        this._drawCatchingEvent(x, y, width, height, isInterrupting, null);

        this._drawCatchingEventImage(x, y, width, height, MESSAGE_CATCH_IMAGE);

        var set = this.g.setFinish();
        this.addHandlers(set, x, y, width, height, "event");
    },

    drawCatchingMultipleEvent: function (x, y, width, height, isInterrupting, name) {
        this.g.setStart();
        this._drawCatchingEvent(x, y, width, height, isInterrupting, null);

        var cx = x + width / 2 - this.getStroke();
        var cy = y + height / 2 - this.getStroke();

        var w = width * .9;
        var h = height * .9;

        this._drawPentagon(cx, cy, w, h);

        var set = this.g.setFinish();
        this.addHandlers(set, x, y, width, height, "event");
    },

    _drawCatchingEventImage: function (x, y, width, height, image) {
        var innerCircleWidth = width - 4;
        var innerCircleHeight = height - 4;

        var cx = x + width / 2 - this.getStroke() / 2;
        var cy = y + height / 2 - this.getStroke() / 2;

        var w = innerCircleWidth * .6; // - this.getStroke()*2;
        var h = innerCircleHeight * .6; // - this.getStroke()*2;

        var img = this.g.image(image, cx - w / 2, cy - h / 2, w, h);
    },

    _drawCatchingEvent: function (x, y, width, height, isInterrupting, image) {
        var originalPaint = this.getPaint();
        if (typeof (CATCHING_EVENT_COLOR) != "undefined")
            this.setPaint(CATCHING_EVENT_COLOR);

        // event circles
        width -= this.strokeWidth / 2;
        height -= this.strokeWidth / 2;

        x = x + width / 2; // + this.strokeWidth/2;
        y = y + width / 2; // + this.strokeWidth/2;

        // outerCircle
        var outerCircle = this.g.ellipse(x, y, width / 2, height / 2);

        // white shaddow
        var shaddow = this.drawShaddow(outerCircle);

        //console.log("isInterrupting: " + isInterrupting, "x:" , x, "y:",y);
        if (isInterrupting != null && isInterrupting != undefined && !isInterrupting)
            outerCircle.attr({
                "stroke-dasharray": NON_INTERRUPTING_EVENT_STROKE
            });

        outerCircle.attr({
            "stroke-width": this.strokeWidth,
            "stroke": this.getPaint(),
            "fill": BOUNDARY_EVENT_COLOR
        });

        var innerCircleX = x;
        var innerCircleY = y;
        var innerCircleRadiusX = width / 2 - 4;
        var innerCircleRadiusY = height / 2 - 4;
        var innerCircle = this.g.ellipse(innerCircleX, innerCircleY, innerCircleRadiusX, innerCircleRadiusY);
        innerCircle.attr({
            "stroke-width": this.strokeWidth,
            "stroke": this.getPaint()
        });

        if (image) {
            var imageWidth = imageHeight = innerCircleRadiusX * 1.2 + this.getStroke() * 2;
            var imageX = innerCircleX - imageWidth / 2 - this.strokeWidth / 2;
            var imageY = innerCircleY - imageWidth / 2 - this.strokeWidth / 2;
            var img = this.g.image(image, imageX, imageY, imageWidth, imageHeight);
        }

        this.setPaint(originalPaint);

        var set = this.g.set();
        set.push(outerCircle, innerCircle, shaddow);
        this.setContextToElement(outerCircle);

        // TODO: add shapes to set

        /*
        var st = this.g.set();
        st.push(
        	this.g.ellipse(innerCircleX, innerCircleY, 2, 2),
        	this.g.ellipse(imageX, imageY, 2, 2)
        );
        st.attr({fill: "red", "stroke-width":0});
        */
    },

    /*
     * Catching Events:
     * 
     *	drawThrowingNoneEvent
     *	drawThrowingSignalEvent
     *	drawThrowingMessageEvent
     *	drawThrowingMultipleEvent
     */

    drawThrowingNoneEvent: function (x, y, width, height, name) {
        this.g.setStart();
        this._drawCatchingEvent(x, y, width, height, null, null);

        var set = this.g.setFinish();
        this.addHandlers(set, x, y, width, height, "event");
    },

    drawThrowingSignalEvent: function (x, y, width, height, name) {
        this.g.setStart();
        this._drawCatchingEvent(x, y, width, height, null, null);

        this._drawCatchingEventImage(x, y, width, height, SIGNAL_THROW_IMAGE);

        var set = this.g.setFinish();
        this.addHandlers(set, x, y, width, height, "event");
    },

    drawThrowingMessageEvent: function (x, y, width, height, name) {
        this.g.setStart();
        this._drawCatchingEvent(x, y, width, height, null, null);

        this._drawCatchingEventImage(x, y, width, height, MESSAGE_THROW_IMAGE);

        var set = this.g.setFinish();
        this.addHandlers(set, x, y, width, height, "event");
    },

    drawThrowingMultipleEvent: function (x, y, width, height, name) {
        this.g.setStart();
        this._drawCatchingEvent(x, y, width, height, null, null);

        var cx = x + width / 2 - this.getStroke();
        var cy = y + height / 2 - this.getStroke();

        var w = width * .9;
        var h = height * .9;

        var filled = true;
        this._drawPentagon(cx, cy, w, h, filled);

        var set = this.g.setFinish();
        this.addHandlers(set, x, y, width, height, "event");
    },

    /**
     * 绘制Task活动的文本信息
     * @param {*} text 
     * @param {*} x 
     * @param {*} y 
     * @param {*} boxWidth 
     * @param {*} boxHeight 
     */
    drawTaskLabel(text, x, y, boxWidth, boxHeight) {
        var originalFont = this.getFont();
        this.setFont(TASK_FONT);

        this.drawMultilineText(text, x, y, boxWidth, boxHeight, MULTILINE_VERTICAL_ALIGN_MIDDLE, MULTILINE_HORIZONTAL_ALIGN_MIDDLE);

        this.setFont(originalFont);
    },

    /**
     * 绘制开始节点文本信息
     * @param {*} text 
     * @param {*} x 
     * @param {*} y 
     * @param {*} boxWidth 
     * @param {*} boxHeight 
     */
    drawStartEventLabel(text, x, y, boxWidth, boxHeight) {
        var originalFont = this.getFont();
        this.setFont(START_FONT);

        this.drawMultilineText(text, x, y, boxWidth, boxHeight, MULTILINE_VERTICAL_ALIGN_MIDDLE, MULTILINE_HORIZONTAL_ALIGN_MIDDLE);

        this.setFont(originalFont);
    },

    /**
     * 绘制结束节点文本信息
     * @param {*} text 
     * @param {*} x 
     * @param {*} y 
     * @param {*} boxWidth 
     * @param {*} boxHeight 
     */
    drawEndEventLabel(text, x, y, boxWidth, boxHeight) {
        var originalFont = this.getFont();
        this.setFont(END_FONT);

        this.drawMultilineText(text, x, y, boxWidth, boxHeight, MULTILINE_VERTICAL_ALIGN_MIDDLE, MULTILINE_HORIZONTAL_ALIGN_MIDDLE);

        this.setFont(originalFont);
    },

    drawAnnotationText: function (text, x, y, width, height) {
        //this.drawMultilineText(text, x, y, width, height, "start");

        var originalPaint = this.getPaint();
        var originalFont = this.getFont();

        this.setPaint(Color.black);
        this.setFont(TASK_FONT);

        this.drawMultilineText(text, x, y, width, height, MULTILINE_VERTICAL_ALIGN_TOP, MULTILINE_HORIZONTAL_ALIGN_LEFT);

        this.setPaint(originalPaint);
        this.setFont(originalFont);
    },

    drawLabel: function (text, x, y, width, height) {
        //this.drawMultilineText(text, x, y, width, height, "start");

        var originalPaint = this.getPaint();
        var originalFont = this.getFont();

        this.setPaint(LABEL_COLOR);
        //this.setFont(LABEL_FONT);
        this.setFont(LABEL_FONT_SMOOTH);

        // predefined box width for labels
        // TODO: use label width as is, but not height (for stretching)
        if (!width || !height) {
            width = 100;
            height = 0;
        }

        // TODO: remove it. It is debug
        x = x - width / 2;

        this.drawMultilineText(text, x, y, width, height, MULTILINE_VERTICAL_ALIGN_TOP, MULTILINE_HORIZONTAL_ALIGN_MIDDLE);

        this.setPaint(originalPaint);
        this.setFont(originalFont);
    },

    /**
     * 绘制多行文本
     * @param {*} text 
     * @param {*} x 
     * @param {*} y 
     * @param {*} boxWidth 
     * @param {*} boxHeight 
     * @param {*} verticalAlign 
     * @param {*} horizontalAlign 
     */
    drawMultilineText(text, x, y, boxWidth, boxHeight, verticalAlign, horizontalAlign) {
        if (!text || text == "")
            return;

        // Autostretch boxHeight if boxHeight is 0
        if (boxHeight == 0)
            verticalAlign = MULTILINE_VERTICAL_ALIGN_TOP;

        //var TEXT_PADDING = 3;
        var width = boxWidth;
        if (boxHeight)
            var height = boxHeight;

        var layouts = [];

        //var font = {font: "11px Arial", opacity: 1, "fill": LABEL_COLOR};
        var font = this.getFont();
        var measurer = new LineBreakMeasurer(this.g, x, y, text, font);
        var lineHeight = measurer.rafaelTextObject.getBBox().height;
        //console.log("text: ", text.replace(/\n/g, "?"));

        if (height) {
            var availableLinesCount = parseInt(height / lineHeight);
            //console.log("availableLinesCount: " + availableLinesCount);
        }

        var i = 1;
        while (measurer.getPosition() < measurer.text.getEndIndex()) {
            var layout = measurer.nextLayout(width);
            //console.log("LAYOUT: " + layout + ", getPosition: " + measurer.getPosition());

            if (layout != null) {
                // TODO: and check if measurer has next layout. If no then don't draw  dots
                if (!availableLinesCount || i < availableLinesCount) {
                    layouts.push(layout);
                } else {
                    layouts.push(this.fitTextToWidth(layout, boxWidth));
                    break;
                }
            }
            i++;
        };
        //console.log(layouts);

        measurer.rafaelTextObject.attr({
            "text": layouts.join("\n")
        });

        if (horizontalAlign)
            measurer.rafaelTextObject.attr({
                "text-anchor": horizontalAlign
            }); // end, middle, start

        var bb = measurer.rafaelTextObject.getBBox();
        // TODO: there is somethin wrong with wertical align. May be: measurer.rafaelTextObject.attr({"y": y + height/2 - bb.height/2})
        measurer.rafaelTextObject.attr({
            "y": y + bb.height / 2
        });
        //var bb = measurer.rafaelTextObject.getBBox();

        if (measurer.rafaelTextObject.attr("text-anchor") == MULTILINE_HORIZONTAL_ALIGN_MIDDLE)
            measurer.rafaelTextObject.attr("x", x + boxWidth / 2);
        else if (measurer.rafaelTextObject.attr("text-anchor") == MULTILINE_HORIZONTAL_ALIGN_RIGHT)
            measurer.rafaelTextObject.attr("x", x + boxWidth);

        // 外边框样式
        let boxStyle = {
            stroke: Color.LightSteelBlue2,
            "stroke-width": 1.0,
            "stroke-dasharray": "- "
        };

        // 绘制文本外边框左上角及中心点
        let textAreaCX = x + boxWidth / 2;

        if (!boxHeight) boxHeight = bb.height;
        let textAreaCY = y + boxHeight / 2;
        let dotLeftTop = this.g.ellipse(x, y, 3, 3).attr({
            "stroke-width": 0,
            fill: Color.LightSteelBlue,
            stroke: "none"
        }).hide();
        let dotCenter = this.g.ellipse(textAreaCX, textAreaCY, 3, 3).attr({
            fill: Color.LightSteelBlue2,
            stroke: "none"
        }).hide();

        // 文本信息外边框
        let rect = this.g.rect(x, y, boxWidth, boxHeight).attr({
            "stroke-width": 1
        }).attr(boxStyle).hide();
        let paperSet = this.g.set();
        paperSet.push(dotLeftTop, dotCenter, rect);
    },

    drawTextAnnotation: function (text, x, y, width, height) {
        var lineLength = 18;
        var path = [];
        path.push(["M", x + lineLength, y]);
        path.push(["L", x, y]);
        path.push(["L", x, y + height]);
        path.push(["L", x + lineLength, y + height]);

        path.push(["L", x + lineLength, y + height - 1]);
        path.push(["L", x + 1, y + height - 1]);
        path.push(["L", x + 1, y + 1]);
        path.push(["L", x + lineLength, y + 1]);
        path.push(["z"]);

        var textAreaLines = this.g.path(path);

        var boxWidth = width - (2 * ANNOTATION_TEXT_PADDING);
        var boxHeight = height - (2 * ANNOTATION_TEXT_PADDING);
        var boxX = x + width / 2 - boxWidth / 2;
        var boxY = y + height / 2 - boxHeight / 2;

        // for debug
        var rectStyle = {
            stroke: Color(112, 146, 190),
            "stroke-width": 1.0,
            "stroke-dasharray": "- "
        };
        var r = this.g.rect(boxX, boxY, boxWidth, boxHeight).attr(rectStyle);
        //

        this.drawAnnotationText(text, boxX, boxY, boxWidth, boxHeight);
    },
    /**
     * 文本适应边框宽度，超过边框宽度则设置换行
     * @param {*} original 
     * @param {*} width 
     */
    fitTextToWidth(original, width) {
        var text = original;

        // TODO: move attr on parameters
        var attr = {
            font: "11px Arial",
            opacity: 0
        };

        // remove length for "..."
        var dots = this.g.text(0, 0, "...").attr(attr).hide();
        var dotsBB = dots.getBBox();

        var maxWidth = width - dotsBB.width;

        var textElement = this.g.text(0, 0, text).attr(attr).hide();
        var bb = textElement.getBBox();

        // it's a little bit incorrect with "..."
        while (bb.width > maxWidth && text.length > 0) {
            text = text.substring(0, text.length - 1);
            textElement.attr({
                "text": text
            });
            bb = textElement.getBBox();
        }

        // remove element from paper
        textElement.remove();

        if (text != original) {
            text = text + "...";
        }

        return text;
    },

    /** Get和Set访问器 */
    setPaint(color) {
        this.paint = color;
    },
    getPaint() {
        return this.paint;
    },
    setStroke(strokeWidth) {
        this.strokeWidth = strokeWidth;
    },
    getStroke() {
        return this.strokeWidth;
    },
    setFont(font) {
        this.font = font;
    },
    getFont() {
        return this.font;
    },
    setConextObject: function (obj) {
        this.contextObject = obj;
    },
    getConextObject: function () {
        return this.contextObject;
    },
    setContextToElement: function (object) {
        var contextObject = this.getConextObject();
        object.id = contextObject.id;
        object.data("contextObject", contextObject);
    },
}

export default DiagramCanvas;
