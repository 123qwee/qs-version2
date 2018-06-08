<template>
  <el-dialog center width="100%" custom-class="dialog-matter dialog-matter-details" @open="handleDlgOpen" :title="title" :visible.sync="visible" :fullscreen=true>
    <el-tabs v-model="activeTab" ref="matterTab" class="matter-info-tabs" @tab-click="handleTabClick" type="border-card">
      <el-tab-pane class="matter-info-tab" name="案卷信息" label="案卷信息">
        <vCaseTransInfo :taskNum="taskNum" ></vCaseTransInfo>
      </el-tab-pane>
      <el-tab-pane class="matter-info-tab" name="流程图" label="流程图">
        <vDiagram ref="vDiagram"></vDiagram>
      </el-tab-pane>
      <!-- <el-tab-pane v-if="currentActiviti=='结案'" class="matter-info-tab" name="结案报告" label="结案报告">
        <vCaseCompleteCompare :taskNum="taskNum" ref="vCaseCompleteCompare"></vCaseCompleteCompare>
      </el-tab-pane> -->
      <el-tab-pane v-if="pressInfo.length>0" class="matter-info-tab" name="督办信息" label="督办信息">
        <vCasePressDetails ref="vCasePressDetails" :pressInfo="pressInfo" :isCanReply="false"></vCasePressDetails>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
  import vCaseTransInfo from './MatterTransInfo.vue';
  import vCasePowerInfo from './CasePowerInfo.vue';
  import vDiagram from '../raphael/Diagram.vue';
  import vCasePressDetails from './CasePressDetails.vue';
  import vCaseCompleteCompare from './CaseCompleteCompare.vue';

  import service from './service/matter_service.js';

  export default {
    components: {
      vCaseTransInfo,
      vCasePowerInfo,
      vCasePressDetails,
      vCaseCompleteCompare,
      vDiagram
    },
    data() {
      return {
        title: '', // 当前弹出组件标题
        visible: false, // 当前弹出组件是否可见
        taskNum: '', // 案卷编号
        activeTab: '案卷信息', // 当前选中Tab页Name
        pressInfo: [], // 案卷督办信息
        powerInfo: [], // 案卷申请信息
        currentActiviti: '' ,// 案卷所在流转步骤
        fullscreen:true//全屏
      };
    },
    methods: {
      handleDlgOpen() {
        this.activeTab = '案卷信息';
      },
      handleTabClick(tab) {
        if (tab.label == '流程图') {
          // 流程图显示必须在页面元素加载之后
          this.$refs['vDiagram'].initDiagram();
        }
      },
      // 获取待办任务督办信息
      getPressInfo() {
        let that = this;
        service.getMatterPress({
          taskNum: this.taskNum,
          successFunc: data => {
            that.pressInfo = data;
          }
        });
      },
      // 获取流程信息
      getProcessInfo() {
        let that = this;

        service.queryProcess({
          taskNum: this.taskNum,
          successFunc: data => {
            // 如果当前选中Tab页为流程图，则更新流程图
            that.$refs['vDiagram'].isDrawDiagram = this.activeTab == '流程图';
            that.$refs['vDiagram'].diagramLayout = data;

            let curActiviti = _.find(data.activities, item => {
              return item.properties.currentActiviti;
            });

            if (curActiviti) {
              that.currentActiviti = curActiviti.properties.name;
            } else {
              that.currentActiviti = '结案';
            }
          }
        });
      },
      // 获取申请信息
      getMatterPower() {
        service.getMatterPower({
          taskNum: this.taskNum,
          successFunc: data => {
            this.powerInfo = data;
          }
        });
      }
    },
    watch: {
      visible(nValue, oValue) {
        if (nValue) {
          // 获取流程信息
          this.getProcessInfo();
          // 获取督办信息
          this.getPressInfo();
          // 获取申请信息
          this.getMatterPower();
        }
      }
    }
  };

</script>

<style>
  .dialog-matter .el-dialog__title {
    color: #48576a;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .matter-info-tabs {
    height: 800px;
  }

  .matter-info-tabs .el-tabs__content {
    height: calc(100% - 72px);
    overflow-y: auto;
  }

  .matter-info-tab {
    height: 100%;
    width:100%;
  }

</style>
