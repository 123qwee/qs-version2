<template>
  <div class="school_border">
    <div class="query">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-select v-model="schoolType" placeholder="办学类型" clearable @change="handleSchoolType">
            <el-option style="height:30px;"
              v-for="item in natureList"
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
          <el-row v-for="(item,index) in schoolListData" class='item_content' :key="index" justify="space-around" type="flex">
            <el-col>
              <div class="pin" @click="itemClick(item)">
                <img :src="smallSvg" :data-fold="index">
                <div class="pin_num">{{index+1}}</div>
              </div>
              <div class="result_content" @click="itemClick(item)">
                <div class="content_flex" >
                  <div>{{item.schoolName}}</div>
                  <div>{{item.schoolAdress}}</div>
                  <div>学生人数：{{item.studentsNumber}}人</div>
                </div>
              </div>
              <div class="result_image" @click="handleMediaPreview(item)">
                <el-tooltip class="item" effect="dark" content="点击查看大图" placement="right">
                  <img :src="item.imgurl != undefined ? (photo + item.imgurl.split(';')[0]) : smallImg" >
                </el-tooltip>
                <div class="title">
                  环境照片
                </div>
              </div>
            </el-col>
          </el-row>
          <div v-if="schoolListData.length === 0" style="text-align: center;">暂无数据</div>
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
import { SchoolService } from "../../services/school.service";
import { VistualEmit } from "../../vistual.emit";
import { Mixin } from "../mixin";
import { ascdata } from "./ascdata";
import commonAjax from "../../../../../assets/scripts/common/commonAjax";
let smallImg = require("./images/small.png");
let smallSvg = require("./images/point.svg");

export default {
  name: "schoolComponent",
  props: {
    type: "",
    keyword: "",
    region: "",
    code: ""
  },
  data() {
    return {
      ascAutocomplete: ascdata,
      schoolListData: [],
      /** 办学类型 */
      natureList: [],
      schoolType: "",
      // 排序
      sort: "",
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
  created() {
    /** 学校办学类型 */
    if (lscache.get("nature") && lscache.get("nature").length != 0) {
      this.natureList = lscache.get("nature");
    } else {
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
          this.natureList = lscache.get("nature");
        }
      });
    }
  },

  beforeDestroy() {
    // 清空点
    this.$parent.removeMarker();
  },

  mounted() {
    this.getSchoolList();
    let that = this;
    ElementResizeEvent(this.$el.querySelector(".result"), function() {
      that.$refs["vHappyScroll"].setContainerSize();
      that.$refs["vHappyScroll"].getPercentage();
      that.$refs["vHappyScroll"].initBrowserSize();
    });
  },

  watch: {
    region(nValue, oValue) {
      this.getSchoolList();
    }
  },
  methods: {
    handleCurrentChange(evl) {
      this.page = evl;
      this.getSchoolList();
    },
    // 列表点击事件
    itemClick(item) {
      this.$parent.$parent.animate();
      VistualEmit.emit("change", {
        keyword: item.schoolName,
        type: this.type,
        id: item.id,
        code: item.gridCode
      });
    },

    /** 办学类型选择 */
    handleSchoolType(val) {
      this.schoolType = val;
      this.getSchoolList();
    },

    /** 排序改变 */
    handleSortType(val) {
      this.sort = val;
      this.getSchoolList();
    },

    /** 查询学校列表 */
    getSchoolList() {
      this.parentComponent = this.$parent.$parent;
      let self = this;
      SchoolService.getSchoolPageByName(
        this.region,
        this.type,
        this.schoolType,
        data => {
          self.schoolListData = data.data.list || [];
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
        "studentsNumber"
      );
    },

    /** 查看图片 */
    handleMediaPreview(val) {
      let photo = [];
      if (val.imgurl) {
        _.map(val.imgurl.split(";"), item => {
          photo.push(constants.READ_FILE_URL + "/" + item);
        });
      } else {
        photo.push(constants.SERVER_URL + "/static/img/small.02f6bf3.png");
      }
      this.$root.$children[0].$refs["vGallery"].fileUrls = photo;
      this.$root.$children[0].$refs["vGallery"].index = 0;
      this.$root.$children[0].$refs["vGallery"].visible = true;
    },

    addMarker() {
      // 地图上渲染点
      // 将结果的grid_code以数组的方式传过去
      let ids = _.map(this.schoolListData, "gridCode");
      this.$parent.addMarker(ids, "学校");
    }
  }
};
</script>

<style lang="sass">
@import "./school.component.scss";
</style>
