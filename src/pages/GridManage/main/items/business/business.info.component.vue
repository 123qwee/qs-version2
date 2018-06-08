<template>
  <div class="business-page">
      <div class="back" @click="returnBtnClick()">
          <div><img :src="icon_tool_map">&nbsp;&nbsp;点击关闭列表</div>
      </div>
      <div class="business-name">{{businessInfo.companyName}}</div>
      <el-row class="business-top">
          <el-col :span="3">经度:</el-col>
          <el-col :span="8">{{businessInfo.longitude}}</el-col>
          <el-col :span="2">;</el-col>
          <el-col :span="3">纬度:</el-col>
          <el-col :span="8">{{businessInfo.latitude}}</el-col>
      </el-row>
      <div class="business-group-but">
        <el-button @click="handleBusinessTab" name="基本信息">基本信息</el-button>
        <el-button @click="handleBusinessTab" name="其他信息">其他信息</el-button>
      </div>
      <hr/>
      <div v-if="basicInfoHide" class="business-pane">
        <happy-scroll class="business-scroll" v-if="basicInfoHide" color="rgba(51,51,51,0.2)" hide-horizontal resize size="8">
            <div class="flex">
                <div>工商执照注册号：{{businessInfo.creditCode}}</div>
                <div>注册资金：{{businessInfo.registeredFund}}万</div>
                <div>注册日期：{{businessInfo.registeredDate}}</div>
                <div class="business-top">类别：{{businessInfo.companyCategory}}</div>
                <div>从业人数：{{businessInfo.companyNumber}}人</div>
                <el-row class="business-top">
                    <el-col :span="4">法人：</el-col>
                    <el-col :span="6">{{businessInfo.representativeName}}</el-col>
                    <el-col :span="6">联系电话：</el-col>
                    <el-col :span="8">{{businessInfo.representativeContact}}</el-col>
                </el-row>
                <div>证件号码：{{businessInfo.representativeCardnumber}}</div>
                <div>企业地址：{{businessInfo.companyAddress}}</div>
            </div>
        </happy-scroll>
      </div>
      <div v-if="otherInfoHide" class="business-pane">
        <happy-scroll class="business-scroll" v-if="otherInfoHide" color="rgba(51,51,51,0.2)" hide-horizontal resize size="8">
            <div class="flex">
                <div>关注程度：
                        <el-rate v-model="businessInfo.concernedDegree" disabled :max="3" text-color="#ff9900" style="display: inline-block;"></el-rate>
                </div>
                <div>是否危化企业：{{businessInfo.isdangerousBusiness == 1 ? '是' : '否'}}</div>
                <div>安全隐患类型：{{businessInfo.securityRiskType}}</div>
                <div>治保负责人姓名：{{businessInfo.securityPrincipalName}}</div>
                <div class="business-top">知否有中共党组织：{{businessInfo.ishaveCommunist == 1 ? '是' : '否'}}</div>
                <div>党员人数：{{businessInfo.communistNumber}}人</div>
                <div class="business-top">是否有工会：{{businessInfo.ishaveUnion == 1 ? '是' : '否'}}</div>
                <div>工会会员数量：{{businessInfo.unionMemberNumber}}人</div>
                <div class="business-top">是否有共青团组织：{{businessInfo.ishaveYouthleague == 1 ? '是' : '否'}}</div>
                <div>共青团团员数量：{{businessInfo.youthleagueMemberNumber}}人</div>
                <div class="business-top">是否有妇联组织：{{businessInfo.ishaveWomensorg == 1 ? '是' : '否'}}</div>
                <div>妇女数量数量：{{businessInfo.womenNumber}}</div>
            </div>
        </happy-scroll>
      </div>
  </div>
</template>

<script>
// 引入Observable对象
import { VistualEmit } from "../../vistual.emit.js";
import commonAjax from "../../../../../assets/scripts/common/commonAjax";
import { BusinessService } from "../../services/business.service";
import { icon_tool_map } from "../../common/image";
export default {
  name: "businessInfoComponent",
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
      businessInfo: {},
      icon_tool_map: icon_tool_map,
      /** 总数 */
      allTotal: 0,
      page: 1,
      pageSize: 10,
      basicInfoHide: false,
      otherInfoHide: false,
      smallImg: require("./images/photo.jpg"),
      smallSvg: require("./images/point.svg"),
      /** 当前tab */
      tabsName: "基本信息"
    };
  },

  mounted() {
    this.basicInfoHide = true;
    this.$nextTick(function() {
      document.getElementsByName("基本信息")[0].focus();
    });
    BusinessService.getBusinessInfoById(this.type, this.code, data => {
      this.businessInfo = data.data.economicOrganization;
      if (
        !lscache.get("businessType") ||
        lscache.get("businessType").length == 0
      ) {
        commonAjax.getDict({
          data: { typeIds: constants.DICT_TYPE.BUSINESSTYPE.toString() },
          successFunc: data => {
            //企业类型
            lscache.set(
              "businessType",
              _.map(data.data["企业类别"], item => {
                return { label: item.dataName, value: item.dataCode };
              }),constants.SESSION_LIMIT
            );
            let businessType = _.find(lscache.get("businessType"), item => {
              return item.value == this.businessInfo.companyCategory;
            });
            this.businessInfo.companyCategory =
              (businessType && businessType.label) || "不详";

            this.businessInfo.concernedDegree = Number(
              this.businessInfo.concernedDegree
            );
          }
        });
      } else {
        let businessType = _.find(lscache.get("businessType"), item => {
          return item.value == this.businessInfo.companyCategory;
        });
        this.businessInfo.companyCategory =
          (businessType && businessType.label) || "不详";
        this.businessInfo.concernedDegree = Number(
          this.businessInfo.concernedDegree
        );
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
    handleBusinessTab(tab) {
      if (tab.currentTarget.name === "基本信息") {
        this.tabsName = "基本信息";
        this.basicInfoHide = true;
        this.otherInfoHide = false;
      } else if (tab.currentTarget.name === "其他信息") {
        this.tabsName = "其他信息";
        this.basicInfoHide = false;
        this.otherInfoHide = true;
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

    addMarker() {
      // 将结果的grid_code以数组的方式传过去
      this.$parent.addMarker([this.code], "工商", val => {
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
  @import "./business.info.component.scss";
</style>
