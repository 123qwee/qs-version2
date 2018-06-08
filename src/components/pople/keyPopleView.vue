<template>
    <div>
        <el-dialog width="50%" title="详细帮扶内容" :visible.sync="keyPopulationHelpView" top="5vh" append-to-body>
            <div style="height:580px;">
                <happy-scroll color="rgba(51,51,51,0.2)" v-if="keyPopulationHelpView" hide-horizontal resize size="8">
                    <div style="padding-right:20px;">
                        <div class="row-border">
                            <el-row type="flex" justify="space-around">
                                <el-col class="column-title" :span="4">上报时间</el-col>
                                <el-col :span="8">{{popleHelpInfoDetails.reportDate}}</el-col>
                                <el-col class="column-title" :span="4">上报人姓名</el-col>
                                <el-col :span="8">{{popleHelpInfoDetails.reportUserName}}</el-col>
                            </el-row>
                            <el-row type="flex" justify="space-around">
                                <el-col class="column-title" :span="4">帮扶时间</el-col>
                                <el-col :span="8">{{popleHelpInfoDetails.helpDate}}</el-col>
                                <el-col class="column-title" :span="4">人员类型</el-col>
                                <el-col :span="8">{{MutualConversion(popleHelpInfoDetails.focusType)}}</el-col>
                            </el-row>
                            <el-row type="flex" justify="space-around">
                                <el-col class="column-title" :span="4">重点人员签名</el-col>
                                <el-col :span="8">
                                    <el-button type="text" v-if="popleHelpInfoDetails.focusSign" @click="handleViewPicture('focusSign')">查看签名</el-button>
                                    <span type="text" v-else>暂无签名</span>
                                </el-col>
                                <el-col class="column-title" :span="4">网格员签名</el-col>
                                <el-col :span="8">
                                    <el-button type="text" v-if="popleHelpInfoDetails.gridSign" @click="handleViewPicture('gridSign')">查看签名</el-button>
                                    <span type="text" v-else>暂无签名</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" justify="space-around">
                                <el-col class="column-title" :span="4">照片</el-col>
                                <el-col :span="8">
                                    <el-button type="text" v-if="popleHelpInfoDetails.picture" @click="handleViewPicture('picture')">查看照片</el-button>
                                    <span type="text" v-else>暂无照片</span>
                                </el-col>
                                <el-col class="column-title" :span="4">视频</el-col>
                                <el-col :span="8">
                                    <el-button type="text" v-if="popleHelpInfoDetails.video" @click="handleViewVideo">查看视频</el-button>
                                    <span type="text" v-else>暂无视频</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex" justify="space-around">
                                <el-col class="column-title" :span="4">人员情况</el-col>
                                <el-col :span="20">{{popleHelpInfoDetails.focusSituation}}</el-col>
                            </el-row>
                            <el-row type="flex" justify="space-around">
                                <el-col class="column-title" :span="4">帮扶情况</el-col>
                                <el-col :span="20">{{popleHelpInfoDetails.helpSituation}}</el-col>
                            </el-row>
                            <el-row type="flex" justify="space-around">
                                <el-col class="column-title" :span="4">备注</el-col>
                                <el-col :span="20">{{popleHelpInfoDetails.remark}}</el-col>
                            </el-row>
                        </div>
                        <div class="row-border" style="padding-top:10px;">
                            <el-row type="flex" justify="space-around">
                                <el-col :span="24" style="padding:0;">
                                    <vMap ref="map" :layers="olconfig" v-if="keyPopulationHelpView" :maps='mapname' style="height:300px;"></vMap>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </happy-scroll>
            </div>
        </el-dialog>
        <template v-if="isTable">
            <div class="row-border">
                <el-row type="flex" justify="space-around">
                    <el-col class="column-title" :span="3">姓名</el-col>
                    <el-col :span="3" class="txt-ellipsis" :title="popleBasicView.name">{{popleBasicView.name}}</el-col>
                    <el-col class="column-title" :span="3">身份证号</el-col>
                    <el-col :span="15">{{popleBasicView.cardNumber}}</el-col>
                </el-row>
                <el-row type="flex" justify="space-around">
                    <el-col class="column-title" :span="3">曾用名</el-col>
                    <el-col :span="3" class="txt-ellipsis" :title="popleBasicView.usedName">{{popleBasicView.usedName}}</el-col>
                    <el-col class="column-title" :span="3">性别</el-col>
                    <el-col :span="3">{{popleBasicView.sex}}</el-col>
                    <el-col class="column-title" :span="3">出生日期</el-col>
                    <el-col :span="3">{{popleBasicView.birth}}</el-col>
                    <el-col class="column-title" :span="3">政治面貌</el-col>
                    <el-col :span="3" class="txt-ellipsis" :title="popleBasicView.appearance">{{popleBasicView.appearance}}</el-col>
                </el-row>
                <el-row type="flex" justify="space-around">
                    <el-col class="column-title" :span="3">民族</el-col>
                    <el-col :span="3">{{popleBasicView.nation}}</el-col>
                    <el-col class="column-title" :span="3">籍贯</el-col>
                    <el-col :span="3">{{popleBasicView.nativePlace}}</el-col>
                    <el-col class="column-title" :span="3">婚姻状况</el-col>
                    <el-col :span="3">{{popleBasicView.maritalStatus}}</el-col>
                    <el-col class="column-title" :span="3">学历</el-col>
                    <el-col :span="3">{{popleBasicView.educational}}</el-col>
                </el-row>
                <el-row type="flex" justify="space-around">
                    <el-col class="column-title" :span="3">宗教信仰</el-col>
                    <el-col :span="3" class="txt-ellipsis" :title="popleBasicView.religiousBeliefs">{{popleBasicView.religiousBeliefs}}</el-col>
                    <el-col class="column-title" :span="3">联系方式</el-col>
                    <el-col :span="15">{{popleBasicView.contact}}</el-col>
                </el-row>
            </div>
            <div class="row-border" style="margin-top:10px;">
                <el-row type="flex" justify="space-around">
                    <el-col class="column-title" :span="3">职业类别</el-col>
                    <el-col :span="6" class="txt-ellipsis" :title="popleBasicView.occupationCategory">{{popleBasicView.occupationCategory}}</el-col>
                    <el-col class="column-title" :span="3">职业</el-col>
                    <el-col :span="4" class="txt-ellipsis" :title="popleBasicView.occupation">{{popleBasicView.occupation}}</el-col>
                    <el-col class="column-title" :span="3">服务处所</el-col>
                    <el-col :span="5" class="txt-ellipsis" :title="popleBasicView.serviceARea">{{popleBasicView.serviceARea}}</el-col>
                </el-row>
                <el-row type="flex" justify="space-around">
                    <el-col class="column-title" :span="3">户籍地</el-col>
                    <el-col :span="9" class="txt-ellipsis" :title="popleBasicView.domicile">{{popleBasicView.domicile}}</el-col>
                    <el-col class="column-title" :span="3">户籍门(楼)地址</el-col>
                    <el-col :span="9" class="txt-ellipsis" :title="popleBasicView.domicileAddress">{{popleBasicView.domicileAddress}}</el-col>
                </el-row>
                <el-row type="flex" justify="space-around">
                    <el-col class="column-title" :span="3">现住地</el-col>
                    <el-col :span="9" class="txt-ellipsis" :title="popleBasicView.nowlive">{{popleBasicView.nowlive}}</el-col>
                    <el-col class="column-title" :span="3">现住门(楼)地址</el-col>
                    <el-col :span="9" class="txt-ellipsis" :title="popleBasicView.nowliveAddress">{{popleBasicView.nowliveAddress}}</el-col>
                </el-row>
            </div>
        </template>
        <div style="font-size: 16px;margin-top: 12px; font-size: 18px;color: #2d2f33;">
            <span>重点人员类型</span>
        </div>
        <el-tabs type="border-card" class="content" @tab-click="handleTabClick" v-if="tabsReset">
            <el-tab-pane :label="items.label" class="list" :name="String(index)" v-for="(items,index) in details" :key="index">
                <div style="height:340px;">
                    <happy-scroll color="rgba(51,51,51,0.2)" v-if="scrollReset" hide-horizontal resize size="8">
                        <div style="padding-right:20px;">
                            <div class="row-border" style="margin:20px 0;">
                                <el-row type="flex" justify="space-around" v-for="(item,key) in items.value" :key="key">
                                    <template v-for="(v,k) in item">
                                        <el-col class="column-title" :span="v.labelWidth">{{v.label}}</el-col>
                                        <el-col v-if="v.valueWidth != '20'" :span="v.valueWidth" class="txt-ellipsis" :title="v.value">{{v.value}}</el-col>
                                        <el-col v-else :span="v.valueWidth" style="word-break: break-all;">{{v.value}}</el-col>
                                    </template>
                                </el-row>
                            </div>
                        </div>
                    </happy-scroll>
                </div>
            </el-tab-pane>
            <el-tab-pane v-if="tableData.length > 0" label="帮扶记录" class="list" name="helpRecord">
                <el-table :data="tableData" height="340" border style="overflow:hidden;overflow-y:auto;">
                    <el-table-column type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="reportUserName" width="200" label="上报人姓名"></el-table-column>
                    <el-table-column prop="type" width="200" label="人员类型">
                        <template slot-scope="scope">
                            <span>{{MutualConversion(scope.row.focusType)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="helpDate" width="200" label="帮扶时间"></el-table-column>
                    <el-table-column prop="helpSituation" label="帮扶情况" show-overflow-tooltip> </el-table-column>
                    <el-table-column label="操作" width="80">
                        <template slot-scope="scope">
                            <el-button type="success" size="small" @click="handleView(scope.$index, scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    import vMap from "../map/MapComponent1.vue";
    import { CONFIG } from "./config/olconfig";
    import { VistualEmit } from "@/pages/GridManage/main/vistual.emit";

    import vPopleBasic from "./popleBasic.vue";
    import service from "./pople_service.js";
    import { HappyScroll } from "vue-happy-scroll";
    export default {
        components: {
            vPopleBasic,
            HappyScroll,
            vMap
        },
        props: {
            popleBasicView: {
                type: Object,
                default: {
                    id: "",
                    name: "", // 姓名
                    cardNumber: "", // 身份证号
                    usedname: "", // 曾用名
                    sex: "", // 性别
                    birth: "", // 出生日期
                    appearance: "", // 政治面貌
                    nation: "", // 民族
                    nativeplace: "", // 籍贯
                    maritalStatus: "", // 婚姻状况
                    educational: "", // 学历
                    religiousbeliefs: "", // 宗教信仰
                    contact: "", // 联系方式
                    occupationcategory: "", // 职业类别
                    occupation: "", // 职业
                    servicearea: "", // 服务处所
                    domicile: "", // 户籍地
                    domicileaddress: "", // 户籍门(楼)地址
                    nowlive: "", // 现住地
                    nowliveaddress: "", // 现住门(楼)地址
                    alias1: "",
                    alias2: "",
                    alias3: "",
                    alias4: "",
                    alias5: "",
                    alias6: "",
                    gridCode: "",
                }
            },
            isTable: {
                type: Boolean,
                default: true,
            },
            mapname:{
                type:String,
                default:"keypopleinfoMap",
            }
        },
        data() {
            return {
                // 设置地图加载要绑定的全局名称
                // mapname: "keyPopleHelpRecord",
                olconfig: CONFIG,

                keyPopulationHelpView: false, // 帮扶记录查看dialog
                // 帮扶记录列表
                tableData: [],
                details: [],
                // 帮扶详细记录
                popleHelpInfoDetails: {},
                scrollReset: true, // 滚动条刷新
                tabsReset: true, // 标签页控件重新加载
            };
        },
        watch: {
            popleBasicView: function (nVal, oVal) {
                this.handleQueryInfo(nVal.id);
            },
            keyPopulationHelpView: function (nVal, oVal) {
                if (nVal) {
                    this.$nextTick(() => {
                        if (this.popleHelpInfoDetails.lon && this.popleHelpInfoDetails.lat) {
                            this.createFeature(this.popleHelpInfoDetails.lon, this.popleHelpInfoDetails.lat);
                            window[this.mapname].operation.setCenterAndZoom([this.popleHelpInfoDetails.lon, this.popleHelpInfoDetails.lat], 15);
                        }
                    });
                }
            }
        },
        created() {
        },

        mounted() {
            this.handleQueryInfo(this.popleBasicView.id);
        },
        // beforeDestroy() {
        //     window[this.mapname].operation.setFullExtent();
        // },

        methods: {
            // 添加帮扶记录
            handleAdd() {
                this.keyPopulationHelp = true;
            },
            // 查看帮扶记录
            handleView(index, row) {
                this.keyPopulationHelpView = true;
                this.popleHelpInfoDetails = row;
            },
            async createFeature(lon, lat) {
                let features = [new ol.Feature({
                    geometry: new ol.geom.Point([lon, lat, 1000])
                })];

                function sFeatur(features) {
                    return async (evt, next) => {
                        evt.setFeatures(features);
                        next();
                    };
                }
                await window[this.mapname].layer.markerLayer.use(
                    [sFeatur(features)]
                );
            },
            // 查询重点人员信息
            handleQueryInfo(id) {
                let that = this;
                service.service.keyPopleInfo({
                    data: {
                        id: id,
                        change: "1",
                        findType: "focus",
                    },
                    successFunc: data => {
                        that.details = [];
                        if (data.code == 200) {
                            let tabList = [];
                            // 吸毒
                            if (data.data.drugStaff) {
                                let drugStaff = data.data.drugStaff;
                                tabList.push({
                                    label: "吸毒人员", value: [
                                        [
                                            { label: "重点人员类型", value: "吸毒人员", labelWidth: 4, valueWidth: 8 },
                                            { label: "初次发现日期", value: drugStaff.discoveredFirsttime, labelWidth: 4, valueWidth: 8 },
                                        ], [
                                            { label: "管控人姓名", value: drugStaff.managementName, labelWidth: 4, valueWidth: 8 },
                                            { label: "管控人联系方式", value: drugStaff.managementContact, labelWidth: 4, valueWidth: 8 }
                                        ],
                                        [{ label: "管控情况", value: drugStaff.managementSituation, labelWidth: 4, valueWidth: 20 }],
                                        [
                                            { label: "帮扶人姓名", value: drugStaff.helpName, labelWidth: 4, valueWidth: 8 },
                                            { label: "帮扶人联系方式", value: drugStaff.helpContact, labelWidth: 4, valueWidth: 8 }
                                        ],
                                        [{ label: "帮扶情况", value: drugStaff.helpSituation, labelWidth: 4, valueWidth: 20 }],
                                        [
                                            { label: "有无犯罪史", value: drugStaff.isCriminal == "1" ? "有" : "无", labelWidth: 4, valueWidth: 4 },
                                            { label: "吸毒原因", value: drugStaff.drugReasons, labelWidth: 4, valueWidth: 4 },
                                            { label: "吸毒后果", value: drugStaff.drugResult, labelWidth: 4, valueWidth: 4 }
                                        ],
                                        [{ label: "犯罪情况", value: drugStaff.criminalSituation, labelWidth: 4, valueWidth: 20 }],

                                    ]
                                });
                            };
                            // 精神障碍
                            if (data.data.mentalPatientInfo) {
                                let mentalPatientInfo = data.data.mentalPatientInfo;
                                tabList.push({
                                    label: "严重精神障碍人员", value: [
                                        [
                                            { label: "重点人员类型", value: "严重精神障碍人员", labelWidth: 4, valueWidth: 4 },
                                            { label: "家庭经济状况", value: mentalPatientInfo.financialSituation, labelWidth: 4, valueWidth: 4 },
                                            { label: "是否纳入低保", value: mentalPatientInfo.isSecurity == "1" ? "是" : "否", labelWidth: 4, valueWidth: 4 }
                                        ], [
                                            { label: "监护人身份证号", value: mentalPatientInfo.guardianCardnumber, labelWidth: 4, valueWidth: 4 },
                                            { label: "监护人姓名", value: mentalPatientInfo.guardianName, labelWidth: 4, valueWidth: 4 },
                                            { label: "监护人联系方式", value: mentalPatientInfo.guardianContact, labelWidth: 4, valueWidth: 4 }
                                        ], [
                                            { label: "初次发病日期", value: mentalPatientInfo.diseaseDate, labelWidth: 4, valueWidth: 4 },
                                            { label: "目前诊断类型", value: mentalPatientInfo.diagnosticType, labelWidth: 4, valueWidth: 4 },
                                            { label: "有无肇事肇祸史", value: mentalPatientInfo.isAccident == "1" ? "有" : "无", labelWidth: 4, valueWidth: 4 }
                                        ], [
                                            { label: "肇事肇祸次数", value: mentalPatientInfo.accidentFrequency, labelWidth: 4, valueWidth: 4 },
                                            { label: "上次肇事肇祸日期", value: mentalPatientInfo.accidentLasttime, labelWidth: 4, valueWidth: 4 },
                                            { label: "目前危险评估情况登记", value: mentalPatientInfo.dangerousGrade, labelWidth: 4, valueWidth: 4 }
                                        ], [
                                            { label: "治疗情况", value: mentalPatientInfo.treatmentSituation, labelWidth: 4, valueWidth: 8 },
                                            { label: "治疗医院名称", value: mentalPatientInfo.treatmentHospitalName, labelWidth: 4, valueWidth: 8 }
                                        ], [
                                            { label: "实施住院治疗原因", value: mentalPatientInfo.treatmentReasons, labelWidth: 4, valueWidth: 8 },
                                            { label: "接受康复训练机构名称", value: mentalPatientInfo.recoveryName, labelWidth: 4, valueWidth: 8 }
                                        ], [
                                            { label: "参与管理人员", value: mentalPatientInfo.manager, labelWidth: 4, valueWidth: 8 },
                                            { label: "帮扶情况", value: mentalPatientInfo.helpSituation, labelWidth: 4, valueWidth: 8 }
                                        ],
                                    ]
                                });
                            };
                            // 刑满释放人员
                            if (data.data.releaseStaff) {
                                let releaseStaff = data.data.releaseStaff;
                                tabList.push({
                                    label: "刑满释放人员", value: [
                                        [
                                            { label: "重点人员类型", value: "刑满释放人员", labelWidth: 4, valueWidth: 8 },
                                            { label: "危险评估等级", value: releaseStaff.riskType, labelWidth: 4, valueWidth: 8 },
                                        ], [
                                            { label: "是否累犯", value: releaseStaff.isCriminal == 1 ? "是" : "否", labelWidth: 4, valueWidth: 4 },
                                            { label: "原罪名", value: releaseStaff.originalSinners, labelWidth: 4, valueWidth: 4 },
                                            { label: "原判刑期", value: releaseStaff.originalSentence, labelWidth: 4, valueWidth: 4 },
                                        ], [
                                            { label: "释放日期", value: releaseStaff.freedDate, labelWidth: 4, valueWidth: 4 },
                                            { label: "服刑场所", value: releaseStaff.servicePlace, labelWidth: 4, valueWidth: 12 },
                                        ], [
                                            { label: "衔接日期", value: releaseStaff.crimeagainName, labelWidth: 4, valueWidth: 8 },
                                            { label: "衔接情况", value: releaseStaff.financialSituation, labelWidth: 4, valueWidth: 8 },
                                        ], [
                                            { label: "安置日期", value: releaseStaff.placeDate, labelWidth: 4, valueWidth: 8 },
                                            { label: "安置情况", value: releaseStaff.placeSituation, labelWidth: 4, valueWidth: 8 },
                                        ], [
                                            { label: "是否重新犯罪", value: releaseStaff.isCrimeagin == 1 ? "是" : "否", labelWidth: 4, valueWidth: 8 },
                                            { label: "重新犯罪罪名", value: releaseStaff.crimeagainName, labelWidth: 4, valueWidth: 8 },
                                        ], [
                                            { label: "未安置原因", value: releaseStaff.unplacedReason, labelWidth: 4, valueWidth: 20 },

                                        ], [
                                            { label: "帮教情况", value: releaseStaff.teachSituation, labelWidth: 4, valueWidth: 20 },
                                        ]
                                    ]
                                });
                            };
                            // 重点青少年
                            if (data.data.focusTeens) {
                                let focusTeens = data.data.focusTeens;
                                tabList.push({
                                    label: "重点青少年", value: [
                                        [
                                            { label: "重点人员类型", value: "重点青少年", labelWidth: 4, valueWidth: 8 },
                                            { label: "人员类型", value: focusTeens.personType, labelWidth: 4, valueWidth: 8 },
                                        ], [
                                            { label: "家庭情况", value: focusTeens.familySituation, labelWidth: 4, valueWidth: 4 },
                                            { label: "监护人身份证号", value: focusTeens.guardianCardNumber, labelWidth: 4, valueWidth: 4 },
                                            { label: "监护人姓名", value: focusTeens.guardianName, labelWidth: 4, valueWidth: 4 }
                                        ], [
                                            { label: "与监护人关系", value: focusTeens.guardianRelationship, labelWidth: 4, valueWidth: 4 },
                                            { label: "监护人联系方式", value: focusTeens.guardianContact, labelWidth: 4, valueWidth: 4 },
                                            { label: "监护人居住地址", value: focusTeens.guardianAddress, labelWidth: 4, valueWidth: 4 }
                                        ], [
                                            { label: "是否违法犯罪", value: focusTeens.isCriminal == 1 ? "是" : "否", labelWidth: 4, valueWidth: 20 }
                                        ], [
                                            { label: "违法犯罪情况", value: focusTeens.criminalSituation, labelWidth: 4, valueWidth: 20 },
                                        ], [
                                            { label: "帮扶人姓名", value: focusTeens.helpName, labelWidth: 4, valueWidth: 8 },
                                            { label: "帮扶人联系方式", value: focusTeens.helpContact, labelWidth: 4, valueWidth: 8 },
                                        ], [
                                            { label: "帮扶手段", value: focusTeens.heplMeans, labelWidth: 4, valueWidth: 20 },
                                        ], [
                                            { label: "帮扶情况", value: focusTeens.helpSituation, labelWidth: 4, valueWidth: 20 },
                                        ]
                                    ]
                                });
                            };
                            // 社区矫正人员
                            if (data.data.communityRedressStaff) {
                                let communityRedressStaff = data.data.communityRedressStaff;
                                tabList.push({
                                    label: "社区矫正人员", value: [
                                        [
                                            { label: "重点人员类型", value: "社区矫正人员", labelWidth: 4, valueWidth: 8 },
                                            { label: "社区矫正人员编号", value: communityRedressStaff.redressId, labelWidth: 4, valueWidth: 8 },
                                        ], [
                                            { label: "矫正类别", value: communityRedressStaff.redressType, labelWidth: 4, valueWidth: 8 },
                                            { label: "案件类别", value: communityRedressStaff.caseType, labelWidth: 4, valueWidth: 8 },
                                        ], [
                                            { label: "具体罪名", value: communityRedressStaff.specificCharges, labelWidth: 4, valueWidth: 8 },
                                            { label: "原羁押场所", value: communityRedressStaff.originalPrison, labelWidth: 4, valueWidth: 8 },
                                        ], [
                                            { label: "原判刑期", value: communityRedressStaff.originalSentence, labelWidth: 4, valueWidth: 4 },
                                            { label: "原判刑开始日期", value: communityRedressStaff.originalStartDate, labelWidth: 4, valueWidth: 4 },
                                            { label: "原判刑结束日期", value: communityRedressStaff.originalEndDate, labelWidth: 4, valueWidth: 4 },
                                        ], [
                                            { label: "接收方式", value: communityRedressStaff.receiveMethod, labelWidth: 4, valueWidth: 4 },
                                            { label: "矫正开始日期", value: communityRedressStaff.redressStartDate, labelWidth: 4, valueWidth: 4 },
                                            { label: "矫正结束日期", value: communityRedressStaff.redressEndDate, labelWidth: 4, valueWidth: 4 },
                                        ], [
                                            { label: "'四史'情况", value: communityRedressStaff.fourSituation, labelWidth: 4, valueWidth: 8 },
                                            { label: "'三涉'情况", value: communityRedressStaff.threeSituation, labelWidth: 4, valueWidth: 8 },
                                        ], [
                                            { label: "是否惯犯", value: communityRedressStaff.isRecidivist == 1 ? "是" : "否", labelWidth: 4, valueWidth: 8 },
                                            { label: "是否建立矫正小组", value: communityRedressStaff.isGroup == 1 ? "是" : "否", labelWidth: 4, valueWidth: 8 },
                                        ], [
                                            { label: "矫正小组人员组成情况", value: communityRedressStaff.groupComponent, labelWidth: 4, valueWidth: 8 },
                                            { label: "矫正解除(终止)类型", value: communityRedressStaff.redressLiftedType, labelWidth: 4, valueWidth: 8 },
                                        ], [
                                            { label: "是否有托管", value: communityRedressStaff.isHosted == 1 ? "是" : "否", labelWidth: 4, valueWidth: 4 },
                                            { label: "托管原因", value: communityRedressStaff.hostedReasons, labelWidth: 4, valueWidth: 12 },
                                        ], [
                                            { label: "检查监督托管情况", value: communityRedressStaff.hostedSituation, labelWidth: 4, valueWidth: 20 },
                                        ], [
                                            { label: "托管纠正情况", value: communityRedressStaff.hostedCorrectSituation, labelWidth: 4, valueWidth: 20 },
                                        ], [
                                            { label: "是否有漏管", value: communityRedressStaff.isDraintube == 1 ? "是" : "否", labelWidth: 4, valueWidth: 4 },
                                            { label: "漏管原因", value: communityRedressStaff.draintubeReasons, labelWidth: 4, valueWidth: 12 },
                                        ], [
                                            { label: "检查监督漏管情况", value: communityRedressStaff.draintubeSituation, labelWidth: 4, valueWidth: 20 },
                                        ], [
                                            { label: "漏管纠正情况", value: communityRedressStaff.draintubeCorrectSituation, labelWidth: 4, valueWidth: 20 },
                                        ], [
                                            { label: "奖惩情况", value: communityRedressStaff.rewardsSituation, labelWidth: 4, valueWidth: 20 },
                                        ], [
                                            { label: "刑罚变更执行情况", value: communityRedressStaff.penaltyChanges, labelWidth: 4, valueWidth: 20 },
                                        ], [
                                            { label: "是否重新犯罪", value: communityRedressStaff.isCrimeagin == 1 ? "是" : "否", labelWidth: 4, valueWidth: 4 },
                                            { label: "重新犯罪罪名", value: communityRedressStaff.crimeagainName, labelWidth: 4, valueWidth: 12 },
                                        ]
                                    ]
                                });
                            };
                            // 艾滋病危险人员
                            if (data.data.aidsStaff) {
                                let AidsStaff = data.data.aidsStaff;
                                tabList.push({
                                    label: "艾滋病危险人员", value: [
                                        [
                                            { label: "重点人员类型", value: "艾滋病危险人员", labelWidth: 4, valueWidth: 4 },
                                            { label: "感染途径", value: AidsStaff.infectionWay, labelWidth: 4, valueWidth: 4 },
                                            { label: "是否有违法犯罪史", value: AidsStaff.isCriminal == 1 ? "是" : "否", labelWidth: 4, valueWidth: 4 },
                                        ], [
                                            { label: "违法犯罪情况", value: AidsStaff.criminalSituation, labelWidth: 4, valueWidth: 20 },
                                        ], [
                                            { label: "案件类别", value: AidsStaff.caseType, labelWidth: 4, valueWidth: 8 },
                                            { label: "关注类型", value: AidsStaff.concernedType, labelWidth: 4, valueWidth: 8 },
                                        ], [
                                            { label: "帮扶人姓名", value: AidsStaff.helpName, labelWidth: 4, valueWidth: 8 },
                                            { label: "帮扶人联系方式", value: AidsStaff.helpContact, labelWidth: 4, valueWidth: 8 },
                                        ], [
                                            { label: "帮扶情况", value: AidsStaff.helpSituation, labelWidth: 4, valueWidth: 20 },
                                        ], [
                                            { label: "收治情况", value: AidsStaff.treatmentSituation, labelWidth: 4, valueWidth: 8 },
                                            { label: "收治医疗机构名称", value: AidsStaff.treatmentOrgname, labelWidth: 4, valueWidth: 8 },
                                        ]
                                    ]
                                });
                            };
                            // 留守人员
                            if (data.data.stayStaff) {
                                let StayStaff = data.data.stayStaff;
                                tabList.push({
                                    label: "留守人员", value: [
                                        [
                                            { label: "重点人员类型", value: "留守人员", labelWidth: 4, valueWidth: 8 },
                                            { label: "健康状况", value: StayStaff.healthStatus, labelWidth: 4, valueWidth: 8 },
                                        ], [
                                            { label: "个人年收入", value: StayStaff.personalIncome, labelWidth: 4, valueWidth: 4 },
                                            { label: "人户一致标识", value: StayStaff.householdIdentity, labelWidth: 4, valueWidth: 4 },
                                            { label: "留守人员类型", value: StayStaff.stayingType, labelWidth: 4, valueWidth: 4 },
                                        ], [
                                            { label: "家庭主要成员姓名", value: StayStaff.keyName, labelWidth: 4, valueWidth: 4 },
                                            { label: "家庭主要成员身份证号码", value: StayStaff.keyCardNumber, labelWidth: 4, valueWidth: 4 },
                                            { label: "与留守人员关系", value: StayStaff.relationShip, labelWidth: 4, valueWidth: 4 },
                                        ], [
                                            { label: "家庭主要成员健康状况", value: StayStaff.keyHealth, labelWidth: 4, valueWidth: 8 },
                                            { label: "家庭主要成员联系方式", value: StayStaff.keyContact, labelWidth: 4, valueWidth: 8 },
                                        ], [
                                            { label: "家庭主要成员工作详细地址", value: StayStaff.keyAddress, labelWidth: 4, valueWidth: 8 },
                                            { label: "家庭年收入", value: StayStaff.annualIncome, labelWidth: 4, valueWidth: 8 },
                                        ], [
                                            { label: "困难及诉求", value: StayStaff.difficultiesDemands, labelWidth: 4, valueWidth: 20 },
                                        ], [
                                            { label: "帮扶情况", value: StayStaff.helpSituation, labelWidth: 4, valueWidth: 20 },
                                        ]
                                    ]
                                });
                            };
                            that.details = tabList;
                            // 重新渲染标签页dom，使默认选择标签页第一项。
                            that.tabsReset = false;
                            setTimeout(() => {
                                that.tabsReset = true;
                            }, 3);
                        }
                    },
                    errorFunc: data => {
                        that.details = [];
                    }
                });
                // 查询帮扶记录
                service.service.popleHelpRecord({
                    data: {
                        cardNumber: this.popleBasicView.cardNumber
                    },
                    successFunc: data => {
                        that.tableData = [];
                        if (data.code == 200) {
                            that.tableData = data.data;
                        }
                    },
                    errorFunc: data => {
                        that.details = [];
                    }
                })
            },
            // 重点人员类型切换
            handleTabClick(tab) {
                let that = this;
                that.scrollReset = false;
                setTimeout(() => {
                    that.scrollReset = true;
                }, 200);
            },
            // 人员类型和人员类型名称互转
            MutualConversion(val) {
                return utilsOper.MutualConversion(val);

            },
            handleViewPicture(type) {
                let pictureData;
                if (type == "focusSign") {
                    pictureData = this.popleHelpInfoDetails.focusSign ? this.popleHelpInfoDetails.focusSign.split(",") : [];
                } else if (type == "gridSign") {
                    pictureData = this.popleHelpInfoDetails.gridSign ? this.popleHelpInfoDetails.gridSign.split(",") : [];
                } else {
                    pictureData = this.popleHelpInfoDetails.picture ? this.popleHelpInfoDetails.picture.split(",") : [];
                }
                let pictures = [];
                _.map(pictureData, item => {
                    if (item.length != 0) {
                        pictures.push(constants.READ_FILE_URL + "/" + item + ".png");
                    }
                });
                this.$root.$children[0].$refs["vGallery"].fileUrls = pictures;
                this.$root.$children[0].$refs["vGallery"].index = 0;
                this.$root.$children[0].$refs["vGallery"].visible = true;
            },
            handleViewVideo() {
                let videos = [];
                _.map(this.popleHelpInfoDetails.video.split(","), item => {
                    if (item.length != 0) {
                        videos.push(constants.READ_FILE_URL + "/" + item + ".mp4");
                    }
                });
                this.$root.$children[0].$refs["vGallery"].fileUrls = videos;
                this.$root.$children[0].$refs["vGallery"].index = 0;
                this.$root.$children[0].$refs["vGallery"].visible = true;
            }
        }
    };
</script>
<style lang="sass">
    @import "../../pages/grid_manage/main/main.scss";
</style>