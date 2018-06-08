<template>
    <div class="pople-info">
        <el-form label-position="left" :model="popleInfoForm" ref="popleInfo" :rules="popleInfoFormRules">
            <el-row type="flex" justify="space-around">
                <el-col :span="8">
                    <el-form-item prop="name" label="姓名" label-width="120px">
                        <el-input v-model="popleInfoForm.name" :maxlength="16" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="usedName" label="曾用名" label-width="140px">
                        <el-input v-model="popleInfoForm.usedName" :maxlength="16" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="cardNumber" label="身份证号" label-width="120px">
                        <el-input v-model="popleInfoForm.cardNumber" :minlength="15" :maxlength="18" :disabled="cardNumberEdit" placeholder="请输入内容"
                            @blur="handleJudgeCardNumber"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-around">
                <el-col :span="8">
                    <el-form-item prop="sex" label="性别" label-width="120px">
                        <el-radio-group v-model="popleInfoForm.sex">
                            <el-radio label="1">男</el-radio>
                            <el-radio label="2">女</el-radio>
                            <el-radio label="0">未知性别</el-radio>
                            <el-radio label="9">未说明</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="birth" label="出生日期" label-width="140px">
                        <el-input v-model="popleInfoForm.birth" :disabled="true" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="appearance" label="政治面貌" label-width="120px">
                        <el-select v-model="popleInfoForm.appearance" placeholder="请选择" clearable filterable style="width:100%;">
                            <el-option v-for="(item,index) in appearanceList" v-bind:label="item.label" v-bind:value="item.value" :key="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-around">
                <el-col :span="8">
                    <el-form-item prop="nation" label="民族" label-width="120px">
                        <el-select v-model="popleInfoForm.nation" placeholder="请选择" clearable filterable style="width:100%;">
                            <el-option v-for="(item,index) in nationList" v-bind:label="item.label" v-bind:value="item.value" :key="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="nativePlace" label="籍贯" label-width="140px">
                        <el-select v-model="popleInfoForm.nativePlace" placeholder="请选择" clearable filterable style="width:100%;">
                            <el-option v-for="(item,index) in nativeplaceList" v-bind:label="item.label" v-bind:value="item.value" :key="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="maritalStatus" label="婚姻状况" label-width="120px">
                        <el-select v-model="popleInfoForm.maritalStatus" placeholder="请选择" clearable filterable style="width:100%;">
                            <el-option v-for="(item,index) in maritalStatusList" v-bind:label="item.label" v-bind:value="item.value" :key="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-around">
                <el-col :span="8">
                    <el-form-item prop="educational" label="学历" label-width="120px">
                        <el-select v-model="popleInfoForm.educational" placeholder="请选择" clearable filterable style="width:100%;">
                            <el-option v-for="(item,index) in educationalList" v-bind:label="item.label" v-bind:value="item.value" :key="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="religiousBeliefs" label="宗教信仰" label-width="140px">
                        <el-select v-model="popleInfoForm.religiousBeliefs" placeholder="请选择" clearable filterable style="width:100%;">
                            <el-option v-for="(item,index) in religiousbeliefsList" v-bind:label="item.label" v-bind:value="item.value" :key="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="contact" label="联系方式" label-width="120px">
                        <el-input v-model="popleInfoForm.contact" :maxlength="12" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-around" style="margin-top:24px;">
                <el-col :span="8">
                    <el-form-item prop="occupationCategory" label="职业类别" label-width="120px">
                        <el-select v-model="popleInfoForm.occupationCategory" placeholder="请选择" clearable filterable style="width:100%;">
                            <el-option v-for="(item,index) in occupationTypeList" v-bind:label="item.label" v-bind:value="item.value" :key="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="occupation" label="职业" label-width="140px">
                        <el-input v-model="popleInfoForm.occupation" :maxlength="10" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="serviceARea" label="服务处所" label-width="120px">
                        <el-input v-model="popleInfoForm.serviceARea" :maxlength="32" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-around">
                <el-col :span="8">
                    <el-form-item prop="domicile" label="户籍地" label-width="120px">
                        <el-cascader :disabled="true" :options="regionList" v-model="popleInfoForm.domicile" placeholder="请选择" clearable filterable
                            style="width:100%;"></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-col :span="14">
                        <el-form-item prop="domicileAddress" label="户籍门(楼)地址" label-width="140px">
                            <el-cascader @change="domicileChange" :options="regionList" v-model="popleInfoForm.domicileAddress" placeholder="请选择" clearable
                                filterable style="width:100%;"></el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item prop="domicAddress">
                            <el-input v-model="popleInfoForm.domicAddress" :maxlength="10" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-around">
                <el-col :span="8">
                    <el-form-item prop="nowlive" label="现住地" label-width="120px">
                        <el-cascader :options="regionList" :disabled="true" v-model="popleInfoForm.nowlive" placeholder="请选择" style="width:100%;"></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-col :span="nowAddressSpanWidth">
                        <el-form-item prop="nowliveAddress" label="现住门(楼)地址" label-width="140px">
                            <el-cascader @change="handleNowLiveChange" :options="regionList" v-model="popleInfoForm.nowliveAddress" placeholder="请选择"
                                style="width:100%;"></el-cascader>
                        </el-form-item>
                    </el-col>
                    <template v-if="gridOptionDisplay">
                        <el-col :span="7">
                            <el-form-item prop="gridCodeData">
                                <el-cascader :options="regionGridList" @change="handleGridChange" v-model="popleInfoForm.gridCodeData" clearable placeholder="请选择"
                                    style="width:100%;"></el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="doorplate">
                                <el-cascader :options="doorplateList" v-model="popleInfoForm.doorplate" placeholder="请选择" clearable style="width:100%;"></el-cascader>
                            </el-form-item>
                        </el-col>
                    </template>
                </el-col>
            </el-row>
            <el-row type="flex" justify="start">
                <el-col :span="8">
                    <el-form-item prop="type" label="是否流动人口" label-width="120px">
                        <el-radio-group v-model="popleInfoForm.type" @change="handlePopleType">
                            <el-radio label="0">是</el-radio>
                            <el-radio label="1">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    import validateOper from "@/assets/scripts/common/validateOper.js";
    import commonAjax from "@/assets/scripts/common/commonAjax.js";
    import service from "./pople_service.js";
    var popleInfoForm = {
        id: "",
        name: "", // 姓名
        cardNumber: "", // 身份证号
        usedname: "", // 曾用名
        sex: "", // 性别
        birth: "", // 出生日期
        appearance: "", // 政治面貌
        nation: "", // 民族
        nativePlace: "", // 籍贯
        maritalStatus: "", // 婚姻状况
        educational: "", // 学历
        religiousBeliefs: "", // 宗教信仰
        contact: "", // 联系方式
        occupationCategory: "", // 职业类别
        occupation: "", // 职业
        serviceARea: "", // 服务处所
        domicile: [], // 户籍地
        domicileAddress: [], // 户籍门(楼)地址
        nowlive: [], // 现住地
        nowliveAddress: [], // 现住门(楼)地址
        type: "1", // 是否流动人口(默认户籍人口)

        domicAddress: "", // 户籍详址
        gridCodeData: [], // 网格
        doorplate: [], // 门牌

        gridCodeEdit: "", // 编辑时使用，存储接口返回值
    };

    export default {
        data() {
            return {
                popleInfoForm: _.cloneDeep(popleInfoForm), // 人员信息表单
                // 人员信息验证
                popleInfoFormRules: {
                    name: [
                        validateOper.valiRequired("请输入姓名！"),
                        validateOper.valiMaxLength(32)
                    ],
                    cardNumber: [
                        validateOper.valiRequired("请输入身份证号！"),
                        validateOper.valiRegular()
                    ],
                    sex: [{ required: true, message: "请选择性别!", trigger: "change" }],
                    nation: [{ required: true, message: "请选择民族!", trigger: "change" }],
                    maritalStatus: [
                        { required: true, message: "请选择婚姻状况!", trigger: "change" }
                    ],
                    nativePlace: [{ required: true, message: "请选择籍贯!", trigger: "change" }],
                    appearance: [
                        { required: true, message: "请选择政治面貌!", trigger: "change" }
                    ],
                    educational: [{ required: true, message: "请选择学历!", trigger: "change" }],
                    contact: [
                    //     validateOper.valiRequired("请输入手机号！"),
                        validateOper.valiTellPhone()
                    ],
                    occupationCategory: [
                        { required: true, message: "请选择职业类别!", trigger: "change" }
                    ],
                    occupation: [
                        validateOper.valiRequired("请输入职业！"),
                        validateOper.valiMaxLength(20)
                    ],
                    domicileAddress: [
                        { required: true, message: "请选择户籍门(楼)地址!", trigger: "change" }
                    ],
                    nowliveAddress: [
                        { required: true, message: "请选择现住地(楼)地址!", trigger: "change" }
                    ],
                    gridCodeData: [{ required: true, message: "请选择网格!", trigger: "change" }],
                    doorplate: [{ required: true, message: "请选择门牌号!", trigger: "change" }],
                    type: [{ required: true, message: "请选择是否流动人口", trigger: "change" }]
                },
                isCardNumber: "", // 判断是户籍人口还是流动人口
                cardNumberEdit: false, // 身份证号是否可编辑
                gridOptionDisplay: true, // 网格门牌是否选择
                nowAddressSpanWidth: 9, // 现住址el-col宽度
                // 户籍地
                domicileList: [],
                // 政治面貌
                appearanceList: [],
                // 民族
                nationList: [],
                // 籍贯
                nativeplaceList: [],
                // 婚姻状况
                maritalStatusList: [],
                // 现住址
                regionList: [],
                // 学历
                educationalList: [],
                // 宗教信仰
                religiousbeliefsList: [],
                // 网格信息（镇，小区，网格）
                regionGridList: [],
                // 职业类型列表
                occupationTypeList: [],
                // 门牌号
                doorplateList: [],
                isCardNumberReport: false,
            };
        },

        created() {
            // 政治面貌
            this.appearanceList = lscache.get("appearance");
            // 民族
            this.nationList = lscache.get("nation");
            // 婚姻状况
            this.maritalStatusList = lscache.get("maritalStatus");
            // 学历
            this.educationalList = lscache.get("educational");
            // 宗教信仰
            this.religiousbeliefsList = lscache.get("religiousbeliefs");
            // 籍贯
            this.nativeplaceList = lscache.get("province");
            // 行政区域
            this.regionList = lscache.get("regionLinkage");
            // 网格信息（镇，小区，网格）
            this.regionGridList = lscache.get("regionGrid");
            // 职业类型列表
            this.occupationTypeList = lscache.get("occupation");
            // 默认现住址为沁水县
            this.popleInfoForm.nowlive = [140000, 140500, 140521];
            this.popleInfoForm.nowliveAddress = [140000, 140500, 140521];

            this.$bus.$emit("transferPopleType", "1");
        },
        mounted() {
        },
        methods: {
            // 验证身份证号并取出生日
            handleJudgeCardNumber(event) {
                let cardNumber = this.popleInfoForm.cardNumber;
                let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
                if (cardNumber.search(reg) != -1) {
                    this.handleCardNumberRepeat(cardNumber);
                }
            },
            // 判断身份证号是否已经添加
            handleCardNumberRepeat(cardNumber) {
                let that = this;
                service.service.cardNumberReport({
                    data: {
                        cardNumber: cardNumber,
                    },
                    successFunc: data => {
                        if (data.code == 200) {
                            that.isCardNumberReport = false;
                            that.$popup.showSuccessNoti({ message: "该人员可以添加" });
                            // 生日
                            that.popleInfoForm.birth =
                                that.popleInfoForm.cardNumber.slice(6, 10) +
                                "-" +
                                that.popleInfoForm.cardNumber.slice(10, 12) +
                                "-" +
                                that.popleInfoForm.cardNumber.slice(12, 14);
                            // 性别判定
                            if (that.popleInfoForm.cardNumber.slice(-2, -1) % 2 == 0) {
                                // 女性
                                that.popleInfoForm.sex = "2";
                            } else if (that.popleInfoForm.cardNumber.slice(-2, -1) % 2 == 1) {
                                // 男性
                                that.popleInfoForm.sex = "1";
                            };
                            // 根据生日默认数据
                            if (new Date().getFullYear() - that.popleInfoForm.cardNumber.slice(6, 10) <= 5) {
                                // 该人员还是孩子，默认填写 政治面貌（群众）学历（其它）婚姻状况（未婚）职业类别（其它） 职业（无）
                                that.popleInfoForm.appearance = _.find(lscache.get("appearance"), { label: "群众" }).value;  // 政治面貌（群众）
                                that.popleInfoForm.educational = _.find(lscache.get("educational"), { label: "其它" }).value;  // 学历（其它）
                                that.popleInfoForm.maritalStatus = _.find(lscache.get("maritalStatus"), { label: "未婚" }).value;  // 婚姻状况（未婚）
                                that.popleInfoForm.occupationCategory = _.find(lscache.get("occupation"), { label: "其他" }).value;  // 职业类别（其它）
                                that.popleInfoForm.occupation = "无";  // 职业（无）
                            }
                        } else {
                            that.isCardNumberReport = true;
                            that.$popup.showModalAlert({ type: "warning", message: "该人员已添加,不可重复添加" });
                        }
                    }
                });
            },
            // 人口类型
            handlePopleType() {
                if (this.popleInfoForm.type == "0") {
                    this.$bus.$emit("transferPopleType", "0");
                } else if (this.popleInfoForm.type == "1") {
                    this.$bus.$emit("transferPopleType", "1");
                }
            },
            // 现住址区域改变
            handleNowLiveChange() {
                this.popleInfoForm.nowlive = this.popleInfoForm.nowliveAddress;
                // 户籍人口
                if (this.popleInfoForm.nowlive[2] == "140521") {
                    this.gridOptionDisplay = true;
                    this.nowAddressSpanWidth = 9;

                    this.popleInfoForm.type = "1";
                    this.$bus.$emit("transferPopleType", "1");
                } else {
                    // 流动人口
                    this.gridOptionDisplay = false;
                    this.nowAddressSpanWidth = 24;

                    this.popleInfoForm.type = "0";
                    this.$bus.$emit("transferPopleType", "0");
                }
            },
            // 户籍地选择
            domicileChange(val) {
                this.popleInfoForm.domicile = this.popleInfoForm.domicileAddress;
            },
            // 门牌号获取
            getDoorplate(code) {
                let that = this;
                commonAjax.getDoorplate({
                    code: code,
                    successFunc: data => {
                        if (data.code == 200 && data.data) {
                            that.doorplateList = data.data;
                        } else {
                            that.doorplateList = [];
                        }
                    }
                });
            },
            // 网格改变
            handleGridChange(val) {
                if (val.length == 3) {
                    this.getDoorplate(val[2]);
                }
            }
        }
    };
</script>
<style>
    @import url("./../bussiness/styles/step.css");
    .line-height-50 {
        line-height: 50px;
    }

    .pople-info .el-dialog__footer {
        text-align: center;
    }

    .pople-info .el-col {
        padding-bottom: 12px;
    }

    .pople-info .el-form--label-left .el-form-item__label {
        text-align: right;
    }
</style>