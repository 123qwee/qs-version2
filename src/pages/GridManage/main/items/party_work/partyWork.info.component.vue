<template>
  <div class="party-work-page">
      <div v-show="keyword != '网格'"  class="back" @click="returnBtnClick()">
          <div><img :src="icon_tool_map">&nbsp;&nbsp;点击关闭列表</div>
      </div>
      <div class="party-work-name">{{partyWorkInfo.organizationName}}</div>
      <el-row class="party-work-top">
          <el-col :span="3">经度:</el-col>
          <el-col :span="8">{{partyWorkInfo.longitude}}</el-col>
          <el-col :span="2">;</el-col>
          <el-col :span="3">纬度:</el-col>
          <el-col :span="8">{{partyWorkInfo.latitude}}</el-col>
      </el-row>
      <div class="party-work-group-but">
        <el-button @click="handlePartyWorkTab" name="党建信息">党建信息</el-button>
        <el-button @click="handlePartyWorkTab" name="党员列表">党员列表</el-button>
      </div>
      <hr/>
      <div v-if="partyInfoHide" class="party-work-pane">
        <happy-scroll v-if="partyInfoHide" color="rgba(51,51,51,0.2)" hide-horizontal resize size="8">
            <div class="flex">
                <div>所属辖区：{{partyWorkInfo.areaCoverage}}</div>
                <el-row class="party-work-top">
                    <el-col :span="6">书记名称:</el-col>
                    <el-col :span="4">{{partyWorkInfo.secretaryName}}</el-col>
                    <el-col :span="6">联系电话:</el-col>
                    <el-col :span="8">{{partyWorkInfo.secretaryPhone}}</el-col>
                </el-row>
                <div>党组织类型：{{partyWorkInfo.organizationType}}</div>
                <div class="party-work-top">党员数：{{partyWorkInfo.partyStaff}}人</div>
                <div>男性党员数：{{partyWorkInfo.mPartyStaff}}人</div>
                <div>女性党员数：{{partyWorkInfo.wPartyStaff}}人</div>
                <div>直管党员数：{{partyWorkInfo.straightPartyStaff}}人</div>
                <div>驻街党员数：{{partyWorkInfo.streetPartyStaff}}人</div>
            </div>
        </happy-scroll>
      </div>
      <div v-if="partyListHide" class="party-work-pane">
        <happy-scroll v-if="partyListHide" color="rgba(51,51,51,0.2)" hide-horizontal resize size="8">
            <div class="flex">
                <el-row v-for="(item,index) in partyMemberList" class='item_content' :key="index" justify="space-around" type="flex">
                    <el-col>
                        <div class="party-member-info"><span>姓名：{{item.name}}</span><span>入党时间：{{item.joinTime}}</span></div>
                        <div>职务：{{item.position}}</div>
                        <div>联系电话：{{item.tel}}</div>
                    </el-col>
                </el-row>
            </div>
        </happy-scroll>
      </div>
  </div>
</template>

<script>
import { PartyWorkService } from "../../services/party_work.service";
import { icon_tool_map } from "../../common/image";
export default {
  name: "partyWorkInfoComponent",
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
      /** 党建信息 */
      partyWorkInfo: {},
      icon_tool_map: icon_tool_map,
      /** 总数 */
      allTotal: 0,
      page: 1,
      pageSize: 10,
      partyInfoHide: false,
      partyListHide: false,
      smallImg: require("./images/photo.jpg"),
      smallSvg: require("./images/point.svg"),
      /** 当前tab */
      tabsName: "党建信息",
      /** 党员列表 */
      partyMemberList: []
    };
  },

  mounted() {
    this.partyInfoHide = true;
    this.$nextTick(function() {
      document.getElementsByName("党建信息")[0].focus();
    });
    PartyWorkService.getPartyWorkInfoById(this.type, this.code, data => {
      let PartyWorkType = _.find(lscache.get("OrgCategory"), item => {
        return item.value == data.data.partyOrganization.organizationType;
      });
      data.data.partyOrganization.organizationType =
        (PartyWorkType && PartyWorkType.label) || "不详";
      this.partyWorkInfo = data.data.partyOrganization;
      this.addMarker();
    });
  },

  beforeDestroy() {
    this.$parent.removeMarker();
    window[this.mapname].operation.setFullExtent();
  },

  methods: {
    /** tab切换 */
    handlePartyWorkTab(tab) {
      if (tab.currentTarget.name === "党建信息") {
        this.tabsName = "党建信息";
        this.partyInfoHide = true;
        this.partyListHide = false;
      } else if (tab.currentTarget.name === "党员列表") {
        this.tabsName = "党员列表";
        this.partyInfoHide = false;
        this.partyListHide = true;
        if (this.partyMemberList.length == 0) {
          PartyWorkService.getPartyMemberList(this.partyWorkInfo.id, data => {
            this.partyMemberList = data.data;
          });
        }
      }
    },

    /** 返回列表页面 */
    returnBtnClick() {
      this.$parent.back();
    },

    addMarker() {
      // 将结果的grid_code以数组的方式传过去
      this.$parent.addMarker([this.code], "党务", val => {
        if (val.val.features.length === 0) {
          this.$popup.showNotification({ message: "此党建组织暂无空间信息!" });
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
  @import "./partyWork.info.component.scss";
</style>
