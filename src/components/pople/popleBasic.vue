<template>
    <div>
        <div class="row-border">
            <template v-if="popleType">
                        <el-row type="flex" justify="space-around" v-if="!isKeyPople" style="line-height:40px;">
                            <el-col class="column-title" :span="3">姓名</el-col>
                            <el-col :span="3" class="txt-ellipsis" :title="popleView.name">{{popleView.name}}</el-col>
                            <el-col class="column-title" :span="3">身份证号</el-col>
                            <el-col :span="15" class="txt-ellipsis" :title="popleView.cardNumber">{{popleView.cardNumber}}</el-col>
                        </el-row>
                        <el-row type="flex" justify="space-around" v-else style="line-height:40px;">
                            <el-col class="column-title" :span="3">姓名</el-col>
                            <el-col :span="3" class="txt-ellipsis" :title="popleView.name">{{popleView.name}}</el-col>
                            <el-col class="column-title" :span="3">身份证号</el-col>
                            <el-col :span=table_width class="txt-ellipsis" :title="popleView.cardNumber">{{popleView.cardNumber}}</el-col>
                            <el-col :span="6" style="color:#07d;cursor:pointer"  v-if="authority">
                                <el-button type="text" @click="handleShowKeyPople">重点关注人员</el-button>
                            </el-col>
                        </el-row>
</template>
<template v-else>
    <el-row type="flex" justify="space-around" style="line-height:40px;">
        <el-col class="column-title" :span="3">姓名</el-col>
        <el-col :span="3" class="txt-ellipsis" :title="popleView.name">{{popleView.name}}</el-col>
        <el-col class="column-title" :span="3">身份证号</el-col>
        <el-col :span="15" class="txt-ellipsis" :title="popleView.cardNumber">{{popleView.cardNumber}}</el-col>
    </el-row>
</template>

            <el-row type="flex" justify="space-around">
                <el-col class="column-title" :span="3">曾用名</el-col>
                <el-col :span="3" class="txt-ellipsis" :title="popleView.usedName">{{popleView.usedName}}</el-col>
                <el-col class="column-title" :span="3">性别</el-col>
                <el-col :span="3" class="txt-ellipsis" :title="popleView.sex">{{popleView.sex}}</el-col>
                <el-col class="column-title" :span="3">出生日期</el-col>
                <el-col :span="3" class="txt-ellipsis" :title="popleView.birth">{{popleView.birth}}</el-col>
                <el-col class="column-title" :span="3">政治面貌</el-col>
                <el-col :span="3" class="txt-ellipsis" :title="popleView.appearance">{{popleView.appearance}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-around">
                <el-col class="column-title" :span="3">民族</el-col>
                <el-col :span="3" class="txt-ellipsis" :title="popleView.nation">{{popleView.nation}}</el-col>
                <el-col class="column-title" :span="3">籍贯</el-col>
                <el-col :span="3" class="txt-ellipsis" :title="popleView.nativePlace">{{popleView.nativePlace}}</el-col>
                <el-col class="column-title" :span="3">婚姻状况</el-col>
                <el-col :span="3" class="txt-ellipsis" :title="popleView.maritalStatus">{{popleView.maritalStatus}}</el-col>
                <el-col class="column-title" :span="3">学历</el-col>
                <el-col :span="3" class="txt-ellipsis" :title="popleView.educational">{{popleView.educational}}</el-col>
            </el-row>
<template v-if="!HousesView">
    <el-row type="flex" justify="space-around">
        <el-col class="column-title" :span="3">宗教信仰</el-col>
        <el-col :span="3" class="txt-ellipsis" :title="popleView.religiousBeliefs">{{popleView.religiousBeliefs}}</el-col>
        <el-col class="column-title" :span="3">联系方式</el-col>
        <el-col :span="15" class="txt-ellipsis" :title="popleView.contact">{{popleView.contact}}</el-col>
    </el-row>
</template>
<template v-else>
    <el-row type="flex" justify="space-around">
        <el-col class="column-title" :span="3">宗教信仰</el-col>
        <el-col :span="3" class="txt-ellipsis" :title="popleView.religiousBeliefs">{{popleView.religiousBeliefs}}</el-col>
        <el-col class="column-title" :span="3">联系方式</el-col>
        <el-col :span="9" class="txt-ellipsis" :title="popleView.contact">{{popleView.contact}}</el-col>
        <el-col :span="6" style="color:#07d;cursor:pointer">
            <el-button type="text" @click="handleShowHouses">查看此人房产</el-button>
        </el-col>
    </el-row>
</template>
        </div>
        <div v-if="showHouses" class="row-border" style="margin-top:10px;">
            <el-row type="flex" justify="space-around"> 
                <el-col class="column-title" :span="24" >共{{houseNum+1}}套房产</el-col>
            </el-row>
            <div v-for="(house, index) in houses">
            <el-row type="flex" justify="space-around"> 
                 <el-col :span="24" class="txt-ellipsis">{{house.roomAddress}}</el-col>
            </el-row>
            </div>
        </div>
        <div class="row-border" style="margin-top:10px;">
            <el-row type="flex" justify="space-around">
                <el-col class="column-title" :span="3">职业类别</el-col>
                <el-col :span="6" class="txt-ellipsis" :title="popleView.occupationCategory">{{popleView.occupationCategory}}</el-col>
                <el-col class="column-title" :span="3">职业</el-col>
                <el-col :span="3" class="txt-ellipsis" :title="popleView.occupation">{{popleView.occupation}}</el-col>
                <el-col class="column-title" :span="3">服务处所</el-col>
                <el-col :span="6" class="txt-ellipsis" :title="popleView.serviceArea || popleView.serviceARea">{{popleView.serviceArea || popleView.serviceARea}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-around">
                <el-col class="column-title" :span="3">户籍地</el-col>
                <el-col :span="9" class="txt-ellipsis" :title="popleView.domicile">{{popleView.domicile}}</el-col>
                <el-col class="column-title" :span="3">户籍门(楼)地址</el-col>
                <el-col :span="9" class="txt-ellipsis" :title="popleView.domicileAddress">{{popleView.domicileAddress}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-around">
                <el-col class="column-title" :span="3">现住地</el-col>
                <el-col :span="9" class="txt-ellipsis" :title="popleView.nowlive">{{popleView.nowlive}}</el-col>
                <el-col class="column-title" :span="3">现住门(楼)地址</el-col>
                <el-col :span="9" class="txt-ellipsis" :title="popleView.nowliveAddress">{{popleView.nowliveAddress}}</el-col>
            </el-row>
        </div>
<template v-if="popleType">
    <div class="row-border" style="margin-top:10px;" v-if="popleView.type == 1">
        <el-row type="flex" justify="space-around">
            <el-col class="column-title" :span="3">户主姓名</el-col>
            <el-col :span="5" class="txt-ellipsis" :title="popleView.alias4">{{popleView.alias4}}</el-col>
            <el-col class="column-title" :span="3">户号</el-col>
            <el-col :span="5" class="txt-ellipsis" :title="popleView.alias2">{{popleView.alias2}}</el-col>
            <el-col class="column-title" :span="3">户主公民身份证号码</el-col>
            <el-col :span="5" class="txt-ellipsis" :title="popleView.alias3">{{popleView.alias3}}</el-col>
        </el-row>
        <el-row type="flex" justify="start">
            <el-col class="column-title" :span="3">户主联系方式</el-col>
            <el-col :span="5" class="txt-ellipsis" :title="popleView.alias6">{{popleView.alias6}}</el-col>
            <el-col class="column-title" :span="3">人户一致标识</el-col>
            <el-col :span="5" class="txt-ellipsis" :title="popleView.alias1">{{popleView.alias1}}</el-col>
            <el-col class="column-title" :span="3">与户主关系</el-col>
            <el-col :span="5" class="txt-ellipsis" :title="popleView.alias5">{{popleView.alias5}}</el-col>
        </el-row>
    </div>
    <div class="row-border" style="margin-top:10px;" v-else-if="popleView.type == 0">
        <el-row type="flex" justify="space-around">
            <el-col class="column-title" :span="3">流入原因</el-col>
            <el-col :span="5" class="txt-ellipsis" :title="popleView.alias1">{{popleView.alias1}}</el-col>
            <el-col class="column-title" :span="3">办证类型</el-col>
            <el-col :span="5" class="txt-ellipsis" :title="popleView.alias2">{{popleView.alias2}}</el-col>
            <el-col class="column-title" :span="3">证件号码</el-col>
            <el-col :span="5" class="txt-ellipsis" :title="popleView.alias3">{{popleView.alias3}}</el-col>
        </el-row>
        <el-row type="flex" justify="start">
            <el-col class="column-title" :span="3">登记日期</el-col>
            <el-col :span="5" class="txt-ellipsis" :title="popleView.alias4">{{popleView.alias4}}</el-col>
            <el-col class="column-title" :span="3">证件到期日期</el-col>
            <el-col :span="5" class="txt-ellipsis" :title="popleView.alias5">{{popleView.alias5}}</el-col>
            <el-col class="column-title" :span="3">住所类型</el-col>
            <el-col :span="5" class="txt-ellipsis" :title="popleView.alias6">{{popleView.alias6}}</el-col>
        </el-row>
    </div>
</template>
<template v-else-if="!popleType && correctField">
    <div class="row-border" style="margin-top:10px;" v-if="popleView.type == 1">
        <el-row type="flex" justify="space-around">
            <el-col class="column-title" :span="3">户主姓名</el-col>
            <el-col :span="5" class="txt-ellipsis" :title="popleView.householdName">{{popleView.householdName}}</el-col>
            <el-col class="column-title" :span="3">户号</el-col>
            <el-col :span="5" class="txt-ellipsis" :title="popleView.domicileNumber">{{popleView.domicileNumber}}</el-col>
            <el-col class="column-title" :span="3">户主公民身份证号码</el-col>
            <el-col :span="5" class="txt-ellipsis" :title="popleView.householdCardnumber">{{popleView.householdCardnumber}}</el-col>
        </el-row>
        <el-row type="flex" justify="start">
            <el-col class="column-title" :span="3">户主联系方式</el-col>
            <el-col :span="5" class="txt-ellipsis" :title="popleView.householdContact">{{popleView.householdContact}}</el-col>
            <el-col class="column-title" :span="3">人户一致标识</el-col>
            <el-col :span="5" class="txt-ellipsis" :title="popleView.householdSign">{{popleView.householdSign}}</el-col>
            <el-col class="column-title" :span="3">与户主关系</el-col>
            <el-col :span="5" class="txt-ellipsis" :title="popleView.householdRelationship">{{popleView.householdRelationship}}</el-col>
        </el-row>
    </div>
    <div class="row-border" style="margin-top:10px;" v-else-if="popleView.type == 0">
        <el-row type="flex" justify="space-around">
            <el-col class="column-title" :span="3">流入原因</el-col>
            <el-col :span="5" class="txt-ellipsis" :title="popleView.alias1">{{popleView.causeInflow}}</el-col>
            <el-col class="column-title" :span="3">办证类型</el-col>
            <el-col :span="5" class="txt-ellipsis" :title="popleView.alias2">{{popleView.certificateType}}</el-col>
            <el-col class="column-title" :span="3">证件号码</el-col>
            <el-col :span="5" class="txt-ellipsis" :title="popleView.alias3">{{popleView.idNumber}}</el-col>
        </el-row>
        <el-row type="flex" justify="start">
            <el-col class="column-title" :span="3">登记日期</el-col>
            <el-col :span="5" class="txt-ellipsis" :title="popleView.alias4">{{popleView.registrationDate}}</el-col>
            <el-col class="column-title" :span="3">证件到期日期</el-col>
            <el-col :span="5" class="txt-ellipsis" :title="popleView.alias5">{{popleView.arrivalDate}}</el-col>
            <el-col class="column-title" :span="3">住所类型</el-col>
            <el-col :span="5" class="txt-ellipsis" :title="popleView.alias6">{{popleView.residenceType}}</el-col>
        </el-row>
    </div>
</template>
        <el-dialog title="重点人员信息" :visible.sync="dialogVisible" width="80%" top="5vh" append-to-body>
            <!-- <div style="height:660px;">
                <happy-scroll color="rgba(51,51,51,0.2)" v-if="dialogVisible" hide-horizontal resize size="8">
                    <div style="padding-right:20px;"> -->
            <vKeyPopleView ref="vKeyPopleView" :mapname="popleBasicMap" :popleBasicView="popleView"></vKeyPopleView>
            <!-- </div>
                </happy-scroll>
            </div> -->
        </el-dialog>
    </div>
</template>

<script>
    import vKeyPopleView from "./keyPopleView.vue";
    import {
        HappyScroll
    } from "vue-happy-scroll";
    import service from "./pople_service.js";
    export default {
        components: {
            vKeyPopleView,
            HappyScroll
        },
        props: {
            popleView: {
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
                    serviceARea: "", // 服务处所
                    domicile: "", // 户籍地
                    domicileaddress: "", // 户籍门(楼)地址
                    nowlive: "", // 现住地
                    nowliveaddress: "", // 现住门(楼)地址
                    hasHouses: "",
                    alias1: "",
                    alias2: "",
                    alias3: "",
                    alias4: "",
                    alias5: "",
                    alias6: "",
                    gridCode: "",
                    type: "",
                    HousesView: []
                }
            },
            // 人口基本信息
            popleType: {
                type: Boolean,
                default: true,
            },
            dialogVisible: {
                type: Boolean,
                default: false,
            },
            // 正确的字段名称
            correctField: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                isKeyPople: false,
                gridcode: "",
                popleBasicMap: "popleBasicMap",
                //登录权限
                authority: false,
                table_width: 15,
                HousesView: false,
                showHouses: false,
                houses: [],
                houseNum: ""
            };
        },
        watch: {
            popleView(nValue, oValue) {
                this.showHouses = false;
                if (nValue.gridCode == "000000000000000") {
                    this.isKeyPople = false;
                } else if (nValue.gridCode) {
                    this.isKeyPople = true;
                }
                debugger
                let that=this;
                console.log(service)
                service.service.getRoomInfo({
                    cardNumber: nValue.cardNumber,
                    successFunc: data => {
                        if (data.code == 200) {
                            nValue.hasHouses = data.data
                             if (nValue.hasHouses.length > 0) {
                    this.HousesView = true;
                    this.houseNum = nValue.hasHouses.length
                    this.houses = nValue.hasHouses;
                } else {
                    this.HousesView = false
                }
                        }
                    }
                })
               
            },
        },
        mounted() {
            if (this.popleView.gridCode == "000000000000000") {
                this.isKeyPople = false;
            } else if (this.popleView.gridCode) {
                this.isKeyPople = true;
            };
            if (this.popleView.hasHouses.length > 0) {
                this.HousesView = true;
                this.houseNum = this.popleView.hasHouses.length
                this.houses = this.popleView.hasHouses;
            } else {
                this.HousesView = false
            }
        },
        created() {
            //判断人员权限
            let userInfo = lscache.get("pmsTwo")
            let userInfoId = _.findKey(userInfo, {
                'id': 4084
            })
            if (userInfoId != undefined && userInfoId != null) {
                this.authority = true;
                this.table_width = 9;
            }
        },
        methods: {
            // 打开重点关注人员弹框
            handleShowKeyPople() {
                this.dialogVisible = true;
            },
            handleShowHouses() {
                this.showHouses = true
            }
        }
    };
</script>