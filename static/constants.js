// 系统部署IP地址
const HOST = 'http://117.34.95.9';
// const HOST = 'http://172.19.2.250'; // 部署地址

const MAP_HOST = 'http://117.34.95.9'
// const MAP_HOST = 'http://172.19.2.250';// 部署地址
// 系统部署端口
const SERVER_PORT = "8003";
// 地图服务端口
const MAP_PORT = "58092";
// 地图服务端口
// const MAP_PORT = "8090";
// CAS单点登录端口
const CAS_PORT = "18080";
// CAS单点登录端口
// const CAS_PORT = "8080";
// 默认服务地址前缀
const DEFAULT_URL = HOST + ":" + SERVER_PORT;
// 默认地图服务地址前缀
const MAP_URL = MAP_HOST + ":" + MAP_PORT;
// CAS默认地址
const CAS_URL = HOST + ":" + CAS_PORT;
// 发送短信地址
const MESSAGE_URL = 'https://api.sms.jpush.cn/v1';


export default {
    // 视频页面
    VIdEOURL: "http://172.19.2.250:8888/index.html",
    HOST: HOST,
    // 系统配置编号
    SYSTEM_ID: 124,
    // 系统名称
    SYSTEM_NAME: "沁水县二三维一体化综治管理平台",
    // 本地缓存过期时间，默认30分钟
    SESSION_LIMIT: 30,
    // 导出Excel 条数
    EXCEL_COUNT: 1000,
    // CAS认证注销地址
    CAS_LOGOUT_URL: CAS_URL + "/cas/logout",
    // 地图WMS服务地址
    MAP_WMS_URL: MAP_URL + "/geoserver/qhOracle/wms",
    // 协同处置系统后台地址
    SERVER_URL: DEFAULT_URL,
    // 用户头像地址
    IMAGE_USER_URL: DEFAULT_URL + "/buss/user/photo/file",
    // 附件上传地址
    UPLOAD_URL: DEFAULT_URL + "/fastdfs/file/upload",
    // 多附件上传地址
    MULTI_UPLOAD_URL: DEFAULT_URL + "/fastdfs/file/multiFile",
    // 附件删除地址
    DELETE_FILE_URL: DEFAULT_URL + "/fastdfs/file/delete",
    // 附件读取地址
    READ_FILE_URL: DEFAULT_URL + "/fastdfs/file/file",
    // 支持上传的图片附件【JPG和PNG】
    SUPPORT_IMAGE_TYPE: ["image/jpeg", "image/png"],
    // 附件图片文件类型
    MEDIA_TYPE_IMAGE: ["png", "jpg"],
    // 附件视频文件类型
    MEDIA_TYPE_VIDEO: ["mp4"],
    // 附件音频文件类型
    MEDIA_TYPE_AUDIO: ["m4a"],
    // 案卷自动定时查询的间隔时限，默认10秒钟
    CASE_QUERY_INTERVAL: 10000,
    // 部门管理员角色类型编号
    ROLE_DEPT_ADMIN: 3,
    // 系统管理员角色类型编号
    ROLE_SYS_ADMIN: 1,
    // 图层地址
    YINGXIANG_MAP_URL1: MAP_URL + '/iserver/services/map-qs_2d_All/rest/maps/qs_2dyx@qs_2dyx',
    YINGXIANG_MAP_URL: MAP_URL + '/iserver/services/map-qs_2d_All/rest/maps/qsCQ__2dyx@qs_2dyx',
    // 矢量图地址
    SHILIANG_MAP_URL: MAP_URL + '/iserver/services/map-qs_2d_All/rest/maps/qs_2d@qs_sl',
    // 倾斜摄影
    OSGB_SCENE_URL: MAP_URL + '/iserver/services/3D-qs3d_yx/rest/realspace/datas/Config/config',
    // OSGB_SCENE_URL: MAP_URL + '/iserver/services/3D-qs3d_yx/rest/realspace/datas/Config/config',// 部署地址
    // 三维水面
    OSGB_SCENE_WATER_URL: MAP_URL + '/iserver/services/3D-qs3d_yx/rest/realspace/datas/qinshuishuimian2D@qinshuishuimian/config',
    OSGB_SCENE_DATA_URL: MAP_URL + "/iserver/services/data-qs_2d_All/rest/data",
    // 网格、楼房地图服务地址
    GRID_MAP_URL: MAP_URL + '/iserver/services/map-qs_2d_All/rest/maps/qs_sl@grid_code',
    //道路名称
    STREET_MAP_NAME: MAP_URL + '/iserver/services/map-All_Street_qs/rest/maps/All@qs_street',
    // STREET_MAP_NAME: MAP_URL + '/iserver/services/map-qs_2d_All/rest/maps/roads@qs_street',// 部署地址
    //房屋名称
    HOUSE_MAP_NAME: MAP_URL + '/iserver/services/map-building_qs/rest/maps/house@qs',
    // HOUSE_MAP_NAME: MAP_URL + '/iserver/services/map-qs_2d_All/rest/maps/house@qs',// 部署地址
    // 字典表大类
    DICT_TYPE: {
        NATION: "69", // 民族
        MARITALSTATUS: "67", // 婚姻状况
        EDUCATIONAL: "68", // 学历
        APPEARANCE: "66", // 政治面貌
        RELIGIOUSBELIEFS: "64", // 宗教信仰
        CAUSE_INFLOW: "11", // 流入原因
        CERTIFICATE_TYPE: "12", // 办证类型
        RESIDENCE_TYPE: "13", // 住所类型
        HOUSEHOLD_SIGN: "10", // 人户一致标识
        HOUSEHOLD_RELATIONSHIP: "70", // 与户主关系
        CREDTYPE: "75", // 证件类型
        POPLETYPE: "41", // 人口类型
        SCHOOLTYPE: "59", //办学类型
        SCHCASETYPE: "61", //案件性质
        ORGNAZITIONTYPE: "76", //党组织类型
        ORIGINALSINNERS: "20", // 原罪名
        RISKTYPE: "21", // 危险评估等级
        COHESIONSITUATION: "22", // 衔接情况
        PLACESITUATION: "23", // 安置情况
        BUSINESSTYPE: "44", //  工商业类型
        PARTYWORKTYPE: '76', //  党务类型
        ORGANIZETYPE: '47', //  组织类型
        SECURITY_RISK_TYPE: "45", //安全隐患类型45
        CONCERNED_DEGREE: "46", //关注程度46
        INFECTIONWAY: "38", // 感染途径
        CASETYPE: "72", // 案件类别
        CONCERNEDTYPE: "39", // 关注类型
        CONDITIONSITUATION: "40", // 收治情况

        MANAGEMENTSITUATION: "37", // 管控情况
        DRUGREASONS: "73", // 吸毒原因
        DRUGRESULT: "74", // 吸毒后果

        PERSONTYPE: "41", // 人员类型
        FAMILYSITUATION: "42", // 家庭情况
        GUARDIANRELATIONSHIP: "70", // 与监护人关系(与户主关系)
        HEPLMEANS: "43", // 帮扶手段

        FINANCIALSITUATION: "30", // 家庭经济状况
        DIAGNOSTICTYPE: "31", // 目前诊断类型
        DANGEROUSGRADE: "32", // 目前危险性评估等级
        TREATMENTSITUATION: "33", // 治疗情况
        TREATMENTREASONS: "34", // 住院治疗原因
        MANAGER: "35", // 参与管理人员
        HELPSITUATION: "36", // 帮扶情况

        STAYINGTYPE: "15", // 留守人员类型
        KEYHEALTH: "14", // 家庭主要成员健康状况

        REDRESSTYPE: "24", // 矫正类别列表
        RECEIVEMETHOD: "25", // 接收方式
        FOUTSITUATION: "26", // 四史情况
        THREESITUATION: "27", // 三涉情况
        GROUPCOMPONENT: "28", // 矫正小组人员组成情况
        REDRESSLIFTEDTYPE: "29", // 矫正解除(终止)类型

        LISTTYPE: "62", // 线路类型
        DEGREEOFHARM: "60", // 危害程度

        PROBLEMPUBLICSECURITY: "48", // 治安突出问题
        INVOLVINGREGIONALTYPES: "49", //涉及区域类型

        EFFECTEVALUATION: "50", // 效果评估

    },
    // 身份证号验证
    REG_CARD_NUMBER: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,

}
