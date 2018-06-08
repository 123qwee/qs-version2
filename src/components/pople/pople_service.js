import ajaxOper from '../../assets/scripts/ajax/ajaxOper.js';

const service = {
    // 重点人员信息
    keyPopleInfo(params) {
        ajaxOper.ajaxHttp({
            type: 'get',
            data: params.data,
            url: "/manage/view/population/findBasicOne",
            successFunc: (data) => {
                params.successFunc && params.successFunc(data);
            },
            errorFunc: (data) => {
                params.errorFunc && params.errorFunc(data);
            }
        })
    },
    // 家庭人员查询
    keyPopleHelpInfo(params) {
        ajaxOper.ajaxHttp({
            type: 'get',
            data: params.data,
            url: "/manage/focus/find/helpInfo",
            successFunc: (data) => {
                params.successFunc && params.successFunc(data);
            }
        })
    },
    // 验证身份证号是否已添加
    cardNumberReport(params) {
        ajaxOper.ajaxHttp({
            type: 'get',
            data: params.data,
            url: "/manage/view/population/judgement/card",
            successFunc: (data) => {
                params.successFunc && params.successFunc(data);
            }
        })
    },
    //
    popleHelpRecord(params) {
        ajaxOper.ajaxHttp({
            type: 'get',
            data: params.data,
            url: "/manage/focus/help/listBycardnumber",
            successFunc: (data) => {
                params.successFunc && params.successFunc(data);
            }
        })
    },
    //查询房产
    getRoomInfo(params){
        ajaxOper.ajaxHttp({
            type:"get",
            url:"/population/room/relation/findListByCardNumber?cardNumber="+params.cardNumber,
            successFunc: data => {
                params.successFunc && params.successFunc(data);
            }
        })
    },
    //查询房主
    getOwnerInfo(params){
        ajaxOper.ajaxHttp({
            type:"get",
            url:"/population/room/relation/findListByRoomCode?roomCode="+params.roomCode,
            successFunc: data => {
                params.successFunc && params.successFunc(data);
            }
        })
    }
}
export default {
    service,
}