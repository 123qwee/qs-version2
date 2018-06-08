<template>
  <div class="school-page">
      <div class="back" @click="returnBtnClick()">
          <div><img :src="icon_tool_map">&nbsp;&nbsp;点击关闭列表</div>
      </div>
      <div class="school-name">{{schoolInfo.schoolName}}</div>
      <el-row class="school-top">
          <el-col :span="3">经度:</el-col>
          <el-col :span="8">{{schoolInfo.longitude}}</el-col>
          <el-col :span="2">;</el-col>
          <el-col :span="3">纬度:</el-col>
          <el-col :span="8">{{schoolInfo.latitude}}</el-col>
      </el-row>
      <div class="school-group-but">
        <el-button @click="handleSchoolTab" name="学校信息">学校信息</el-button>
        <el-button @click="handleSchoolTab" name="重点人群">重点人群</el-button>
        <el-button @click="handleSchoolTab" name="校园案件">校园案件</el-button>
      </div>
      <hr/>
      <div v-if="schoolHide" class="school-pane">
        <happy-scroll class="school-scroll" v-if="schoolHide" color="rgba(51,51,51,0.2)" hide-horizontal resize size="8">
            <div class="flex">
                <el-row>
                    <el-col :span="8">办学类型：</el-col>
                    <el-col :span="16">{{schoolInfo.schoolType}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">在校人数：</el-col>
                    <el-col :span="16">{{schoolInfo.studentsNumber}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">校长姓名：</el-col>
                    <el-col :span="16">{{schoolInfo.rectorName}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">联系方式：</el-col>
                    <el-col :span="16">{{schoolInfo.rectorContact}}</el-col>
                </el-row>
                <div v-for="(item, index) in schoolInfo.chargeResponsibleName && schoolInfo.chargeResponsibleName.split(',')">
                    <div :class="index === 0 ? 'school-top' : ''">分管安保责任人姓名：{{item}}</div>
                    <div>分管安保责任人电话:{{schoolInfo.chargeResponsibleContact.split(',')[index]}}</div>
                </div>
                <div v-for="(item, index) in schoolInfo.responsibleName && schoolInfo.responsibleName.split(',')">
                    <div :class="index === 0 ? 'school-top' : ''">安保责任人姓名：{{item}}</div>
                    <div>安保责任人电话：{{schoolInfo.responsibleContact.split(',')[index]}}</div>
                </div>
                <div v-for="(item, index) in schoolInfo.securityName && schoolInfo.securityName.split(',')">
                    <div :class="index === 0 ? 'school-top' : ''">治安责任人姓名：{{item}}</div>
                    <div>治安责任人电话：{{schoolInfo.securityContact.split(',')[index]}}</div>
                </div>
                <div class="school-top">安保人数：{{schoolInfo.guardsNumber}}</div>
            </div>
        </happy-scroll>
      </div>

      <div v-else-if="keyPeopleHide" class="school-pane">
        <!-- <div style="display: inline-block;">半径范围：</div>
        <el-select class="range-select" v-model="radiusRange" filterable placeholder="请选择">
            <el-option
            v-for="(item,index) in rangeOptions"
            :key="index"
            :label="item + '米'"
            :value="item">
            </el-option>
        </el-select> -->
        <div class="key-people-scroll">
            <happy-scroll v-if="keyPeopleHide" color="rgba(51,51,51,0.2)" hide-horizontal resize size="8">
                <div class="flex">
                    <el-row v-for="(item, index) in keyPeople" class='item_content' :key="index" justify="space-around" type="flex">
                        <el-col>
                        <div class="pin">
                            <img :src="smallSvg" :data-fold="index">
                            <div class="pin_num">{{index+1}}</div>
                        </div>
                        <div class="result_content">
                            <div class="content_flex">
                                <div class="school-case-name">{{item.name}}</div>
                                <div>{{item.nowliveAddress}}</div>
                            </div>
                        </div>
                        <div class="result_image" @click="handleMediaPreview(item)">
                            <el-tooltip class="item" effect="dark" content="点击查看大图" placement="right">
                                <img :src="item.imgurl != undefined ? (photo + item.imgurl.split(';')[0]) : smallImg">
                            </el-tooltip>
                            <div class="title">个人照片</div>
                        </div>
                        </el-col>
                    </el-row>
                </div>
                <div v-if="keyPeople.length === 0" style="text-align: center;">暂无数据</div>
            </happy-scroll>
        </div>
        <el-pagination
            background
            small
            :page-size="10"
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="allTotal"
            class="pagination">
        </el-pagination>
      </div>
      <div v-else-if="schoolCaseHide" class="school-pane">
        <div class="key-people-scroll">
          <happy-scroll v-if="schoolCaseHide" color="rgba(51,51,51,0.2)" hide-horizontal resize size="8">
            <div class="flex">
                <el-row v-for="(item, index) in schoolCase" class='item_content' :key="index" justify="space-around" type="flex">
                    <el-col>
                        <div class="pin">
                            <img :src="smallSvg" :data-fold="index">
                            <div class="pin_num">{{index+1}}</div>
                        </div>
                        <div class="school-case-content">
                            <div class="content_flex">
                                <div class="school-case-name">{{item.taskNum}}</div>
                                <div>{{item.reportName}}</div>
                                <div>{{item.reportTime}}</div>
                                <div>{{item.addressDesc}}</div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <div v-if="schoolCase.length === 0" style="text-align: center;">暂无数据</div>
            </div>
          </happy-scroll>
        </div>
        <el-pagination
            background
            small
            :page-size="10"
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="allTotal"
            class="pagination">
        </el-pagination>
      </div>
  </div>
</template>

<script>
// 引入Observable对象
import { VistualEmit } from "../../vistual.emit.js";
import commonAjax from "../../../../../assets/scripts/common/commonAjax";
import { SchoolService } from "../../services/school.service";
import { icon_tool_map } from "../../common/image";
export default {
  name: "schoolInfoComponent",
  props: {
    mapname: "",
    type: "",
    keyword: "",
    region: "",
    code: "",
    id: ""
  },
  data() {
    return {
      /** 学校信息 */
      schoolInfo: {},
      icon_tool_map: icon_tool_map,
      /** 总数 */
      allTotal: 0,
      page: 1,
      pageSize: 10,
      /** 重点人群 */
      keyPeople: [],
      /** 校园案件 */
      schoolCase: [],
      schoolHide: false,
      keyPeopleHide: false,
      schoolCaseHide: false,
      smallImg: require("./images/photo.jpg"),
      smallSvg: require("./images/point.svg"),
      photo: constants.READ_FILE_URL + "/",
      /** 当前tab */
      tabsName: "学校信息",
      /** 搜索半径 */
      radiusRange: "",
      rangeOptions: [100, 200, 500, 1000]
    };
  },

  mounted() {
    this.schoolHide = true;
    this.$nextTick(function() {
      document.getElementsByName("学校信息")[0].focus();
    });
    SchoolService.getSchoolInfoById(this.type, this.code, data => {
      this.schoolInfo = data.data.schoolInfo;
      if (!lscache.get("nature") || lscache.get("nature").length == 0) {
        commonAjax.getDict({
          data: { typeIds: constants.DICT_TYPE.SCHOOLTYPE.toString() },
          successFunc: data => {
            //学校类型
            lscache.set(
              "nature",
              _.map(data.data["学校办学类型"], item => {
                return { label: item.dataName, value: item.dataCode };
              }),constants.SESSION_LIMIT
            );
            let schoolType = _.find(lscache.get("nature"), item => {
              return item.value == this.schoolInfo.schoolType;
            });
            this.schoolInfo.schoolType =
              (schoolType && schoolType.label) || "不详";
          }
        });
      } else {
        let schoolType = _.find(lscache.get("nature"), item => {
          return item.value == this.schoolInfo.schoolType;
        });
        this.schoolInfo.schoolType = (schoolType && schoolType.label) || "不详";
      }
      this.addMarker();
    });
  },

  beforeDestroy() {
    this.$parent.removeMarker();
    window[this.mapname].operation.setFullExtent();
  },

  methods: {
    /** tab切换 */
    handleSchoolTab(tab) {
      if (tab.currentTarget.name === "学校信息") {
        this.tabsName = "学校信息";
        this.schoolHide = true;
        this.keyPeopleHide = false;
        this.schoolCaseHide = false;
      } else if (tab.currentTarget.name === "重点人群") {
        this.tabsName = "重点人群";
        SchoolService.getKeyPeopleList(
          _.join(_.dropRight(_.split(_.cloneDeep(this.code), ""), 2), ""),
          "1",
          data => {
            this.allTotal = data.data.totalCount;
            this.keyPeople = data.data.list || [];
            this.schoolHide = false;
            this.keyPeopleHide = true;
            this.schoolCaseHide = false;
          },
          this.page,
          this.pageSize
        );
      } else if (tab.currentTarget.name === "校园案件") {
        this.tabsName = "校园案件";
        this.schoolHide = false;
        this.keyPeopleHide = false;
        this.schoolCaseHide = true;
        SchoolService.getSchoolCase(this.schoolInfo.schoolName, data => {
            this.schoolCase = data.data.list;
        }, this.page, this.pageSize);
      }
    },

    /** 返回列表页面 */
    returnBtnClick() {
      if (this.keyword == "网格") {
        VistualEmit.emit("change", {
          keyword: this.type,
          type: this.keyword,
          id: this.id,
          code: this.region
        });
      } else {
        this.$parent.back();
      }
    },

    /** 分页切换 */
    handleCurrentChange(val) {
      this.page = val;
      if ((this.tabsName = "重点人群")) {
        SchoolService.getKeyPeopleList(
          _.join(_.dropRight(_.split(_.cloneDeep(this.code), ""), 2), ""),
          "1",
          data => {
            this.allTotal = data.data.totalCount;
            this.keyPeople = data.data.list;
            this.schoolHide = false;
            this.keyPeopleHide = true;
            this.schoolCaseHide = false;
          },
          this.page,
          this.pageSize
        );
      } else if ((this.tabsName = "校园案件")) {
          this.page = val;
          SchoolService.getSchoolCase(name, data => {
            this.schoolCase = data.data.list;
        }, this.page, this.pageSize);
      }
    },

    /** 查看图片 */
    handleMediaPreview(val) {
      let photo = [];
      if (val.imgurl) {
        _.map(val.imgurl.split(";"), item => {
          photo.push(constants.READ_FILE_URL + "/" + item);
        });
      } else {
        photo.push(constants.SERVER_URL + "/static/img/photo.37ebfd2.jpg");
      }
      this.$root.$children[0].$refs["vGallery"].fileUrls = photo;
      this.$root.$children[0].$refs["vGallery"].index = 0;
      this.$root.$children[0].$refs["vGallery"].visible = true;
    },

    addMarker() {
      // 将结果的grid_code以数组的方式传过去
      this.$parent.addMarker([this.code], "学校", val => {
        if (val.val.features.length === 0) {
          this.$popup.showNotification({ message: "此学校暂无空间信息!" });
          return;
        }
        window[this.mapname].operation.setCenterAndZoom(
          [
            val.val.features[0].getGeometry().getCoordinates()[0],
            val.val.features[0].getGeometry().getCoordinates()[1]
          ],
          18
        );
      });
    }
  }
};
</script>

<style lang="sass">
  @import "./school.info.component.scss";
</style>
