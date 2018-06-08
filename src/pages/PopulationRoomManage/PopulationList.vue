<template>
    <div class="tab-list-height population-inquiry">
        <div style="padding-bottom:15px;">
            <el-row type="flex" justify="space-around">
                <el-col :span="6">
                    <span class="txt-right float-left line-hei-32 width-82">区域：</span>
                    <el-cascader :options="regionList" v-model="searchFieldBase.region" clearable size="small" placeholder="请选择" @change="handleQuery"></el-cascader>
                </el-col>
                <el-col :span="6">
                    <span class="txt-right float-left line-hei-32 width-82">姓名：</span>
                    <el-input v-model="searchFieldBase.name" placeholder="请输入姓名" @blur="handleQuery" size="small"></el-input>
                </el-col>
                <el-col :span="6">
                    <span class="txt-right float-left line-hei-32 width-82">性别：</span>
                    <el-select v-model="searchFieldBase.sex" placeholder="请选择" clearable filterable size="small" @change="handleQuery">
                        <el-option v-for="(item,index) in sexList" v-bind:label="item.label" v-bind:value="item.value" :key="index">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="6" class="txt-right" style="padding-right:12px">
                    <el-button type="primary" size="small">清空</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="content-list" :class="{actCollapse:isActCollapse}">
            <div class="mainbar-title">
                <i class="md-icon material-icons">&#xE8FE;</i>
                <span>结果列表</span>
                <div class="mainbar-title-rightBtn">
                    <el-button-group style="float:right;">
                        <span style="cursor: pointer;font-size: 15px;">
                            <i class="el-icon-circle-plus-outline"></i>新增
                        </span>
                        <span style="cursor: pointer;font-size: 15px;">
                            <i class="el-icon-download"></i>导出
                        </span>
                    </el-button-group>
                </div>

            </div>
            <div class="table-list">
                <el-table :data="tableData" border height="100%" style="height:100%;">
                    <el-table-column type="index" label="编号" width="60"></el-table-column>
                    <el-table-column prop="nowliveAddress" label="所属小区" show-overflow-tooltip sortable></el-table-column>
                    <el-table-column prop="name" label="姓名" show-overflow-tooltip sortable></el-table-column>
                    <el-table-column prop="sex" label="性别" show-overflow-tooltip sortable></el-table-column>
                    <el-table-column prop="birth" label="出生日期" width="140" show-overflow-tooltip sortable></el-table-column>
                    <el-table-column prop="educational" label="学历" show-overflow-tooltip sortable></el-table-column>
                    <el-table-column prop="cardNumber" label="证件号码" width="180" show-overflow-tooltip sortable></el-table-column>
                    <el-table-column prop="nation" label="民族" show-overflow-tooltip sortable></el-table-column>
                    <el-table-column prop="maritalStatus" label="婚姻状况" width="140" show-overflow-tooltip sortable></el-table-column>
                    <el-table-column label="人口类型" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span v-if="scope.row.type == 1">户籍人口</span>
                            <span v-else>流动人口</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="属性" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <img v-if="scope.row.appearance == '中共党员'" style="padding-right: 15px;" :src="party" />
                            <img v-if="scope.row.gridCode && scope.row.gridCode  != '000000000000000' && authority" :src="keyPople" />
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="160">
                        <template slot-scope="scope">
                            <el-button type="success" size="small" @click="handleDlgInfoView(scope.$index, scope.row)">查看</el-button>
                            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="main-page">
                <el-pagination ref="pager" @current-change="handleQuery" @size-change="handleQuery" :page-sizes="[10, 20, 30, 40, 50, 100,1000]"
                    layout="total,sizes, prev, pager, next, jumper" :total="recordCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>      
    import MixList from '@/components/mixins/MixList.js';
    import service from "./people_room_service.js";
    import { mapActions } from 'vuex';
    var searchField = {
        region: [],
        name: "",
        sex: "",
        nation: "", // 民族
        educational: "", // 学历
        maritalStatus: "", // 婚姻状况
        sage: "",
        eage: "",
        credType: "", // 证件类型
        cardNumber: "", // 身份证号
        appearance: "", // 政治面貌
        popleType: "", // 人口类型
        checkbox: [] // 重点人群-宗教信仰-户主
    };
    // 人口列表基础查询
    var searchFieldBase = {
        region: [],
        name: "",
        sex: ""
    };
    export default {
        mixins: [MixList],
        data() {
            return {
                searchFieldBase: _.clone(searchFieldBase),
                party: require("@/assets/images/pople/party.png"),
                keyPople: require("@/assets/images/pople/keyPople.png"),
                tableData: [],
                // 区域列表
                regionList: [],
                isActCollapse: false, // 高级查询是否展开
                // 性别列表
                sexList: [{
                    label: "男",
                    value: "1"
                }, {
                    label: "女",
                    value: "2"
                }, {
                    label: "未知性别",
                    value: "0"
                }, {
                    label: "未说明",
                    value: "9"
                }],
                // 列表结果记录数
                recordCount: 0,
            };
        },

        created() {
            this.getPopulationTypeData();
            this.handleQuery();
        },

        mounted() { },
        methods: {
            ...mapActions('populationInfo',[
                'getPopulationTypeData'
            ]),
            handleQuery() {
                let that = this,
                    page,
                    pageSize;
                if (this.$refs["pager"] == undefined) {
                    page = 1;
                    pageSize = 10;
                } else {
                    page = this.$refs["pager"].internalCurrentPage;
                    pageSize = this.$refs["pager"].internalPageSize;
                }
                this.$popup.showLoading();
                service.commonAjax.queryList({
                    data: {
                        page: page,
                        pageSize: pageSize,
                        orderBy: "name",
                        order: "desc",
                        areaCode: that.searchFieldBase.region[2] ? that.searchFieldBase.region[2] : undefined,
                        name: that.searchFieldBase.name ? that.searchFieldBase.name : undefined,
                        sex: that.searchFieldBase.sex ? that.searchFieldBase.sex : undefined,
                    },
                    URL: "/manage/view/population/findPage",
                    successFunc: data => {
                        if (data.code == 200) {
                            that.tableData = data.data.list;
                            that.recordCount = data.data.totalCount;
                            that.$popup.closeLoading();
                        }
                    }
                });
            }
        }
    };
</script>
<style>
    /* 表格高度 */

    .population-inquiry .content-list.actCollapse {
        height: calc(100% - 205px);
    }

    /** 折叠面板样式 */

    .population-inquiry .collapse {
        width: 100%;
    }

    .population-inquiry .el-collapse,
    .el-collapse-item__header,
    .el-collapse-item__wrap,
    .population-inquiry .el-collapse {
        border: 0;
    }

    .population-inquiry .el-collapse-item__content {
        padding: 0;
    }

    /* 折叠面板指示箭头 */

    .population-inquiry .el-collapse-item .el-collapse-item__arrow.el-icon-arrow-right {
        float: initial;
        font-weight: bold;
    }

    .population-inquiry .el-collapse-item.is-active .el-collapse-item__arrow.el-icon-arrow-right {
        color: #11a3ff;
    }
</style>