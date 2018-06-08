import ajaxOper from '../../../../assets/scripts/ajax/ajaxOper.js';
import commonAjax from "../../../../assets/scripts/common/commonAjax.js";


const service = {
    //根据条件查询党组织信息
    getDensity(params) {
        ajaxOper.ajaxHttp({
            type: 'get',
            url: '/manage/statis/house/population?gridCode=140521',
            successFunc: (data) => {
                // let list=[];
                // if (params.data.PopDensity === "toolFirst") {
                //     list= _.filter(data.data, function (o) {
                //         return o.both <=9;
                //     });
                // } else if (params.data.PopDensity === "toolSecond") {
                //     list= _.filter(data.data, function (o) {
                //         return 9 < o.both && o.both <= 15;
                //     });
                // } else if (params.data.PopDensity === "toolThird") {
                //     list=_.filter(data.data, function (o) {
                //         return 15 < o.both && o.both <=25;
                //     });
                // } else if (params.data.PopDensity === "toolFourth") {
                //     list=_.filter(data.data, function (o) {
                //         return 25 < o.both;
                //     });
                // }
                params.successFunc && params.successFunc(data);
            },
        })
    }
}

export default {
    commonAjax: commonAjax,
    service,
}
