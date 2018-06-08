const moment = require('moment');
moment.locale('zh-cn');

/**
 * 自定义日期格式 格式化
 * @param {*} value
 * @param format 日期格式，如：YYYY-MM-DD HH:ss:mm
 */
const formatCustomDate = (value, format) => {
    return moment(value).format(format);
}

/**
 * 日期格式化【YYYY-MM-DD HH:ss:mm】
 * @param {*} value 
 */
const formatDate = (value) => {
    return moment(value).format("YYYY-MM-DD HH:mm:ss");
}

/**
 * 开始日期格式化
 * @param {*} value 
 */
const formatSDate = (value) => {
    !value && (value = moment());
    return moment(value).startOf('day').format("YYYY-MM-DD HH:mm:ss");
}

/**
 * 结束日期格式化
 * @param {*} value 
 */
const formatEDate = (value) => {
    !value && (value = moment());
    return moment(value).endOf('day').format("YYYY-MM-DD HH:mm:ss");
}

/**
 * 获取月初日期
 * @param {*} value 
 */
const getMonthSDate = (value) => {
    !value && (value = moment());
    return moment(value).startOf('month').startOf('day').format("YYYY-MM-DD HH:mm:ss");
}

/**
 * 获取周信息
 * @param {*} value 
 */
const getWeek = (value) => {
    let week = moment(value).format('d');

    switch (week) {
        case "0":
            week = "周日";
            break;
        case "1":
            week = "周一";
            break;
        case "2":
            week = "周二";
            break;
        case "3":
            week = "周三";
            break;
        case "4":
            week = "周四";
            break;
        case "5":
            week = "周五";
            break;
        case "6":
            week = "周六";
            break;
    }

    return week;
}

/**
 * 根据附件路径判断附件类型是否为图片
 * @param {*} url 
 */
const isImageType = (url) => {
    if (url.indexOf("base64") > 0) {
        return true;
    } else {
        let suffix = _.last(url.split("."));
        return constants.MEDIA_TYPE_IMAGE.indexOf(suffix) >= 0;
    }
}

/**
 * 根据附件路径判断附件类型是否为视频
 * @param {*} url 
 */
const isVideoType = (url) => {
    let suffix = _.last(url.split("."));
    return constants.MEDIA_TYPE_VIDEO.indexOf(suffix) >= 0;
}

/**
 * 根据附件路径判断附件类型是否为音频
 * @param {*} url 
 */
const isAudioType = (url) => {
    let suffix = _.last(url.split("."));
    return constants.MEDIA_TYPE_AUDIO.indexOf(suffix) >= 0;
}

/**
 * 获取Dom元素的计算后样式
 * @param {*} el 
 */
const getCurrentStyle = (el) => {
    let style = null;

    // IE不支持getComputedStyle方法
    if (window.getComputedStyle) {
        style = window.getComputedStyle(el, null);
    } else {
        style = el.currentStyle;
    }

    return style;
}

/**
 * 获取Dom元素的计算后值样式，如height,width
 * @param {*} el 
 * @param {*} type 如height,width
 */
const getStyleValue = (el, type) => {
    return Number(getCurrentStyle(el)[type].split("px")[0]);
}

/**
 * 导出表格数据到Excel文件
 * @param parentElm 表格容器Dom
 * @param ignoreColumn 不导出的列索引数组
 * @param filename 导出文件名
 */
const exportToExcel = (parentElm, ignoreColumn, filename) => {
    let $head = $(parentElm).find(".el-table__header");
    let $table = $(parentElm).find(".el-table__body");

    if (filename == undefined) {
        filename = "导出文件";
    }

    require.ensure([], () => {
        const {
            export_json_to_excel
        } = require("excel/Export2Excel");

        const tHeader = [],
            data = [];

        // 获取表头
        $head.find(".cell").map((index, el) => {
            if (ignoreColumn.indexOf(index) < 0) {
                tHeader.push(el.innerText.trim());
            }
        })

        // 获取表格内容
        $table.find(".el-table__row").map((index, row) => {
            let rowData = [];

            $(row).find(".cell").map((index, el) => {
                if (ignoreColumn.indexOf(index) < 0) {
                    rowData.push(el.innerText.trim());
                }
            })

            data.push(rowData);
        })

        export_json_to_excel(tHeader, data, filename);
    });
}

/**
 * 导出列表数据到Excel文件
 * @param {*} tHeader 表头数据
 * @param {*} tData  列表数据
 */
const exportDataToExcel = (tHeader, tData) => {
    let filename = "导出文件";

    require.ensure([], () => {
        const {
            export_json_to_excel
        } = require("@/components/excel/Export2Excel");

        export_json_to_excel(tHeader, tData, filename);
    });
}

/**
 * 生成某个数后面的可以被10整除的数
 * 返回包括开始，没有结束
 * sNum : 开始值
 * eNum : 结束值
 */
const createLastNum = (sNum, eNum) => {
    let Tnum = parseInt(sNum / 10) + 1, //十位
        endNum = parseInt(eNum / 10), // 结束的值
        numArray = [];
    for (let i = Tnum; i < endNum; i++) {
        numArray.push({
            "label": i * 10,
            "value": i * 10
        });
    }
    return numArray;
};

/**
 * 编码与文字转换
 */
const codeTransf = (type, code) => {
    if (type && code && (!isNaN(Number(code)) || code.constructor == Array)) {
        let data = lscache.get(type);
        if (type == "regionDataUnorganized") {
            if (typeof code != "string") {
                let prov = _.find(data, {
                        divisionCode: String(code[0]).slice(0, 2) * 10000
                    }).divisionDistrict,
                    city = _.find(data, {
                        divisionCode: String(code[1]).slice(0, 4) * 100
                    }).divisionDistrict,
                    county = _.find(data, {
                        divisionCode: code[2]
                    }).divisionDistrict;
                return prov + city + county;
            }
        } else {
            return _.find(data, {
                value: code
            }).label;
        }
    } else {
        return code;
    }
}

// 将Boolean 类型值转为字符串
const filterForm = (formVal, AllVal) => {
    let regKey = /^is\w+/;
    for (var item in formVal) {
        if (regKey.test(item)) {
            formVal[item] = AllVal[item].toString();
        } else {
            formVal[item] = AllVal[item];
        }
    }
}
//人员年龄区间互转
const AgeConversion = (val) => {
    let engReg = /^[A-Za-z]+$/;
    if (!isNaN(val) || engReg.test(val)) {
        let ageType;
        if (val == "teen") {
            ageType = "青年"
        } else if (val == "prime") {
            ageType = "中年"
        } else if (val == "old") {
            ageType = "老年"
        }
        return ageType;
    } else {
        let type;
        if (val == "青年") {
            type = '1'
        } else if (val == "中年") {
            type = '2'
        } else if (val == "老年") {
            type = '3'
        }
        return type;
    }
}
//人员类型互转
const TypeConversion = (val) => {
    let engReg = /^[A-Za-z]+$/;
    if (!isNaN(val) || engReg.test(val)) {
        let Type;
        if (val == "float") {
            Type = "流动人口"
        } else if (val == "household") {
            Type = "户籍人口"
        }
        return Type;
    }
}
//两新组织名称互转
const swapName = (val) => {
    let engReg = /^[A-Za-z]+$/;
    if (!isNaN(val) || engReg.test(val)) {
        let Type;
        if (val == "economic") {
            Type = "非公有经济组织"
        } else if (val == "social") {
            Type = "社会组织"
        }
        return Type;
    }
}
// 人员类型和人员类型名称互转
const MutualConversion = (val, form) => {
    let engReg = /^[A-Za-z]+$/;
    if (!isNaN(val) || engReg.test(val)) {
        let popleType;
        if (val == "1" || val == "stayStaff" || val == "stay") {
            popleType = '留守人员';
        } else if (val == "2" || val == "releaseStaff" || val == "release") {
            popleType = '刑满释放人员';
        } else if (val == "3" || val == "communityRedressStaff" || val == "community") {
            popleType = '社区矫正人员';
        } else if (val == "4" || val == "mentalPatientInfo" || val == "mental") {
            popleType = '严重精神障碍人员';
        } else if (val == "5" || val == "drugStaff" || val == "drugs") {
            popleType = '吸毒人员';
        } else if (val == "6" || val == "aidsStaff" || val == "aids") {
            popleType = '艾滋病危险人员';
        } else if (val == "7" || val == "focusTeens" || val == "teens") {
            popleType = '重点青少年';
        };
        return popleType;
    } else if (form) {
        let formName;
        if (val == "留守人员") {
            formName = 'stayStaff';
        } else if (val == "刑满释放人员") {
            formName = 'releaseStaff';
        } else if (val == "严重精神障碍人员") {
            formName = 'mentalPatientInfo';
        } else if (val == "吸毒人员") {
            formName = 'drugStaff';
        } else if (val == "艾滋病危险人员") {
            formName = 'aidsStaff';
        } else if (val == "重点青少年") {
            formName = 'focusTeens';
        } else if (val == "社区矫正人员") {
            formName = 'communityRedressStaff';
        };
        return formName;
    } else {
        let type;
        if (val == "留守人员") {
            type = '1';
        } else if (val == "刑满释放人员") {
            type = '2';
        } else if (val == "社区矫正人员") {
            type = '3';
        } else if (val == "严重精神障碍人员") {
            type = '4';
        } else if (val == "吸毒人员") {
            type = '5';
        } else if (val == "艾滋病危险人员") {
            type = '6';
        } else if (val == "重点青少年") {
            type = '7';
        };
        return type;
    }
}

export default {
    formatCustomDate,
    formatDate,
    formatSDate,
    formatEDate,
    getMonthSDate,
    getWeek,
    isImageType,
    isVideoType,
    isAudioType,
    getCurrentStyle,
    getStyleValue,
    exportToExcel,
    createLastNum,
    codeTransf,
    filterForm,
    MutualConversion,
    AgeConversion,
    TypeConversion,
    swapName,
    exportDataToExcel,
}
