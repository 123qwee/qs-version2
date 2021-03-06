import Mock from 'mockjs';
import constants from '../../../../static/constants.js';
Mock.mock(mockurl.home["/list"] ? constants.SERVER_URL + "/list" : "   ", "get", {
    "code": 200,
    "message": null,
    "data": [{
        "id": 21,
        "name": "沁水县综治管理平台",
        "operate": "string",
        "orderBy": 0,
        "parentPerId": 0,
        "perValue": "string",
        "remark": "string",
        "route": "string",
        "status": 1,
        "type": 1
    }, {
        "id": 1,
        "name": "首页",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 124,
        "perValue": "GridManage",
        "remark": "首页",
        "route": "GridManage",
        "status": 1,
        "type": 1
    }, {
        "id": 2,
        "name": "首页",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 1,
        "perValue": "GridManage",
        "remark": "首页",
        "route": "GridManage",
        "status": 1,
        "type": 1
    }, {
        "id": 3,
        "name": "协同处置",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 124,
        "perValue": "GridManage",
        "remark": "首页",
        "route": "GridManage",
        "status": 1,
        "type": 1
    }, {
        "id": 4,
        "name": "协同处置",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 3,
        "perValue": "VideoSurveillance",
        "remark": "首页",
        "route": "VideoSurveillance",
        "status": 1,
        "type": 1
    }, {
        "id": 5,
        "name": "综治维稳",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 124,
        "perValue": "GridManage",
        "remark": "综治维稳",
        "route": "GridManage",
        "status": 1,
        "type": 1
    }, {
        "id": 6,
        "name": "人房管理",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 5,
        "perValue": "PeopleRoomManage",
        "remark": "人房管理",
        "route": "PeopleRoomManage",
        "status": 1,
        "type": 1
    }, {
        "id": 7,
        "name": "重点人群",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 5,
        "perValue": "KeyPopulation",
        "remark": "重点人群",
        "route": "KeyPopulation",
        "status": 1,
        "type": 1
    }, {
        "id": 8,
        "name": "排查整治",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 5,
        "perValue": "SafeProduction",
        "remark": "排查整治",
        "route": "SafeProduction",
        "status": 1,
        "type": 1
    }, {
        "id": 9,
        "name": "党建体系",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 5,
        "perValue": "PartyBuildingSystem",
        "remark": "党建体系",
        "route": "PartyBuildingSystem",
        "status": 1,
        "type": 1
    }, {
        "id": 10,
        "name": "两新组织",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 5,
        "perValue": "TwoNewOrganizations",
        "remark": "两新组织",
        "route": "TwoNewOrganizations",
        "status": 1,
        "type": 1
    }, {
        "id": 11,
        "name": "校园周边",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 5,
        "perValue": "CampusPerimeter",
        "remark": "校园周边",
        "route": "CampusPerimeter",
        "status": 1,
        "type": 1
    }, {
        "id": 12,
        "name": "护路护线",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 5,
        "perValue": "RoadGuardLine",
        "remark": "护路护线",
        "route": "RoadGuardLine",
        "status": 1,
        "type": 1
    }, {
        "id": 13,
        "name": "环境保护",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 124,
        "perValue": "RoadGuardLine",
        "remark": "环境保护",
        "route": "RoadGuardLine",
        "status": 1,
        "type": 1
    }, {
        "id": 14,
        "name": "环境保护",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 13,
        "perValue": "RoadGuardLine",
        "remark": "环境保护",
        "route": "RoadGuardLine",
        "status": 1,
        "type": 1
    }, {
        "id": 113,
        "name": "党建管理",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 124,
        "perValue": "RoadGuardLine",
        "remark": "党建管理",
        "route": "RoadGuardLine",
        "status": 1,
        "type": 1
    }, {
        "id": 114,
        "name": "党建管理",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 113,
        "perValue": "RoadGuardLine",
        "remark": "党建管理",
        "route": "RoadGuardLine",
        "status": 1,
        "type": 1
    }, {
        "id": 15,
        "name": "交通管理",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 124,
        "perValue": "RoadGuardLine",
        "remark": "交通管理",
        "route": "RoadGuardLine",
        "status": 1,
        "type": 1
    }, {
        "id": 16,
        "name": "交通管理",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 15,
        "perValue": "RoadGuardLine",
        "remark": "交通管理",
        "route": "RoadGuardLine",
        "status": 1,
        "type": 1
    }, {
        "id": 17,
        "name": "视频监控",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 124,
        "perValue": "RoadGuardLine",
        "remark": "视频监控",
        "route": "RoadGuardLine",
        "status": 1,
        "type": 1
    }, {
        "id": 18,
        "name": "视频监控",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 13,
        "perValue": "RoadGuardLine",
        "remark": "视频监控",
        "route": "RoadGuardLine",
        "status": 1,
        "type": 1
    }, {
        "id": 19,
        "name": "安全生产",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 124,
        "perValue": "RoadGuardLine",
        "remark": "安全生产",
        "route": "RoadGuardLine",
        "status": 1,
        "type": 1
    }, {
        "id": 20,
        "name": "安全生产",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 19,
        "perValue": "RoadGuardLine",
        "remark": "安全生产",
        "route": "RoadGuardLine",
        "status": 1,
        "type": 1
    }, {
        "id": 21,
        "name": "城市管理",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 124,
        "perValue": "RoadGuardLine",
        "remark": "城市管理",
        "route": "RoadGuardLine",
        "status": 1,
        "type": 1
    }, {
        "id": 22,
        "name": "城市管理",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 21,
        "perValue": "RoadGuardLine",
        "remark": "城市管理",
        "route": "RoadGuardLine",
        "status": 1,
        "type": 1
    }, {
        "id": 23,
        "name": "应急管理",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 124,
        "perValue": "RoadGuardLine",
        "remark": "应急管理",
        "route": "RoadGuardLine",
        "status": 1,
        "type": 1
    }, {
        "id": 24,
        "name": "应急管理",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 13,
        "perValue": "RoadGuardLine",
        "remark": "应急管理",
        "route": "RoadGuardLine",
        "status": 1,
        "type": 1
    }, {
        "id": 25,
        "name": "数据维护",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 124,
        "perValue": "RoadGuardLine",
        "remark": "数据维护",
        "route": "RoadGuardLine",
        "status": 1,
        "type": 1
    }, {
        "id": 26,
        "name": "数据维护",
        "operate": null,
        "orderBy": 10,
        "parentPerId": 25,
        "perValue": "RoadGuardLine",
        "remark": "数据维护",
        "route": "RoadGuardLine",
        "status": 1,
        "type": 1
    }]
});
Mock.mock(mockurl.statis["/manage/statis/growth/trend"] ? constants.SERVER_URL + "/manage/statis/growth/trend" : "   ", "get", {
    "code": 200,
    "message": null,
    "data": {
        "2014": '@natural(100,5000)',
        "2015": '@natural(100,5000)',
        "2016": '@natural(100,5000)',
        "2017": '@natural(100,5000)',
        "2018": '@natural(100,5000)',
    }
});
Mock.mock(mockurl.statis["/manage/statis/age?time=2018"] ? constants.SERVER_URL + "/manage/statis/age?time=2018" : "   ", "get", {
    "code": 200,
    "message": null,
    "data": {
        "prime": '@natural(100,5000)',
        "old": '@natural(100,5000)',
        "teen": '@natural(100,5000)',
    }
});
Mock.mock(mockurl.statis["/manage/statis/area/type?time=2018&ageState=&gridCode="] ? constants.SERVER_URL + "/manage/statis/area/type?time=2018&ageState=&gridCode=" : "   ", "get", {
    "code": 200,
    "message": null,
    "data": {
        "household": '@natural(100,5000)',
        "float": '@natural(100,5000)',
    }
});
Mock.mock(mockurl.statis["/manage/statis/area/quantity?time=2018&ageState="] ? constants.SERVER_URL + "/manage/statis/area/quantity?time=2018&ageState=" : "   ", "get", {
    "code": 200,
    "message": null,
    "data": {
        "龙港镇": {
            "children": {
                "北和社区": {
                    "household": '@natural(100,5000)',
                    "float": '@natural(100,5000)',
                    "gridCode": "140521100009"
                },
                "杏园社区": {
                    "household": '@natural(100,5000)',
                    "float": '@natural(100,5000)',
                    "gridCode": "140521100002"
                },
                "宣化社区": {
                    "household": '@natural(100,5000)',
                    "float": '@natural(100,5000)',
                    "gridCode": "140521100008"
                },
                "东安社区": {
                    "household": '@natural(100,5000)',
                    "float": '@natural(100,5000)',
                    "gridCode": "140521100005"
                },
                "梅苑社区": {
                    "household": '@natural(100,5000)',
                    "float": '@natural(100,5000)',
                    "gridCode": "140521100004"
                },
                "新城社区": {
                    "household": '@natural(100,5000)',
                    "float": '@natural(100,5000)',
                    "gridCode": "140521100007"
                }, "永宁社区": {
                    "household": '@natural(100,5000)',
                    "float": '@natural(100,5000)',
                    "gridCode": "140521100003"
                },
                "柳庄社区": {
                    "household": '@natural(100,5000)',
                    "float": '@natural(100,5000)',
                    "gridCode": "140521100001"
                },
                "杨河社区": {
                    "household": '@natural(100,5000)',
                    "float": '@natural(100,5000)',
                    "gridCode": "140521100006"
                }
            },
            "household": '@natural(100,5000)',
            "float": '@natural(100,5000)',
            "gridCode": "140521100"
        }
    }
});
Mock.mock(mockurl.list["/manage/view/population/findPage?page=1&pageSize=10&orderBy=name&order=desc"] ? constants.SERVER_URL + "/manage/view/population/findPage?page=1&pageSize=10&orderBy=name&order=desc" : "   ", "get", {
    "code": 200,
    "message": null,
    "data": {
        "totalCount": '@natural(100,5000)',
        "pageSize": '@natural(100,5000)',
        "totalPage": '@natural(100,5000)',
        "currentPage": '@natural(100,5000)',
        "list|1-10":
            [{
                "id": "@id()",
                "cardNumber": "@id()",
                "name": "@cname()",
                "usedName": "@cname()",
                "sex": "@cword('男女')性",
                "birth": "@date()",
                "nation": "@cword('汉满回藏苗彝壮侗瑶白')族",
                "nativePlace": "@province()",
                "maritalStatus": "未婚",
                "appearance": "群众",
                "educational": "其它",
                "religiousBeliefs": null,
                "serviceARea": null,
                "contact": null,
                "domicile": "@province()",
                "domicileAddress": "@county(true)",
                "nowlive": "@province()",
                "nowliveAddress": "龙港镇宣化社区宣化小区网格宣化小区18号楼二单元401室",
                "gridCode": "000000000000000",
                "type": "@natural( 0,1 )",
                "alias1": "一致",
                "alias2": "111111111",
                "alias3": null,
                "alias4": null,
                "alias5": "女",
                "alias6": null,
                "houseCode": "1000080020018020401",
                "focusClass": "非重点关注人群",
                "domicileCode": "140521",
                "addTime": "2018",
                "deleteTime": null,
                "occupation": "其他",
                "occupationCategory": "其他农业技术人员"
            }]
    }
});