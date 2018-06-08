<template>
  <div v-bar class="step-wrap">
    <div>
      <div class="step-item" v-for="(item,index) in pressInfo" :key="index">
        <div class="step-item-head">
          <div class="step-item-line">
            <i class="step-line-inner"></i>
          </div>
          <span class="step-title">
            <span>{{getProcessName(item.tranType)}}</span>
          </span>
        </div>
        <div class="step-item-main">
          <vCasePressInfo :pressInfo="item" :isCanReply="isCanReply" :tranTaskNum="tranTaskNum" class="step-main-content"></vCasePressInfo>
          <vCasePressReplyInfo :pressId="item.id" :replyType="getReplyType(item)"></vCasePressReplyInfo>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from "./service/matter_service.js";

import vCasePressInfo from "./CasePressInfo.vue";
import vCasePressReplyInfo from "./CasePressReplyInfo.vue";

export default {
  components: {
    vCasePressInfo,
    vCasePressReplyInfo
  },
  props: {
    // 督办信息
    pressInfo: {
      type: Array,
      default: []
    },
    // 案卷当前流程编号
    tranTaskNum: {
      type: String,
      default: ""
    },
    // 是否可回复督办信息
    isCanReply: {
      type: Boolean,
      default: true
    },
    // 设置回复信息显示类型【PressMe--只能看到自己的回复、MePress--只能看到自己督办的回复、All--所有的回复都可以看到】
    replyType: {
      type: String,
      default: "PressMe"
    }
  },
  data() {
    return {};
  },
  methods: {
    // 获取流程步骤名称
    getProcessName(type) {
      switch (type) {
        case 1:
          return "上报";
        case 2:
          return "受理";
        case 3:
          return "核实";
        case 4:
          return "处置";
        case 5:
          return "核查";
        case 6:
          return "结案";
        case 7:
          return "办理";
        default:
          return "办理";
      }
    },
    // 是否显示回复信息
    isShowReply(pressInfo) {
      if (this.replyType) {
        if (
          this.replyType == "MePress" &&
          pressInfo.pressUserId == lscache.get("userId")
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    // 获取显示回复信息的类型
    getReplyType(pressInfo) {
      // 如果督办人为当前用户
      if (pressInfo.pressUserId == lscache.get("userId")) {
        return "All";
      } else {
        return "PressMe";
      }
    }
  }
};
</script>

<style>
@import url("./styles/step.css");
</style>