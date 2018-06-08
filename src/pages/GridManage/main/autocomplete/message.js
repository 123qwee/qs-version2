import * as _ from 'lodash';
export const MESSAGE = {
    STATIC_MESSAGE: "${0}统计类别",
    RESULT_LIST_MESSAGE: "查询${0}统计类别共${1}条",
    RESULT_INFO_MESSAGE: "信息展示"
}

export function convertMessage(message, ...params) {
    if (_.isArray(params)) {
        _.map(params, (value, index) => {
            if (value) {
                message = _.replace(message, "${" + index + "}", value);
            } else {
                message = _.replace(message, "${" + index + "}", "");
            }
        });
    }
    return message;
}
