<template>
  <div class="people_border">
    <div class="query">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-select v-model="housetype" placeholder="房屋类型" clearable @change="handleHouseType">
            <el-option style="height:30px;"
              v-for="item in houseAutocomplete"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-select v-model="sort" placeholder="排序类型" clearable @change="handleSortType">
            <el-option style="height:30px;"
              v-for="item in ascAutocomplete"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div class="result">
      <happy-scroll ref="vHappyScroll" color="rgba(51,51,51,0.2)" hide-horizontal resize size="8">
        <div>
          <el-row v-for="(item,index) in data" class='item_content' :key="index" justify="space-around" type="flex">
            <el-col>
              <div class="pin" @click="itemClick(item)">
                <img :src="smallSvg" :data-fold="index">
                <div class="pin_num" v-bind:class="markerResize(index)">{{index+1}}</div>
              </div>
              <div class="result_content" @click="itemClick(item)">
                <div class="content_flex" >
                  <div>{{item.communityName}}</div>
                  <div>{{item.housesName}}</div>
                  <!-- <div v-for="(subitem,subindex) in item.list" :key="subindex">{{subitem.value}}</div> -->
                </div>
              </div>
              <div class="result_image" @click="handleMediaPreview(item)">
                <el-tooltip class="item" effect="dark" content="点击查看大图" placement="right">
                  <img :src="item.fileId != undefined ? (photo + item.fileId.split(';')[0]) : smallImg">
                </el-tooltip>
                <div class="title">
                  环境照片
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </happy-scroll>
    </div>
     <el-pagination
      background
      small
      :page-size="10"
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total="total"
      class="pagination">
    </el-pagination>
  </div>
</template>

<script>
import { PeopleService } from "../../services/people.service";
import { VistualEmit } from "../../vistual.emit";
import { Mixin } from "../mixin";
import * as _ from "lodash";
import { housedata } from "./housedata";
import { ascdata } from "./ascdata";
import { sampledata } from "./sampledata";
import { ReplaySubject } from "rxjs/ReplaySubject";
let smallImg = require("./small.png");
let smallSvg = require("./point.svg");
export default {
  name: "peopleComponent",
  props: {
    type: "",
    keyword: "",
    region: "",
    code: ""
  },
  mounted() {
    this.getPeopleList();
    let that = this;
    ElementResizeEvent(this.$el.querySelector(".result"), function() {
      that.$refs["vHappyScroll"].setContainerSize();
      that.$refs["vHappyScroll"].getPercentage();
      that.$refs["vHappyScroll"].initBrowserSize();
    });
  },
  beforeDestroy() {
    this.$parent.removeMarker();
  },
  data() {
    return {
      houseAutocomplete: housedata,
      ascAutocomplete: ascdata,
      data: [],
      // 类别
      _type: null,
      housetype: null,
      // 排序
      sort: "asc",
      // 房屋类型
      htype: "",
      // 总记录数
      total: 0,
      page: 1,
      pageSize: 10,
      // 默认小图
      smallImg: smallImg,
      smallSvg: smallSvg,
      photo: constants.READ_FILE_URL + "/"
    };
  },
  watch: {
    housetype(nValue, oValue) {},
    sort(nValue, oValue) {},
    region(nVal, oVal) {
      this.getPeopleList();
    }
  },
  methods: {
    /** 办学类型选择 */
    handleSchoolType(val) {
      this.schoolType = val;
      this.getSchoolList();
    },
    /** 房屋类型改变 */
    handleHouseType(val) {
      if (val === "平房") this.htype = "1";
      else if (val === "楼房") this.htype = "0";
      else this.htype = "";
      this.getPeopleList();
    },
    /** 排序改变 */
    handleSortType(val) {
      this.sort = val;
      this.getPeopleList();
    },
    handleCurrentChange(evl) {
      this.page = evl;
      this.getPeopleList();
    },
    /** 查询学校列表 */
    getPeopleList() {
      this.parentComponent = this.$parent.$parent;
      let self = this;
      PeopleService.getGridPageByType(
        this.type,
        this.region,
        this.htype,
        data => {
          self.data = data.data.list || [];
          self.total = data.data.totalCount;
          self.$parent.removeMarker();
          self.addMarker();
          // 设置控件显示文本
          self.parentComponent.setMessage(
            self.parentComponent.MESSAGE.RESULT_LIST_MESSAGE,
            self.type,
            self.total
          );
        },
        this.page,
        this.pageSize,
        this.sort,
        "housesName"
      );
    },
    // 列表点击事件
    itemClick(item) {
      this.$parent.$parent.animate();
      /**
       * 2018-4-12
       * 新增民房判定
       * 如若是民房数据
       */
      if (item.gridCode.substr(15, 1) === "0") {
        VistualEmit.emit("change", {
          keyword: item.communityName,
          type: this.type,
          id: item.id,
          code: item.gridCode
        });
      } else {
        VistualEmit.emit("change", {
          keyword: item.communityName,
          type: this.type,
          id: "",
          code: item.gridCode
        });
      }
    },

    /** 查看图片 */
    handleMediaPreview(val) {
      let photo = [];
      if (val.fileId) {
        _.map(val.fileId.split(";"), item => {
          photo.push(constants.READ_FILE_URL + "/" + item);
        });
      } else {
        photo.push(constants.SERVER_URL + "/static/img/small.02f6bf3.png");
      }
      this.$root.$children[0].$refs["vGallery"].fileUrls = photo;
      this.$root.$children[0].$refs["vGallery"].index = 0;
      this.$root.$children[0].$refs["vGallery"].visible = true;
    },

    /**
     * 2018-5-4日修改
     * 增加民房片区定位
     */
    addMarker() {
      if (this.data[0].latitude && this.data[0].longitude) {
        let pts = [];
        _.map(this.data, value => {
          pts.push([value.longitude, value.latitude]);
        });
        this.$parent.addMarkerByPoints(pts);
      } else {
        // 地图上渲染点
        // 将结果的grid_code以数组的方式传过去
        let ids = _.map(this.data, value => {
          return value.gridCode;
        });
        this.$parent.addMarker(ids, "人房");
      }
    },

    markerResize(index) {
      let bool = index === 9;
      return {
        "pin——resize": bool
      };
    }
  }
};
</script>

<style lang="sass">
@import "./people.component.scss";
</style>
