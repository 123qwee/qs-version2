<template>
  <div class="step-wrap">
    <div class="step-item" v-for="(item,index) in transInfo" :key="index">
      <div class="step-item-head" :class="getStepClass(item.tranType)">
        <div class="step-item-line">
          <i class="step-line-inner"></i>
        </div>
        <span class="step-title">
          <span>{{getProcessName(item.tranType)}}</span>
        </span>
      </div>
      <div class="step-item-main">
        <vMatterBaseInfo v-if="index==0" :taskNum="taskNum" :mediaList="item.mediaList" ref="vMatterBaseInfo" class="step-main-content"></vMatterBaseInfo>
        <vMatterProcessInfo v-else :processInfo="item" class="step-main-content"></vMatterProcessInfo>
      </div>
    </div>
  </div>
</template>

<script>
import service from './service/matter_service.js';

import vMatterBaseInfo from './MatterBaseInfo.vue';
import vMatterProcessInfo from './MatterProcessInfo.vue';

export default {
  components: {
    vMatterBaseInfo,
    vMatterProcessInfo
  },
  props: {
    // 案卷编号
    taskNum: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 存储流程信息
      transInfo: []
    };
  },
  mounted() {
    // 获取流程信息
    if (this.taskNum) {
      this.getTransInfo(this.taskNum);
    }
  },
  methods: {
    getTransInfo(taskNum) {
      let that = this;
      // 根据案卷编号获取案卷流转信息
      service.getMatterTransAndMedias({
        taskNum: taskNum,
        successFunc: data => {
          that.transInfo = data;
        }
      });
    },
    // 获取流程步骤名称
    getProcessName(type) {
      switch (type) {
        case 1:
          return '上报';
        case 2:
          return '受理';
        case 3:
          return '核实';
        case 4:
          return '处置';
        case 5:
          return '核查';
        case 6:
          return '结案';
        case 7:
          return '办理';
        default:
          return '办理';
      }
    },
    getStepClass(type) {
      switch (type) {
        case 1:
          return 'step-title-1';
        case 2:
          return 'step-title-2';
        case 3:
          return 'step-title-3';
        case 4:
          return 'step-title-4';
        case 5:
          return 'step-title-5';
        case 6:
          return 'step-title-6';
        case 7:
          return 'step-title-7';
        default:
          return 'step-title-7';
      }
    }
  },
  watch: {
    // 监听案卷编号变化
    taskNum: function(nValue, oValue) {
      if (nValue != '') {
        this.getTransInfo(nValue);
      }
    }
  }
};
</script>

<style>
@import url('./styles/step.css');
.step-wrap{
    overflow-y: auto
}

</style>