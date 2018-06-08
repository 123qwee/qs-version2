import ajaxOper from '../../assets/scripts/ajax/ajaxOper.js';
import commonAjax from "../../assets/scripts/common/commonAjax.js";

const service = {
    // 人口查询列表
    // queryList(params) {
    //     ajaxOper.ajaxHttp({
    //         type: 'get',
    //         data: params.data,
    //         url: "/manage/view/population/findPage",
    //         successFunc: (data) => {
    //             params.successFunc && params.successFunc(data);
    //         },
    //         errorFunc: data => {
    //             params.errorFunc && params.errorFunc(data);
    //         }
    //     })
    // },
    // 人口信息添加
    popleAddInfo(params) {
        ajaxOper.ajaxHttp({
            type: 'post',
            data: params.form,
            url: "/manage/view/population/save",
            successFunc: (data) => {
                params.successFunc && params.successFunc(data);
            }
        })
    },
    // 家庭人员查询
    popleFamily(params) {
        ajaxOper.ajaxHttp({
            type: 'get',
            data: params.data,
            url: "/manage/view/population/findFamily",
            successFunc: (data) => {
                params.successFunc && params.successFunc(data);
            }
        })
    },
    // 获取人口基本信息
    popleInfo(params) {
        ajaxOper.ajaxHttp({
            type: 'get',
            data: params.data,
            url: "/manage/view/population/findBasicOne",
            successFunc: (data) => {
                params.successFunc && params.successFunc(data);
            }
        })
    },
    //获取房屋信息
    queryHousesInfo(params){
        ajaxOper.ajaxHttp({
            type: 'get',
            data: params.data,
            url: "/manage/house/findList",
            successFunc: (data) => {
                params.successFunc && params.successFunc(data);
            }
        })
    },
    // 人口信息编辑
    popleEditInfo(params) {
        ajaxOper.ajaxHttp({
            type: 'post',
            data: params.form,
            url: "/manage/view/population/updatebsic",
            successFunc: (data) => {
                params.successFunc && params.successFunc(data);
            }
        })
    },
    popleDel(params) {
        ajaxOper.ajaxHttp({
            type: 'get',
            url: "/manage/view/population/delete/" + params.id,
            successFunc: (data) => {
                params.successFunc && params.successFunc(data);
            }
        })
    },
    popAgePer(params) {
        ajaxOper.ajaxHttp({
            type: 'get',
            url: "/manage/statis/age?time=" + params.form,
            successFunc: (data) => {
                params.successFunc && params.successFunc(data);
            }
        })
    },
    popGrowth(params) {
        ajaxOper.ajaxHttp({
            type: 'get',
            url: "/manage/statis/growth/trend",
            successFunc: (data) => {
                params.successFunc && params.successFunc(data);
            }
        })
    },
    popRegion(params) {
        ajaxOper.ajaxHttp({
            type: 'get',
            url: "/manage/statis/area/quantity?time=" + params.form + "&ageState=" + params.ageForm,
            successFunc: (data) => {
                params.successFunc && params.successFunc(data);
            }
        })
    },
    editImageInfo(params){
        console.log(params)
        ajaxOper.ajaxHttp({
            type: 'get',
            url: "/manage/house/insertImg?gridCode=" + params.data.gridCode + "&imgUrl=" + params.data.fileId,
            successFunc: (data) => {
                params.successFunc && params.successFunc(data);
            }
        })
    },
    popTypeCompare(params) {
        console.log(params)
        ajaxOper.ajaxHttp({
            type: 'get',
            data: params.data,
            url: "/manage/statis/area/type?time=" + params.form + "&ageState=" + params.ageForm + "&gridCode=" + params.regionType,
            successFunc: (data) => {
                console.log(data)
                params.successFunc && params.successFunc(data);
            }
        })
    },
    // 人口上报审批列表
    popleReportList(params) {
        console.log(params)
        ajaxOper.ajaxHttp({
            type: "get",
            data: params.data,
            url: "/manage/population/findList",
            successFunc: data => {
                params.successFunc && params.successFunc(data);
            }
        });
    },
    // 人口上报审批
    reportInfoServ(params) {
        ajaxOper.ajaxHttp({
            type: "get",
            data: params.data,
            url: "/manage/population/approval",
            successFunc: data => {
                params.successFunc && params.successFunc(data);
            }
        })
    },
    //删除人口上报审批
    deleteReportInfo(params){
        debugger
        ajaxOper.ajaxHttp({
            type:"get",
            url:"/manage/population/del/"+params.id,
            successFunc: data => {
                params.successFunc && params.successFunc(data);
            }
        })
    },
    //撤销人口上报审批
    revokeReportInfo(params){
        ajaxOper.ajaxHttp({
            type:"get",
            url:"/manage/population/revoke/"+params.id,
            successFunc: data => {
                params.successFunc && params.successFunc(data);
            }
        })
    },
    // 判断该房间是否存在户主
    householder(params) {
        $.ajax({
            type: "get",
            url: constants.SERVER_URL + "/manage/population/judgement",
            data: params.data,
            async: false,
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                params.successFunc && params.successFunc(data);
            },
            error: data => {
                params.errorFunc && params.errorFunc(data);
            }
        });
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
    commonAjax: commonAjax,
    service,
}