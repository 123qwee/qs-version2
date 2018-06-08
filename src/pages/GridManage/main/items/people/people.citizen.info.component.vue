<template>
  <div class="people_border——1 people_info_height">
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
                <el-col :span="12">建筑面积：{{houseData.area}}平方米</el-col>
              </el-row>
              <el-row type="flex" :gutter="20" justify="space-around">
                <el-col :span="12" v-if="houseData.buildHouseholds">楼栋户数：{{houseData.buildHouseholds}}户</el-col>
                <el-col :span="12" v-if="!houseData.buildHouseholds">楼栋户数：</el-col>
                <el-col :span="12"></el-col>
              </el-row>
            </div>
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
              </div>
            </div>
            <div class="split_row"></div>
            <div class="content">
               <el-row type="flex" :gutter="20" justify="space-around">
                <el-col :span="24" class="title" style="font-size:14px;">{{houseName}}号</el-col>
              </el-row>
              <el-row type="flex" :gutter="20" justify="space-around">
                <el-col :span="24">层数：{{data.layNumber}}</el-col>
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
          </div>
          <div class="lc_select" v-if="isContainHouseInfo" :style="{height:elLcHeight+'px'}">
            <div class="lc_number" ref="lc_number">
              <happy-scroll v-if="hide" :style="{height:elLcHeight+'px'}" color="rgba(51,51,51,0.2)" hide-horizontal resize size="4" v-bind:scroll-top="roomScrollTop">
                <div class="scroll">
                  <div v-bind:class="{select:index===layersIndex}" v-for="(item,index) in houseLayers" @click="layersChange(item,index)">{{item}}</div>
                </div>
              </happy-scroll>
            </div>
            <div class="fw_select">
              <happy-scroll v-if="hide" :style="{height:elLcHeight+'px'}" color="rgba(51,51,51,0.2)" hide-horizontal resize size="4">
                <div class="flex">
                  <template v-if="unitsIndex===0">
                    <div class="house"  @click="handlePopleView1()">
                      <div class="people_type">常住人口</div>
                      <div>
                        <img :src="getIcon('常驻人口')">
                      </div>
                      <div>{{houseCz}}人</div>
                    </div>
                    <div class="house"  @click="handlePopleView1()">
                      <div class="people_type">租户</div>
                      <div>
                        <img :src="getIcon('流动人口')">
                      </div>
                      <div>{{houseLd}}人</div>
                    </div>
                  </template>
                  <template v-if="unitsIndex===1">
                    <div class="house" v-for="(item,index) in houseRooms" :key="index" @click="handlePopleView(item.roomCode,index)">
                      <div>{{item.unitCode}}</div>
                      <div>
                        <img :src="getIcon(item.roomType)">
                      </div>
                      <div>{{item.checkInCount}}人</div>
                    </div>
                  </template>
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
import {
  linkHouseService,
  getHousetype
} from "./people.citizen.info.link.service";
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
      // 房屋编号
      houseLayers: [],
      houseRooms: [],
      data: {},
      // 房屋常驻人口
      houseCz: 0,
      // 房屋流动人口
      houseLd: 0,
      // 房屋名称
      houseName: "",
      unitsIndex: 0,
      layersIndex: 0,
      // room滚动条位置
      roomScrollTop: "0",
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
    /**
     * 2018-04-11
     * 根据不同的房屋编码去查询正确的服务
     */
    linkHouseService(this.type, this.code, this.id, data => {
      this.setValueByData.bind(this)(data);
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
      /**
       * 2018-04-11
       * 根据不同的房屋编码去查询正确的服务
       */
      linkHouseService(this.type, this.code, this.id, data => {
        this.setValueByData.bind(this)(data);
      });
    },
    id(nVal, oVal) {
      /**
       * 2018-04-11
       * 根据不同的房屋编码去查询正确的服务
       */
      linkHouseService(this.type, this.code, this.id, data => {
        this.setValueByData.bind(this)(data);
      });
    },
    houseRooms(nVal, oVal) {
      this.houseData = this.data.house;
      this.houseUnits = this.data.units;

      this.houseCz = nVal.length > 0 ? nVal[0].householdCount : 0;
      this.houseLd = nVal.length > 0 ? nVal[0].floatCount : 0;
      // 生成房屋名称
      let houseType =
        nVal.length > 0
          ? nVal[0].unitCode.substr(0, 2).indexOf("00") > -1
            ? "庭院房"
            : "单元房"
          : "庭院房";
      this.houseName =
        this.houseData.housesName +
        houseType +
        (nVal.length > 0 ? nVal[0].roomCode : "0000");
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
    /**
     * 根据服务端请求到的数据，更新界面上现实的元素
     */
    setValueByData(data) {
      this.data = data.data;
      this.houseData = data.data.house;
      this.houseUnits = data.data.units;
      this.houseRooms = data.data.room;
      this.unitsIndex = getHousetype("人房", this.id);
      // 设置room高亮当前选中的对象
      if (data.data.house) {
        let layersArr = [];
        let layers = data.data.layers;
        for (let i = 0; i < layers.length; i++) {
          if (layers[i] === this.houseRooms[0].roomCode) {
            let height = this.$refs["lc_number"].clientHeight;
            if (this.roomScrollTop === "0") {
              _.delay(() => {
                // 滚动条无法对超过控件高度的位置进行滚动，判定当前需要滚动的位置，并且滚动到相应位置
                if (height / 30 > layers.length - i) {
                  this.roomScrollTop = height + "";
                }
                this.roomScrollTop = (i - 1) * 30 + "";
              }, 500);
            } else {
              this.roomScrollTop = (i - 1) * 30 + "";
            }
            this.layersIndex = i;
          }
          layersArr.push(layers[i]);
        }
        this.houseLayers = layersArr;
      }
      this.addMarker();
    },
    handlePopleView1() {
      this.$refs["MapPopleView"].handleQueryList(
        this.houseData.gridCode +
          this.houseRooms[0].unitCode +
          this.houseRooms[0].roomCode
      );
    },
    handlePopleView(gridcode, index) {
      this.$refs["MapPopleView"].handleQueryList(
        this.houseData.gridCode + this.houseRooms[index].unitCode + gridcode
      );
    },
    /**
     * 返回事件
     */
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
    /**
     * 房屋类型切换
     * @param {string} item 房屋类型
     * @param {string} index 顺序号
     */
    unitsChange(item, index) {
      this.unitsIndex = index;
      PeopleService.getHouseLayers(this.type, this.code, "", item, data => {
        if (data.data === null) {
          this.isContainHouseInfo = true;
          this.houseRooms = [];
          this.$popup.showNotification({ message: "此房屋暂无数据!" });
          return;
        }

        // 设置room高亮当前选中的对象
        if (data.data.layers) {
          let layersArr = [];
          let layers = data.data.layers;
          for (let i = 0; i < layers.length; i++) {
            layersArr.push(layers[i]);
          }
          this.houseLayers = layersArr;
        }
        this.isContainHouseInfo = true;
        this.houseRooms = data.data.room;
        // 2018-05-04
        // 切换房屋类型，需要动态生成房屋id
        if (this.unitsIndex === 0) {
          this.addMarker(
            this.code +
              this.houseRooms[0].unitCode +
              this.houseRooms[0].roomCode
          );
        } else if (this.unitsIndex === 1) {
          this.addMarker(this.code + "11" + this.houseRooms[0].roomCode);
        } else {
          this.addMarker();
        }
      });
      this.layersIndex = 0;
    },
    /**
     * 房屋切换
     * @param {string} item 房屋编号
     * @param {string} index 顺序号
     */
    layersChange(item, index) {
      let unit = this.unitsIndex === 0 ? "庭院房" : "单元房";
      PeopleService.getHouseLayers(this.type, this.code, item, unit, data => {
        if (data.data === null) {
          // 设置是否现实房屋信息
          this.isContainHouseInfo = true;
          this.houseRooms = [];
          this.$popup.showNotification({ message: "此房屋暂无数据!" });
          return;
        }
        // 设置是否现实房屋信息
        this.isContainHouseInfo = true;
        this.houseRooms = data.data.room;
        // 2018-05-04
        // 切换房屋类型，需要动态生成房屋id
        if (this.unitsIndex === 0) {
          this.addMarker(
            this.code +
              this.houseRooms[0].unitCode +
              this.houseRooms[0].roomCode
          );
        } else if (this.unitsIndex === 1) {
          this.addMarker(this.code + "11" + this.houseRooms[0].roomCode);
        } else {
          this.addMarker();
        }
      });
      this.layersIndex = index;
    },
    /**
     * 2018-4-13修改
     * 添加民房单元房的编码生成规则
     * 2018-5-3修改
     * 增加传参接口
     */
    addMarker(id) {
      this.$parent.removeMarker();

      let _id = id ? id : this.id;
      let ids = [];
      if (getHousetype("人房", _id) === 1) {
        // 将结果的grid_code以数组的方式传过去
        ids = [this.code + "11" + this.houseLayers[this.layersIndex]];
      } else {
        // 将结果的grid_code以数组的方式传过去
        ids = [
          this.code + this.houseRooms[0].unitCode + this.houseRooms[0].roomCode
        ];
      }
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
        // window[this.mapname].operation.setCenterAndZoom([
        //   val.val.features[0].getGeometry().getCoordinates()[0],
        //   val.val.features[0].getGeometry().getCoordinates()[1]
        // ]);
      });
    }
  }
};
</script>

<style lang="sass">
  @import "./people.citizen.info.component.scss";
</style>
