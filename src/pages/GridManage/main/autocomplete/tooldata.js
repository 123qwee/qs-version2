const icon_school = require("../../../../assets/images/map/sebar_icon_school.png");
const icon_organize = require("../../../../assets/images/map/sebar_icon_organize.png");
const icon_house = require("../../../../assets/images/map/sebar_icon_house.png");
const icon_business = require("../../../../assets/images/map/sebar_icon_business.png");
const icon_affair = require("../../../../assets/images/map/sebar_icon_affair.png");
export const tooldata = {
    'a': {
        title: '学校',
        url: icon_school
    },
    'b': {
        title: '组织',
        url: icon_organize
    },
    'c': {
        title: '人房',
        url: icon_house
    },
    'd': {
        title: '工商',
        url: icon_business
    },
    'e': {
        title: '党务',
        url: icon_affair
    }
}

export function getTag(type) {
    return {
        renfang: type === "人房",
        wangge: type === "网格",
        xuexiao: type === "学校",
        zuzhi: type === "组织",
        gongshang: type === "工商",
        dangwu: type === "党务"
    }
}
