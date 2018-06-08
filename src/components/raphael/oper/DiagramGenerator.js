import DiagramCanvas from "./DiagramCanvas.js";
import ActivitiRest from "./ActivitiRest.js";
import Activity from "./Activity.js";
import Data from "./Data.js";
import "./jquery.asyncqueue.js";

const diagramGenerator = {
    // 流程图表属性
    options: {},
    // 流程图表画布
    processDiagramCanvas: [],
    // 流程图活动元素绘制函数
    activityDrawInstructions: {},
    // 已生成的流程图表集合
    diagrams: {},

    diagramBreadCrumbs: null,
    // 流程图表初始化方法
    init(options) {
        this.options = options;

        // start event
        this.activityDrawInstructions["startEvent"] = function () {
            var activityImpl = this.activity;
            this.diagramCanvas.setConextObject(activityImpl);

            this.diagramCanvas.drawNoneStartEvent(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight());
        };

        // start timer event
        this.activityDrawInstructions["startTimerEvent"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            var isInterrupting = activityImpl.getProperty("isInterrupting");
            processDiagramCanvas.drawTimerStartEvent(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight(), isInterrupting, activityImpl.getProperty("name"));
        };

        // start event
        this.activityDrawInstructions["messageStartEvent"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            var isInterrupting = activityImpl.getProperty("isInterrupting");
            processDiagramCanvas.drawMessageStartEvent(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight(), isInterrupting, activityImpl.getProperty("name"));
        };

        // start signal event
        this.activityDrawInstructions["startSignalEvent"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            var isInterrupting = activityImpl.getProperty("isInterrupting");
            processDiagramCanvas.drawSignalStartEvent(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight(), isInterrupting, activityImpl.getProperty("name"));
        };

        // start multiple event
        this.activityDrawInstructions["startMultipleEvent"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            var isInterrupting = activityImpl.getProperty("isInterrupting");
            processDiagramCanvas.drawMultipleStartEvent(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight(), isInterrupting, activityImpl.getProperty("name"));
        };

        // signal catch
        this.activityDrawInstructions["intermediateSignalCatch"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            var isInterrupting = activityImpl.getProperty("isInterrupting");
            processDiagramCanvas.drawCatchingSignalEvent(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight(), isInterrupting, null);

            var label = ProcessDiagramGenerator.getActivitiLabel(activityImpl);
            if (label)
                processDiagramCanvas.drawLabel(label.text, label.x, label.y, label.width, label.height);
        };

        // message catch
        this.activityDrawInstructions["intermediateMessageCatch"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            var isInterrupting = activityImpl.getProperty("isInterrupting");
            processDiagramCanvas.drawCatchingMessageEvent(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight(), isInterrupting, null);

            var label = ProcessDiagramGenerator.getActivitiLabel(activityImpl);
            if (label)
                processDiagramCanvas.drawLabel(label.text, label.x, label.y, label.width, label.height);
        };

        // multiple catch
        this.activityDrawInstructions["intermediateMultipleCatch"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            var isInterrupting = activityImpl.getProperty("isInterrupting");
            processDiagramCanvas.drawCatchingMultipleEvent(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight(), isInterrupting, null);

            var label = ProcessDiagramGenerator.getActivitiLabel(activityImpl);
            if (label)
                processDiagramCanvas.drawLabel(label.text, label.x, label.y, label.width, label.height);
        };



        // signal throw
        this.activityDrawInstructions["intermediateSignalThrow"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            processDiagramCanvas.drawThrowingSignalEvent(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight(), activityImpl.getProperty("name"));

            var label = ProcessDiagramGenerator.getActivitiLabel(activityImpl);
            if (label)
                processDiagramCanvas.drawLabel(label.text, label.x, label.y, label.width, label.height);
        };

        // message throw
        this.activityDrawInstructions["intermediateMessageThrow"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            processDiagramCanvas.drawThrowingMessageEvent(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight(), activityImpl.getProperty("name"));

            var label = ProcessDiagramGenerator.getActivitiLabel(activityImpl);
            if (label)
                processDiagramCanvas.drawLabel(label.text, label.x, label.y, label.width, label.height);
        };

        // multiple throw
        this.activityDrawInstructions["intermediateMultipleThrow"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            processDiagramCanvas.drawThrowingMultipleEvent(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight(), activityImpl.getProperty("name"));

            var label = ProcessDiagramGenerator.getActivitiLabel(activityImpl);
            if (label)
                processDiagramCanvas.drawLabel(label.text, label.x, label.y, label.width, label.height);
        };

        // none throw
        this.activityDrawInstructions["intermediateThrowEvent"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            processDiagramCanvas.drawThrowingNoneEvent(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight(), activityImpl.getProperty("name"));

            var label = ProcessDiagramGenerator.getActivitiLabel(activityImpl);
            if (label)
                processDiagramCanvas.drawLabel(label.text, label.x, label.y, label.width, label.height);
        };

        // end event
        this.activityDrawInstructions["endEvent"] = function () {
            var activityImpl = this.activity;
            this.diagramCanvas.setConextObject(activityImpl);

            this.diagramCanvas.drawNoneEndEvent(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight());
        };

        // error end event
        this.activityDrawInstructions["errorEndEvent"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            processDiagramCanvas.drawErrorEndEvent(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight(), null);

            var label = ProcessDiagramGenerator.getActivitiLabel(activityImpl);
            if (label)
                processDiagramCanvas.drawLabel(label.text, label.x, label.y, label.width, label.height);
        };

        // message end event
        this.activityDrawInstructions["messageEndEvent"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            processDiagramCanvas.drawMessageEndEvent(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight(), null);

            var label = ProcessDiagramGenerator.getActivitiLabel(activityImpl);
            if (label)
                processDiagramCanvas.drawLabel(label.text, label.x, label.y, label.width, label.height);
        };

        // signal end event
        this.activityDrawInstructions["signalEndEvent"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            processDiagramCanvas.drawSignalEndEvent(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight(), null);

            var label = ProcessDiagramGenerator.getActivitiLabel(activityImpl);
            if (label)
                processDiagramCanvas.drawLabel(label.text, label.x, label.y, label.width, label.height);
        };

        // multiple end event
        this.activityDrawInstructions["multipleEndEvent"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            processDiagramCanvas.drawMultipleEndEvent(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight(), null);

            var label = ProcessDiagramGenerator.getActivitiLabel(activityImpl);
            if (label)
                processDiagramCanvas.drawLabel(label.text, label.x, label.y, label.width, label.height);
        };

        // terminate end event
        this.activityDrawInstructions["terminateEndEvent"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            processDiagramCanvas.drawTerminateEndEvent(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight());

            var label = ProcessDiagramGenerator.getActivitiLabel(activityImpl);
            if (label)
                processDiagramCanvas.drawLabel(label.text, label.x, label.y, label.width, label.height);
        };

        // error start event
        this.activityDrawInstructions["errorStartEvent"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            processDiagramCanvas.drawErrorStartEvent(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight(), activityImpl.getProperty("name"));

            var label = ProcessDiagramGenerator.getActivitiLabel(activityImpl);
            if (label)
                processDiagramCanvas.drawLabel(label.text, label.x, label.y, label.width, label.height);
        };

        // task
        this.activityDrawInstructions["task"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            // TODO:
            //console.error("task is not implemented yet");
            /*
            var activityImpl = this;
            processDiagramCanvas.drawTask(activityImpl.getProperty("name"), activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight(), thickBorder);
            */
        };


        // user task
        this.activityDrawInstructions["userTask"] = function () {
            let activityImpl = this.activity;

            this.diagramCanvas.setConextObject(activityImpl);

            this.diagramCanvas.drawUserTask(activityImpl.getProperty("name"), activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight());
        };

        // script task
        this.activityDrawInstructions["scriptTask"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            processDiagramCanvas.drawScriptTask(activityImpl.getProperty("name"), activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight());
        };

        // service task
        this.activityDrawInstructions["serviceTask"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            processDiagramCanvas.drawServiceTask(activityImpl.getProperty("name"), activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight());
        };

        // receive task
        this.activityDrawInstructions["receiveTask"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            processDiagramCanvas.drawReceiveTask(activityImpl.getProperty("name"), activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight());
        };

        // send task
        this.activityDrawInstructions["sendTask"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            processDiagramCanvas.drawSendTask(activityImpl.getProperty("name"), activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight());
        };

        // manual task
        this.activityDrawInstructions["manualTask"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            processDiagramCanvas.drawManualTask(activityImpl.getProperty("name"), activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight());
        };

        // businessRuleTask task
        this.activityDrawInstructions["businessRuleTask"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            processDiagramCanvas.drawBusinessRuleTask(activityImpl.getProperty("name"), activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight());
        };

        // exclusive gateway
        this.activityDrawInstructions["exclusiveGateway"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            processDiagramCanvas.drawExclusiveGateway(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight());
        };

        // inclusive gateway
        this.activityDrawInstructions["inclusiveGateway"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            processDiagramCanvas.drawInclusiveGateway(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight());
        };

        // parallel gateway
        this.activityDrawInstructions["parallelGateway"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            processDiagramCanvas.drawParallelGateway(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight());
        };

        // eventBasedGateway
        this.activityDrawInstructions["eventBasedGateway"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            processDiagramCanvas.drawEventBasedGateway(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight());
        };

        // Boundary timer
        this.activityDrawInstructions["boundaryTimer"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            var isInterrupting = activityImpl.getProperty("isInterrupting");
            processDiagramCanvas.drawCatchingTimerEvent(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight(), isInterrupting, null);

            var label = ProcessDiagramGenerator.getActivitiLabel(activityImpl);
            if (label)
                processDiagramCanvas.drawLabel(label.text, label.x, label.y, label.width, label.height);
        };

        // Boundary catch error
        this.activityDrawInstructions["boundaryError"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            var isInterrupting = activityImpl.getProperty("isInterrupting");
            processDiagramCanvas.drawCatchingErrorEvent(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight(), isInterrupting, null);

            var label = ProcessDiagramGenerator.getActivitiLabel(activityImpl);
            if (label)
                processDiagramCanvas.drawLabel(label.text, label.x, label.y, label.width, label.height);
        };

        // Boundary signal event
        this.activityDrawInstructions["boundarySignal"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            var isInterrupting = activityImpl.getProperty("isInterrupting");
            processDiagramCanvas.drawCatchingSignalEvent(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight(), isInterrupting, null);

            var label = ProcessDiagramGenerator.getActivitiLabel(activityImpl);
            if (label)
                processDiagramCanvas.drawLabel(label.text, label.x, label.y, label.width, label.height);
        };

        // Boundary message event
        this.activityDrawInstructions["boundaryMessage"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            var isInterrupting = activityImpl.getProperty("isInterrupting");
            processDiagramCanvas.drawCatchingMessageEvent(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight(), isInterrupting, null);

            var label = ProcessDiagramGenerator.getActivitiLabel(activityImpl);
            if (label)
                processDiagramCanvas.drawLabel(label.text, label.x, label.y, label.width, label.height);
        };

        // timer catch event
        this.activityDrawInstructions["intermediateTimer"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);

            var isInterrupting = null;
            processDiagramCanvas.drawCatchingTimerEvent(activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight(), isInterrupting, activityImpl.getProperty("name"));
        };

        // subprocess
        this.activityDrawInstructions["subProcess"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            // TODO:

            processDiagramCanvas.setConextObject(activityImpl);

            var isExpanded = activityImpl.getProperty("isExpanded");
            var isTriggeredByEvent = activityImpl.getProperty("triggeredByEvent");
            if (isTriggeredByEvent == undefined) {
                isTriggeredByEvent = true;
            }
            // TODO: check why isTriggeredByEvent = true when undefined
            isTriggeredByEvent = false;

            if (isExpanded != undefined && isExpanded == false) {
                processDiagramCanvas.drawCollapsedSubProcess(activityImpl.getProperty("name"), activityImpl.getX(), activityImpl.getY(),
                    activityImpl.getWidth(), activityImpl.getHeight(), isTriggeredByEvent);
            } else {
                processDiagramCanvas.drawExpandedSubProcess(activityImpl.getProperty("name"), activityImpl.getX(), activityImpl.getY(),
                    activityImpl.getWidth(), activityImpl.getHeight(), isTriggeredByEvent);
            }

            //console.error("subProcess is not implemented yet");
        };

        // call activity
        this.activityDrawInstructions["callActivity"] = function () {
            var activityImpl = this.activity;
            var processDiagramCanvas = this.processDiagramCanvas;
            processDiagramCanvas.setConextObject(activityImpl);
            processDiagramCanvas.drawCollapsedCallActivity(activityImpl.getProperty("name"), activityImpl.getX(), activityImpl.getY(), activityImpl.getWidth(), activityImpl.getHeight());
        };

        $(document).ready(function () {
            // Protect right click on SVG elements (and on canvas too)
            document.body.oncontextmenu = function (event) {
                if ($(window.event.srcElement).parent().attr('class') === 'cesium-widget')
                    return;
                if (window.event.srcElement.tagName == "shape" || window.event.srcElement.tagName == "DIV" && window.event.srcElement.parentElement.className == "diagram") {

                    // IE DIAGRAM CANVAS OR SHAPE DETECTED!
                    return false;
                }
                return (!Object.isSVGElement(window.event.srcElement));
            };
        });
    },

    /**
     * 生成流程图表
     */
    generateDiagram: function (diagramLayout) {
        // 初始化画布
        const processDiagram = this.initDiagramCanvas(diagramLayout);
        const diagramCanvas = processDiagram.diagramCanvas;

        let activities = diagramLayout.activities;
        let sequenceFlows = diagramLayout.sequenceFlows;

        let that = this;

        let taskAsync = new $.AsyncQueue();

        // 绘制活动

        taskAsync.add(function (taskAsync) {
            if (!activities) activities = [];
            //console.log("> draw activities, count:", activities.length)
        });

        var activitiesLength = activities.length;

        taskAsync.add(activities, function (taskAsync, activityJson) {
            var activity = new Activity(activityJson);
            activitiesLength--;

            //console.log(activitiesLength, "--> activityId: " + activity.getId() + ", name: " + activity.getProperty("name"));
            that.drawActivity(diagramCanvas, activity);
        });

        // 绘制活动之间连接线

        taskAsync.add(function (taskAsync) {
            if (!sequenceFlows) sequenceFlows = [];
            //console.log("> draw sequence flows, count:", sequenceFlows.length)
        });

        var flowsLength = sequenceFlows.length;
        taskAsync.add(sequenceFlows, function (taskAsync, flow) {
            var waypoints = [];
            for (var j in flow.xPointArray) {
                waypoints[j] = {
                    x: flow.xPointArray[j],
                    y: flow.yPointArray[j]
                };
            }
            var isDefault = flow.isDefault;
            var isConditional = flow.isConditional;
            var isHighLighted = flow.isHighLighted;

            // TODO: add source and destination for sequence flows in REST
            // parse for test
            var f = flow.flow;
            var matches = f.match(/\((.*)\)--.*-->\((.*)\)/);
            var sourceActivityId, destinationActivityId;
            if (matches != null) {
                sourceActivityId = matches[1];
                destinationActivityId = matches[2];
            }
            flow.sourceActivityId = sourceActivityId;
            flow.destinationActivityId = destinationActivityId;
            //
            flowsLength--;

            //console.log(flowsLength, "--> flow: " + flow.flow);

            if (flow.isStart) {
                isHighLighted = true;
            }
            diagramCanvas.setConextObject(flow);
            diagramCanvas.drawSequenceflow(waypoints, isConditional, isDefault, isHighLighted);
        });

        taskAsync.onComplete(function () {
            // if (progress < 100)
            //   // pb1.set('value', 100);
            //console.log("COMPLETE!!!");

            //console.timeEnd('generateDiagram');
        });

        taskAsync.run();

        return processDiagram;
    },
    /**
     * 初始化流程图表画布
     * @param {*} diagramLayout
     */
    initDiagramCanvas(diagramLayout) {

        // 获取画布的宽度和高度
        var minX = 0;
        var maxX = 0;
        var minY = 0;
        var maxY = 0;

        var activities = diagramLayout.activities;
        for (var i in activities) {
            var activityJson = activities[i];
            var activity = new Activity(activityJson);

            // width
            if (activity.getX() + activity.getWidth() > maxX) {
                maxX = activity.getX() + activity.getWidth();
            }
            if (activity.getX() < minX) {
                minX = activity.getX();
            }
            // height
            if (activity.getY() + activity.getHeight() > maxY) {
                maxY = activity.getY() + activity.getHeight();
            }
            if (activity.getY() < minY) {
                minY = activity.getY();
            }
        }

        var sequenceFlows = diagramLayout.sequenceFlows;
        for (var i in sequenceFlows) {
            var flow = sequenceFlows[i];
            var waypoints = [];
            for (var j in flow.xPointArray) {
                waypoints[j] = {
                    x: flow.xPointArray[j],
                    y: flow.yPointArray[j]
                };

                // width
                if (waypoints[j].x > maxX) {
                    maxX = waypoints[j].x;
                }
                if (waypoints[j].x < minX) {
                    minX = waypoints[j].x;
                }
                // height
                if (waypoints[j].y > maxY) {
                    maxY = waypoints[j].y;
                }
                if (waypoints[j].y < minY) {
                    minY = waypoints[j].y;
                }
            }
        }

        let diagramCanvas = new DiagramCanvas();
        if (diagramCanvas) {

            // 创建画布容器
            let diagramHolder = document.getElementById(this.options.diagramHolderId);

            let div = document.createElement("DIV");
            let processDefinitonId = this.options.diagramHolderId + "-processDefinition";
            // div.id = diagramLayout.processDefinition.id;
            div.id = processDefinitonId;
            div.className = "diagram";
            diagramHolder.appendChild(div);

            diagramCanvas.init(processDefinitonId, this.options, maxX + 20, maxY + 20);
            this.diagrams[diagramLayout.processDefinition.id] = {
                processDefinitionDiagramLayout: diagramLayout,
                diagramCanvas: diagramCanvas
            };
        }
        return this.diagrams[diagramLayout.processDefinition.id];
    },

    /**
     * 绘制活动
     * @param {*} diagramCanvas 画布
     * @param {*} activity 活动元素信息
     * @param {*} highLightedActivities
     */
    drawActivity(diagramCanvas, activity, highLightedActivities) {

        let type = activity.getProperty("type");
        let drawInstruction = this.activityDrawInstructions[type];

        if (drawInstruction != null) {
            drawInstruction.apply({
                diagramCanvas,
                activity
            });
        } else {
            console.error("no drawInstruction for " + type + ": ", activity);
        }

        // Actually draw the markers
        if (activity.getProperty("multiInstance") != undefined || activity.getProperty("collapsed") != undefined) {
            //console.log(activity.getProperty("name"), activity.properties);
            var multiInstanceSequential = (activity.getProperty("multiInstance") == "sequential");
            var multiInstanceParallel = (activity.getProperty("multiInstance") == "parrallel");
            var collapsed = activity.getProperty("collapsed");
            processDiagramCanvas.drawActivityMarkers(activity.getX(), activity.getY(), activity.getWidth(), activity.getHeight(),
                multiInstanceSequential, multiInstanceParallel, collapsed);
        }
        /*
		processDiagramCanvas.drawActivityMarkers(activity.getX(), activity.getY(), activity.getWidth(), activity.getHeight(), multiInstanceSequential,
              multiInstanceParallel, collapsed);
		*/

        // TODO: Draw highlighted activities if they are present

    }

}


diagramGenerator.init();

export default diagramGenerator;
