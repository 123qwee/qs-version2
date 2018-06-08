<template>
  <div class="people_border people_info_height">
    <happy-scroll resize size="4">
      <div>
        <div class="margin_border">
          <div ref="$changeBorder">
            <div class="back" @click="returnBtnClick()">
              <div>
                <img :src="icon_tool_map">&nbsp;&nbsp;点击关闭列表</div>
            </div>
            <div class="content">
              <el-row type="flex" :gutter="20" justify="space-around">
                <el-col :span="24" class="title">{{houseData.communityName}}</el-col>
              </el-row>
              <el-row type="flex" :gutter="20" justify="space-around">
                <el-col :span="12">经度：{{smx}}</el-col>
                <el-col :span="12">纬度：{{smy}}</el-col>
              </el-row>
              <el-row type="flex" :gutter="20" justify="space-around">
                <el-col :span="12">楼栋名称：{{houseData.housesName}}</el-col>
                <el-col :span="12">单元数：{{houseData.units}}个单元</el-col>
              </el-row>
              <el-row type="flex" :gutter="20" justify="space-around">
                <el-col :span="12">建筑面积：{{houseData.area}}平方米</el-col>
                <el-col :span="12">层数：{{houseData.layers}}层</el-col>
              </el-row>
              <el-row type="flex" :gutter="20" justify="space-around">
                <el-col :span="12" v-if="houseData.buildHouseholds">楼栋户数：{{houseData.buildHouseholds}}户</el-col>
                <el-col :span="12" v-if="!houseData.buildHouseholds">楼栋户数：</el-col>
                <el-col :span="12"></el-col>
              </el-row>
            </div>
            <div class="split_row"></div>
            <div class="danyuan">
              <happy-scroll hide-vertical resize size="4">
                <div class="flex_row">
                  <div class="item" v-for="(item,index) in houseUnits" v-bind:class="{ select: index===unitsIndex }" @click="unitsChange(item,index)">{{item}}</div>
                </div>
              </happy-scroll>
            </div>
            <div class="split_row"></div>
            <div class="lc">
              <div class="rk_type">
                <el-row type="flex" :gutter="20" justify="space-around">
                  <el-col :span="12" class="cz">
                    <img :src="icon_renfang_changzhu">
                    <span>常驻人口</span>
                    <span>({{data.resident}}人)</span>
                  </el-col>
                  <el-col :span="12" class="ld">
                    <img :src="icon_renfang_liudong">
                    <span>流动人口</span>
                    <span>({{data.float}}人)</span>
                  </el-col>
                </el-row>
                <el-row type="flex" :gutter="20" justify="space-around">
                  <el-col :span="12" class="wzr">未住人</el-col>
                  <el-col :span="12"></el-col>
                </el-row>
              </div>
            </div>
            <div class="split_row"></div>
          </div>
          <div class="lc_select" v-if="isContainHouseInfo" :style="{height:elLcHeight+'px'}">
            <div class="lc_number">
              <happy-scroll v-if="hide" :style="{height:elLcHeight+'px'}" color="rgba(51,51,51,0.2)" hide-horizontal resize size="4">
                <div class="scroll">
                  <div v-bind:class="{select:index===layersIndex}" v-for="(item,index) in houseLayers" @click="layersChange(item,index)">{{item}}层</div>
                </div>
              </happy-scroll>
            </div>
            <div class="fw_select">
              <happy-scroll v-if="hide" :style="{height:elLcHeight+'px'}" color="rgba(51,51,51,0.2)" hide-horizontal resize size="4">
                <div class="flex">
                  <div class="house" v-for="(item,index) in houseRooms" :key="index" @click="handlePopleView(item.roomCode,index)">
                    <div>{{item.roomCode}}</div>
                    <div>
                      <img :src="getIcon(item.roomType)">
                    </div>
                    <div>{{item.checkInCount}}人</div>
                  </div>
                </div>
              </happy-scroll>
            </div>
          </div>
        </div>
        <MapPopleView ref="MapPopleView"></MapPopleView>
      </div>
    </happy-scroll>
  </div>
</template>

<script>
// 引入Observable对象
import { VistualEmit } from "../../vistual.emit.js";
import { houseLoucengData } from "./housedata";
import { numberConvert } from "../../common/number.convert";
import {
  icon_renfang_liudong,
  icon_renfang_changzhu,
  icon_renfang_weizhu,
  icon_tool_map
} from "../../common/image";
import MapPopleView from "./pople.info.view.vue";
import { PeopleService } from "../../services/people.service";
export default {
  name: "peopleInfoComponent",
  components: { MapPopleView }, //在组件内注册
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
      // 元素高度
      elHeight: 0,
      elChangeHeight: 370,
      elLcHeight: 0,
      // 动态变换高度的组件
      changeBorder: null,
      icon_renfang_liudong: icon_renfang_liudong,
      icon_renfang_changzhu: icon_renfang_changzhu,
      icon_renfang_weizhu: icon_renfang_weizhu,
      icon_tool_map: icon_tool_map,
      hide: false,
      // 房屋信息
      houseData: {},
      // 房屋单元
      houseUnits: [],
      // 房屋楼层
      houseLayers: [],
      houseRooms: [],
      data: {},
      unitsIndex: 0,
      layersIndex: 0,
      // 是否包含房屋楼层数据
      isContainHouseInfo: true,
      smx: "暂无",
      smy: "暂无"
    };
  },
  /**
   * 组件加载完成后
   */
  mounted() {
    this.parentComponent = this.$parent.$parent;
    // 设置控件显示文本
    this.parentComponent.setMessage(
      this.parentComponent.MESSAGE.RESULT_INFO_MESSAGE
    );
    // 获得当前组件高度
    this.elHeight = this.$el.clientHeight;
    this.changeBorder = this.$refs["$changeBorder"];
    this.elChangeHeight = this.changeBorder.clientHeight;
    this.elLcHeight = this.elHeight - this.elChangeHeight - 40;
    this.hide = true;
    PeopleService.getHouseById(this.type, this.code, data => {
      this.data = data.data;
      this.houseData = data.data.house;
      this.houseUnits = data.data.units;

      this.houseRooms = data.data.room;
      if (data.data.house) {
        let layersArr = [];
        let layers = data.data.house.layers;
        for (let i = 0; i < layers; i++) {
          layersArr.push(new numberConvert(i + 1 + "").pri_ary());
        }
        this.houseLayers = layersArr;
      }
      this.addMarker();
    });
    if (this.changeBorder) {
      ElementResizeEvent(this.changeBorder, event => {
        // console.log(event);
      });
    }
  },
  beforeDestroy() {
    this.$parent.removeMarker();
    // window[this.mapname].operation.setFullExtent();
  },
  watch: {
    code(nVal, oVal) {
      this.$parent.removeMarker();
      PeopleService.getHouseById(this.type, this.code, data => {
        this.data = data.data;
        this.houseData = data.data.house;
        this.houseUnits = data.data.units;

        this.houseRooms = data.data.room;
        if (data.data.house) {
          let layersArr = [];
          let layers = data.data.house.layers;
          for (let i = 0; i < layers; i++) {
            layersArr.push(new numberConvert(i + 1 + "").pri_ary());
          }
          this.houseLayers = layersArr;
        }
        this.addMarker();
      });
    }
  },
  methods: {
    getIcon(type) {
      switch (type) {
        case "未住人":
          return this.icon_renfang_weizhu;
          break;
        case "流动人口":
          return this.icon_renfang_liudong;
          break;
        case "常驻人口":
          return this.icon_renfang_changzhu;
          break;
        default:
          return this.icon_renfang_changzhu;
      }
    },
    handlePopleView(gridcode, index) {
      console.log(this.$refs["MapPopleView"])
      this.$refs["MapPopleView"].handleQueryList(
        this.houseData.gridCode + this.houseRooms[index].unitCode + gridcode,
      );
    },
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
    unitsChange(item, index) {
      this.unitsIndex = index;
      PeopleService.getHouseLayers(this.type, this.code, "一层", item, data => {
        if (data.data === null) {
          this.isContainHouseInfo = true;
          this.data.float = 0;
          this.data.resident = 0;
          this.houseRooms = [];
          this.$popup.showNotification({ message: "此房屋暂无数据!" });
          return;
        }
        this.isContainHouseInfo = true;
        this.data.float = data.data.float;
        this.data.resident = data.data.resident;
        this.houseRooms = data.data.room;
      });
      this.layersIndex = 0;
      // /this.
    },
    layersChange(item, index) {
      PeopleService.getHouseLayers(
        this.type,
        this.code,
        item + "层",
        new numberConvert(this.unitsIndex + 1 + "").pri_ary() + "单元",
        data => {
          if (data.data === null) {
            this.isContainHouseInfo = true;
            this.data.float = 0;
            this.data.resident = 0;
            this.houseRooms = [];
            this.$popup.showNotification({ message: "此房屋暂无数据!" });
            return;
          }
          this.isContainHouseInfo = true;
          this.data.float = data.data.float;
          this.data.resident = data.data.resident;
          this.houseRooms = data.data.room;
        }
      );
      this.layersIndex = index;
    },
    addMarker() {
      // 将结果的grid_code以数组的方式传过去
      let ids = [this.code];
      this.$parent.addMarker(ids, "人房", val => {
        if (val.val.features.length === 0) {
          this.$popup.showNotification({ message: "此房屋暂无空间信息!" });
          this.smx = "暂无";
          this.smy = "暂无";
          return;
        }
        // 设置面板显示经纬度
        this.smx = val.val.features[0].getGeometry().getCoordinates()[0];
        this.smy = val.val.features[0].getGeometry().getCoordinates()[1];
        // window[this.mapname].operation.setCenterAndZoom(
        //   [
        //     val.val.features[0].getGeometry().getCoordinates()[0],
        //     val.val.features[0].getGeometry().getCoordinates()[1]
        //   ],
        //   17
        // );
      });
    }
  }
};
</script>

<style lang="sass">
  @import "./people.info.component.scss";
</style>
