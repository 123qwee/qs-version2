import ajaxOper from '../../../assets/scripts/ajax/ajaxOper.js';

const service = {
    /**
     * 获取待办任务详细信息
     * @param taskNum 待办任务编号 
     * @param successFunc 成功回调函数
     */
    getCaseInfo(params) {
        ajaxOper.ajaxHttp({
            type: "get",
            url: '/buss/matter/message/findInfo?matterTaskNum=' + params.taskNum,
            successFunc: (data) => {
                params.successFunc && params.successFunc(data.data);
            }
        })
    },
    /**
     * 获取待办任务流转信息
     * @param taskNum 待办任务编号 
     * @param successFunc 成功回调函数
     */
    getMatterTrans(params) {
        ajaxOper.ajaxHttp({
            type: "get",
            url: '/buss/matter/message/findTrans?matterTaskNum=' + params.taskNum + "&t=" + (new Date()).valueOf(),
            successFunc: (data) => {
                params.successFunc && params.successFunc(data.data);
            }
        });
    },
    /**
     * 获取待办任务督办信息
     * @param taskNum 待办任务编号 
     * @param successFunc 成功回调函数
     */
    getMatterPress(params) {
        ajaxOper.ajaxHttp({
            type: "get",
            url: 'buss/matter/press/findReplyByMatter?matterTaskNum=' + params.taskNum,
            successFunc: (data) => {
                params.successFunc && params.successFunc(data.data);
            }
        });
    },
    /**
     * 获取待办任务申请信息
     * @param taskNum 待办任务编号 
     * @param successFunc 成功回调函数
     */
    getMatterPower(params) {
        ajaxOper.ajaxHttp({
            type: "get",
            url: 'buss/matter/message/findPower?matterTaskNum=' + params.taskNum + "&t=" + (new Date()).valueOf(),
            successFunc: (data) => {
                params.successFunc && params.successFunc(data.data);
            }
        });
    },
    /**
     * 获取待办任务流转信息
     * @param taskNum 待办任务编号 
     * @param successFunc 成功回调函数
     */
    getMatterTransAndMedias(params) {
        ajaxOper.ajaxHttp({
            type: "get",
            url: '/buss/matter/message/findTransAndMedia?matterTaskNum=' + params.taskNum + "&t=" + (new Date()).valueOf(),
            successFunc: (data) => {
                params.successFunc && params.successFunc(data.data);
            }
        });
    },
    /**
     * 获取督办回复信息
     * @param pressId 督办记录编号 
     * @param successFunc 成功回调函数
     */
    getPressReplyInfo(params) {
        ajaxOper.ajaxHttp({
            type: "get",
            url: '/buss/matter/press/findReplyByPress?pressId=' + params.pressId,
            successFunc: (data) => {
                params.successFunc && params.successFunc(data.data);
            }
        });
    },
    /**
     * 获取待办任务流转信息和多媒体信息
     * @param taskNum 待办任务编号 
     * @param successFunc 成功回调函数
     */
    getMatterTransAndMedias(params) {
        ajaxOper.ajaxHttp({
            type: "get",
            url: 'buss/matter/message/findTransAndMedia?matterTaskNum=' + params.taskNum,
            successFunc: (data) => {
                params.successFunc && params.successFunc(data.data);
            }
        });
    },
    /**
     * 查询案卷全部流程
     * @param {*} params 
     */
    queryProcess(params) {
        let urlProcess = '/buss/workflow/process/diagram?processInstanceId=' + params.taskNum;
        let urlTrace = '/buss/workflow/process/trace?processInstanceId=' + params.taskNum;

        let getFunc = [
            ajaxOper.ajaxGetFunc(urlProcess),
            ajaxOper.ajaxGetFunc(urlTrace),
        ];

        ajaxOper.ajaxAll({
            getFunc,
            successFunc: data => {
                _.map(data[1].data, item => {
                    for (let i = 0; i < data[0].data.activities.length; i++) {
                        if (data[0].data.activities[i].activityId == item.taskDefinition) {
                            data[0].data.activities[i].properties.currentActiviti = item.currentActiviti;
                            // 绑定活动信息
                            if (data[0].data.activities[i].properties.activityInfo == undefined) {
                                data[0].data.activities[i].properties.activityInfo = [];
                            }

                            item.index = index + 1;
                            data[0].data.activities[i].properties.activityInfo.push(item);
                            break;
                        }
                    }
                })
                // _.map(data[0].data.sequenceFlows, item => {
                //     if (item.flow.indexOf(data[1].data[0].taskDefinition + ')') > 0 && item.flow.indexOf(data[1].data[1].taskDefinition + ')') > 0) {
                //         item.isStart = true;
                //     }
                // })
                params.successFunc && params.successFunc(data[0].data);
            }
        });
    }
}

export default service;
