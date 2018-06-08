<template>
    <div class="people_border grid-list">
      <div class="margin_border">
        <div class="grid-info-title">{{gridInfo.gridName}}</div>
        <hr/>
        <happy-scroll v-if="hide" style="height:240px" color="rgba(51,51,51,0.2)" hide-horizontal resize size="8">
            <div class="flex">
                <el-row :gutter="10">
                    <el-col :span="10">
                        <span>网格编号：</span>
                    </el-col>
                    <el-col :span="14">
                        <span>{{gridInfo.gridCode}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="10">
                        <span>网格范围：</span>
                    </el-col>
                    <el-col :span="14">
                        <span>{{gridInfo.gridRange}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="10" style="padding-top:15px;">
                    <el-col :span="10">
                        <span>一级网格长：</span>
                    </el-col>
                    <el-col :span="14">
                        <span>{{gridInfo.FirstMember}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="10">
                        <span>一级网格区域：</span>
                    </el-col>
                    <el-col :span="14">
                        <span>{{gridInfo.FirstLand}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="10" style="padding-top:15px;">
                    <el-col :span="10">
                        <span>二级网格长：</span>
                    </el-col>
                    <el-col :span="14">
                        <span>{{gridInfo.SecoundMember}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="10">
                        <span>二级网格长电话：</span>
                    </el-col>
                    <el-col :span="14">
                        <span>{{gridInfo.SecoundNumber}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="10">
                        <span>二级网格区域：</span>
                    </el-col>
                    <el-col :span="14">
                        <span>{{gridInfo.SecoundLand}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="10" style="padding-top:15px;">
                    <el-col :span="10">
                        <span>三级网格长：</span>
                    </el-col>
                    <el-col :span="14">
                        <span>{{gridInfo.ThirdMember}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="10">
                        <span>三级网格长电话：</span>
                    </el-col>
                    <el-col :span="14">
                        <span>{{gridInfo.ThirdNumber}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="10">
                        <span>三级网格区域：</span>
                    </el-col>
                    <el-col :span="14">
                        <span>{{gridInfo.ThirdLand}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="10" style="padding-top:15px;">
                    <el-col :span="10">
                        <span>网格员：</span>
                    </el-col>
                    <el-col :span="14">
                        <span>{{gridInfo.LastMember}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="10">
                        <span>网格员电话：</span>
                    </el-col>
                    <el-col :span="14">
                        <span>{{gridInfo.LastNumber}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="10">
                        <span>网格员区域：</span>
                    </el-col>
                    <el-col :span="14">
                        <span>{{gridInfo.LastLand}}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="10" style="padding-top:15px;">
                    <el-col :span="10">
                        <span>户数：</span>
                    </el-col>
                    <el-col :span="14">
                        <span>{{gridInfo.staffHousehold}}户</span>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="10">
                        <span>人口：</span>
                    </el-col>
                    <el-col :span="14">
                        <span>{{gridInfo.staffCount}}人</span>
                    </el-col>
                </el-row>
            </div>
        </happy-scroll>
        <el-tabs class="grid-houses-info" v-model="activeName" type="border-card" @tab-click="handleClickTab">
            <el-tab-pane v-for="(item, index) in tabTypes" :label="item" :name="item" :key="index">
                <happy-scroll v-if="tabsHide" color="rgba(51,51,51,0.2)" hide-horizontal resize size="8">
                    <div class="flex">
                        <div class="list-item-name" v-for="(item, index) in listData" :key="index">
                            <div class="list-item-img">
                                <span>{{index + 1}}</span>
                                <img src="./images/dian.png">
                            </div>
                            <div v-if="activeName === '楼房' || activeName === '平房'" class="list-item-title" @click="handleItemData(item)">
                                <div>{{item.communityName}}</div>
                                <div>{{item.housesName}}</div>
                            </div>
                            <div v-if="activeName === '学校'" class="list-item-title" @click="handleItemData(item)">
                                <div>{{item.schoolName}}</div>
                                <div>{{item.schoolAdress}}</div>
                            </div>
                            <div v-if="activeName === '工商'" class="list-item-title" @click="handleItemData(item)">
                                <div>{{item.companyName}}</div>
                                <div>{{item.companyAddress}}</div>
                            </div>
                            <div v-if="activeName === '组织'" class="list-item-title" @click="handleItemData(item)">
                                <div>{{item.socialOrgname}}</div>
                                <div>{{item.officeAddress}}</div>
                            </div>
                        </div>
                        <div v-if="listData.length === 0" style="text-align: center;">暂无数据</div>
                    </div>
                </happy-scroll>
            </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script>
// 引入Observable对象
import { VistualEmit } from "../../vistual.emit.js";
import { GridService } from "../../services/grid.service.js";
export default {
  name: "gridComponent",
  props: {
    keyword: "",
    type: "",
    region: "",
    code: "",
    id: ""
  },
  data() {
    return {
      gridInfo: {},
      /** 网格信息 */
      ObserGrid: null,
      /** 当前面板 */
      activeName: "楼房",
      /** 面板类型 */
      tabTypes: ["楼房", "平房", "学校", "工商", "组织"],
      hide: false,
      tabsHide: false,
      /** 列表数据 */
      listData: []
    };
  },

  mounted() {
    this.hide = true;
    this.tabsHide = true;
  },

  created() {
    this.Observable = VistualEmit.getObservable("change").subscribe(event => {
      if (!event) {
        return;
      }
      if (event.region) {
        GridService.getGridByID(event.region, data => {
          this.gridInfo = data;
        });
        this.getListData(this.activeName, event.region);
      }
    });

    if (this.type == "网格" && this.id.indexOf("back") > -1) {
      this.activeName =
        _.last(this.id) == 0
          ? "楼房"
          : _.last(this.id) == 1 ? "平房" : this.keyword;
      GridService.getGridByID(this.region, data => {
        this.gridInfo = data;
      });
      this.getListData(this.keyword, this.region);
    }
  },

  beforeDestroy() {
    // 清空点
    this.$parent.removeMarker();
  },

  methods: {
    /** 切换tab页 */
    handleClickTab(tab) {
      this.tabsHide = false;
      this.listData = [];
      this.$parent.removeMarker();
      this.addMarker();
      this.getListData(this.activeName, this.gridInfo.gridCode);
    },

    /** 请求列表数据 */
    getListData(typeName, gridId) {
      let type = typeName === "楼房" || typeName === "平房" ? "人房" : typeName;
      let gridCode =
        typeName === "楼房"
          ? gridId + "0"
          : typeName === "平房" ? gridId + "1" : gridId;
      GridService.getGridListData(
        type,
        gridCode,
        "",
        data => {
          this.listData = data.list || [];
          this.tabsHide = true;
          this.$parent.removeMarker();
          this.addMarker();
        },
        1,
        999
      );
    },

    /** 在地图上打点 */
    addMarker() {
      let ids = _.map(this.listData, "gridCode");
      if (this.activeName == "楼房" || this.activeName == "平房") {
        this.$parent.addMarker(ids, "人房");
      } else {
        this.$parent.addMarker(ids, this.activeName);
      }
    },
    /** 点击列表数据 */
    handleItemData(item) {
      this.$parent.$parent.animate();
      VistualEmit.emit("change", {
        keyword: this.type,
        type:
          this.activeName == "楼房" || this.activeName == "平房"
            ? "人房"
            : this.activeName,
        id:
          this.activeName == "楼房"
            ? "back000"
            : this.activeName == "平房" ? "back001" : "back002",
        code: item.gridCode
      });
      this.$parent.removeMarker();
    }
  }
};
</script>

<style lang="sass">
  @import "./grid.component.scss";
</style>
