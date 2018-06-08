<template>
  <div class="party_work_border">
    <div class="query">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-select v-model="partyWorkType" placeholder="党组织类型" clearable @change="handlePartyWorkType">
            <el-option style="height:30px;"
              v-for="item in partyWorkTypeList"
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
          <el-row v-for="(item,index) in partyWorkListData" class='item_content' :key="index" justify="space-around" type="flex">
            <el-col>
              <div class="pin" @click="itemClick(item)">
                <img :src="smallSvg" :data-fold="index">
                <div class="pin_num">{{index+1}}</div>
              </div>
              <div class="result_content" @click="itemClick(item)">
                <div class="content_flex" >
                  <div>{{item.organizationName}}</div>
                  <div>辖区：{{item.areaCoverage}}</div>
                  <div>党员人数：{{item.partyStaff}}人</div>
                </div>
              </div>
              <div class="result_image" @click="handleMediaPreview(item)">
                <el-tooltip class="item" effect="dark" content="点击查看大图" placement="right">
                  <img :src="item.imgurl != undefined ? (photo + item.imgurl.split(';')[0]) : smallImg">
                </el-tooltip>
                <div class="title">
                  环境照片
                </div>
              </div>
            </el-col>
          </el-row>
          <div v-if="partyWorkListData.length === 0" style="text-align: center;">暂无数据</div>
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
import { PartyWorkService } from "../../services/party_work.service";
import { VistualEmit } from "../../vistual.emit";
import { Mixin } from "../mixin";
import { ascdata } from "./ascdata";
import commonAjax from "../../../../../assets/scripts/common/commonAjax";
let smallImg = require("./images/small.png");
let smallSvg = require("./images/point.svg");
export default {
  name: "partyWorkComponent",
  props: {
    type: "",
    keyword: "",
    region: "",
    code: ""
  },
  data() {
    return {
      ascAutocomplete: ascdata,
      partyWorkListData: [],
      /** 工商类型列表 */
      partyWorkTypeList: [],
      partyWorkType: "",
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
    /** 商业类型 */
    this.partyWorkListData = [];
    if (lscache.get("OrgCategory") && lscache.get("OrgCategory").length != 0) {
      this.partyWorkTypeList = lscache.get("OrgCategory");
    } else {
      commonAjax.getDict({
        data: { typeIds: constants.DICT_TYPE.PARTYWORKTYPE.toString() },
        successFunc: data => {
          //商业类型
          lscache.set(
            "OrgCategory",
            _.map(data.data["党组织类型"], item => {
              return { label: item.dataName, value: item.dataCode };
            }),constants.SESSION_LIMIT
          );
          this.partyWorkTypeList = lscache.get("OrgCategory");
        }
      });
    }
  },

  beforeDestroy() {
    // 清空点
    this.$parent.removeMarker();
  },

  mounted() {
    this.getPartyWorkList();
    let that = this;
    ElementResizeEvent(this.$el.querySelector(".result"), function() {
      that.$refs["vHappyScroll"].setContainerSize();
      that.$refs["vHappyScroll"].getPercentage();
      that.$refs["vHappyScroll"].initBrowserSize();
    });
  },

  watch: {
    region(nValue, oValue) {
      this.getPartyWorkList();
    }
  },
  methods: {
    handleCurrentChange(evl) {
      this.page = evl;
      this.getPartyWorkList();
    },
    // 列表点击事件
    itemClick(item) {
      this.$parent.$parent.animate();
      VistualEmit.emit("change", {
        keyword: item.organizationName.trim(),
        type: this.type,
        id: item.id,
        code: item.gridCode
      });
    },

    /** 商业类型选择 */
    handlePartyWorkType(val) {
      this.PartyWorkType = val;
      this.getPartyWorkList();
    },

    /** 排序改变 */
    handleSortType(val) {
      this.sort = val;
      this.getPartyWorkList();
    },

    /** 查询工商列表 */
    getPartyWorkList() {
      this.parentComponent = this.$parent.$parent;
      let self = this;
      PartyWorkService.getPartyWorkList(
        this.region,
        this.type,
        this.partyWorkType,
        data => {
          self.partyWorkListData = data.data.list || [];
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
        "partyStaff"
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
      let ids = _.map(this.partyWorkListData, "gridCode");
      this.$parent.addMarker(ids, "党务");
    }
  }
};
</script>

<style lang="sass">
@import "./partyWork.component.scss";
</style>
