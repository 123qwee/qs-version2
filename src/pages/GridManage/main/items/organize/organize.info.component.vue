<template>
  <div class="organize-page">
      <div class="back" @click="returnBtnClick()">
          <div><img :src="icon_tool_map">&nbsp;&nbsp;点击关闭列表</div>
      </div>
      <div class="organize-name">{{organizeInfo.socialOrgname}}</div>
      <el-row class="organize-top">
          <el-col :span="3">经度:</el-col>
          <el-col :span="8">{{organizeInfo.longitude}}</el-col>
          <el-col :span="2">;</el-col>
          <el-col :span="3">纬度:</el-col>
          <el-col :span="8">{{organizeInfo.latitude}}</el-col>
      </el-row>
      <hr/>
      <happy-scroll class="organize-scroll" v-if="orgInfoHide" color="rgba(51,51,51,0.2)" hide-horizontal resize size="8">
        <div class="flex">
            <div>统一代码：{{organizeInfo.organizationCode}}</div>
            <div>业务主管部门：{{organizeInfo.competentAuthority}}</div>
            <div>管理登记机关：{{organizeInfo.manageDep}}</div>
            <div>登记证号：{{organizeInfo.registrationCode}}</div>
            <div class="organize-top">成立时间：{{organizeInfo.approvalDate}}</div>
            <div>组织机构代码：{{organizeInfo.organizationCode}}</div>
            <el-row>
                <el-col :span="4">法人：</el-col>
                <el-col :span="6">{{organizeInfo.representativeName}}</el-col>
                <el-col :span="6">联系电话：</el-col>
                <el-col :span="8">{{organizeInfo.representativeContact}}</el-col>
            </el-row>
            <div>注册资金：{{organizeInfo.registeredFund}}</div>
            <div>办公地址：{{organizeInfo.officeAddress}}</div>
            <el-row class="organize-top">
                <el-col :span="4">会长：</el-col>
                <el-col :span="6">{{organizeInfo.presidentName}}</el-col>
                <el-col :span="6">联系电话：</el-col>
                <el-col :span="8">{{organizeInfo.presidentPhone}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="5">秘书长：</el-col>
                <el-col :span="5">{{organizeInfo.secretaryName}}</el-col>
                <el-col :span="6">联系电话：</el-col>
                <el-col :span="8">{{organizeInfo.secretaryPhone}}</el-col>
            </el-row>
            <div class="organize-top">工作人员人数：{{organizeInfo.staffNumber}}人</div>
            <div>专职人员人数：{{organizeInfo.fulltimeStaff}}人</div>
            <div>兼职人员人数：{{organizeInfo.parttimeStaff}}人</div>
            <div>党员人数：{{organizeInfo.partyMember}}人</div>
            <div>会员人数：{{organizeInfo.vipMember}}人</div>
        </div>
      </happy-scroll>
  </div>
</template>

<script>
// 引入Observable对象
import { VistualEmit } from "../../vistual.emit.js";
import { OrganizeService } from "../../services/organize.service";
import { icon_tool_map } from "../../common/image";
export default {
  name: "organizeInfoComponent",
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
      /** 基本信息 */
      organizeInfo: {},
      icon_tool_map: icon_tool_map,
      /** 总数 */
      allTotal: 0,
      page: 1,
      pageSize: 10,
      orgInfoHide: false,
      smallImg: require("./images/photo.jpg"),
      smallSvg: require("./images/point.svg")
    };
  },

  mounted() {
    this.orgInfoHide = true;
    OrganizeService.getOrganizeInfoById(this.type, this.code, data => {
      this.organizeInfo = data.data.socialOrganization;
      this.addMarker();
    });
  },

  beforeDestroy() {
    this.$parent.removeMarker();
    window[this.mapname].operation.setFullExtent();
  },

  methods: {
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

    addMarker() {
      // 将结果的grid_code以数组的方式传过去
      this.$parent.addMarker([this.code], "组织", val => {
        if (val.val.features.length === 0) {
          this.$popup.showNotification({ message: "此党建组织暂无空间信息!" });
          return;
        }
        this.organizeInfo.longitude = val.val.features[0].getGeometry().getCoordinates()[0].toFixed(6);
        this.organizeInfo.latitude = val.val.features[0].getGeometry().getCoordinates()[1].toFixed(6);
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
  @import "./organize.info.component.scss";
</style>
