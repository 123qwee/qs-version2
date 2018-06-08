<template>
  <div class="diagram-wrap">
    <div :id="domId" class="diagram-dom"></div>
    <div class="diagram-legend">
      <i class="md-icon md-icon-hover material-icons" @click="handleExport" title="导出">&#xE2C4;</i>
      <div class="diagram-legend-color" style="background-color: #f9fafc;"></div>
      <span>未流转</span>
      <div class="diagram-legend-color" style="background-color: #D7F0EA;"></div>
      <span>已流转</span>
      <div class="diagram-legend-color" style="background-color: #D3E5F9;"></div>
      <span>当前流转</span>
    </div>
    <div v-if="isShowCurInfo" class="diagram-cur-info row-border2">
      <el-row class="row-title" type="flex" justify="space-around">
        <el-col :span="24">当前流转步骤</el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col class="column-title" :span="9">流转步骤</el-col>
        <el-col :span="15">{{curInfo.taskName}}</el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col class="column-title" :span="9">处理人</el-col>
        <el-col :span="15">{{curInfo.userName}}</el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col class="column-title" :span="9">所属部门</el-col>
        <el-col :span="15">{{curInfo.deptName}}</el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col class="column-title" :span="9">所属角色</el-col>
        <el-col :span="15">{{curInfo.roleName}}</el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col class="column-title" :span="9">流转时间</el-col>
        <el-col :span="15">{{curInfo.sTime}}</el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col class="column-title" :span="9">处理时间</el-col>
        <el-col :span="15">{{curInfo.eTime}}</el-col>
      </el-row>
    </div>
    <div v-bar v-if="isShowAllInfo" :class="[isShowCurInfo ? '' : 'not-cur-info']" class="diagram-all-info row-border2">
      <div>
        <el-row class="diagram-all-title row-title" type="flex" justify="space-around">
          <el-col :span="24">所有流转步骤</el-col>
        </el-row>
        <div v-for="(item,index) in allInfo" class="diagram-activity-info" :key="index">
          <el-row type="flex" justify="space-around">
            <el-col class="column-title" :span="9">流转步骤</el-col>
            <el-col :span="15">{{item.taskName}}</el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col class="column-title" :span="9">处理人</el-col>
            <el-col :span="15">{{item.userName}}</el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col class="column-title" :span="9">所属部门</el-col>
            <el-col :span="15">{{item.deptName}}</el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col class="column-title" :span="9">所属角色</el-col>
            <el-col :span="15">{{item.roleName}}</el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col class="column-title" :span="9">流转时间</el-col>
            <el-col :span="15">{{item.sTime}}</el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col class="column-title" :span="9">处理时间</el-col>
            <el-col :span="15">{{item.eTime}}</el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="diagram-info row-border2" v-if="isShowInfo" :style="{top:top+'px',left:left+'px'}">
      <el-row class="row-title" type="flex" justify="space-around">
        <el-col :span="24">流程步骤</el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col class="column-title" :span="5">流转步骤</el-col>
        <el-col :span="7">{{lastActivity.taskName}}</el-col>
        <el-col class="column-title" :span="5">处理人</el-col>
        <el-col :span="7">{{lastActivity.userName}}</el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col class="column-title" :span="5">所属部门</el-col>
        <el-col :span="7">{{lastActivity.deptName}}</el-col>
        <el-col class="column-title" :span="5">所属角色</el-col>
        <el-col :span="7">{{lastActivity.roleName}}</el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col class="column-title" :span="5">流转时间</el-col>
        <el-col :span="19">{{lastActivity.sTime}}</el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col class="column-title" :span="5">处理时间</el-col>
        <el-col :span="19">{{lastActivity.eTime}}</el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
import DiagramApi from './main';
import uuid from 'node-uuid';
import { saveSvgAsPng } from 'save-svg-as-png/saveSvgAsPng.js';

export default {
  data() {
    return {
      // 图表绑定数据
      diagramLayout: null,
      // 当前流程节点信息
      curInfo: {
        taskName: '',
        userName: '',
        deptName: '',
        roleName: '',
        sTime: '',
        eTime: ''
      },
      // 选中流程节点信息
      activityInfo: [],
      allInfo: [],
      // 是否显示流程节点信息
      isShowInfo: false,
      isShowAllInfo: false,
      isShowCurInfo: true,
      // 弹出框位置X坐标
      top: 0,
      // 弹出框位置Y坐标
      left: 0,
      // 设置是否在图表绑定数据修改后重新绘制流程图
      isDrawDiagram: true,
      domId: 'diagram'
    };
  },
  computed: {
    lastActivity() {
      return _.last(this.activityInfo);
    }
  },
  mounted() {
    this.domId = uuid.v1();
  },
  methods: {
    // 初始化流程图表
    initDiagram() {
      // 设置案卷当前流转节点流程信息
      if (
        _.find(this.diagramLayout.activities, item => {
          return item.properties.currentActiviti == true;
        }) == undefined
      ) {
        this.isShowCurInfo = false;
      } else {
        this.isShowCurInfo = true;
        this.curInfo = _.find(
          _.find(this.diagramLayout.activities, item => {
            return item.properties.currentActiviti == true;
          }).properties.activityInfo,
          item => {
            return item.currentActiviti == true;
          }
        );
      }

      // 清空图表，重新渲染流程图
      let eleDiagram = document.getElementById(this.domId);
      eleDiagram.innerHTML = '';

      DiagramApi.init(
        this.domId,
        this.diagramLayout,
        this.showActivityInfo,
        this.hideActivityInfo,
        this.showAllInfo
      );
    },
    // 显示流程信息
    showActivityInfo(info, event) {
      if (info) {
        this.activityInfo = info;
      }

      // 设置信息框显示的位置
      let pageHeight = utilsOper.getStyleValue(this.$el, 'height');
      let pageWidth = utilsOper.getStyleValue(this.$el, 'width');

      if (event.offsetY + 250 > pageHeight) {
        this.top = event.offsetY - 150 - 50;
      } else {
        this.top = event.offsetY + 50;
      }

      if (event.offsetX + 400 > pageWidth) {
        this.left = event.offsetX - 400 - 20;
      } else {
        this.left = event.offsetX + 60;
      }

      this.isShowInfo = true;

      if (this.activityInfo != this.allInfo) {
        this.isShowAllInfo = false;
      }
    },
    showAllInfo(info, event) {
      if (info && info.length > 1) {
        this.allInfo = info;
        this.isShowAllInfo = true;
      }
    },
    // 隐藏流程信息
    hideActivityInfo() {
      this.isShowInfo = false;
    },
    // 导出流程图为图片
    handleExport() {
      saveSvgAsPng(
        this.$el.querySelector('.diagram-dom').querySelector('svg'),
        '流程图.png',
        {
          backgroundColor: '#fff',
          scale: 1,
          encoderOptions: 1
        }
      );
    }
  },
  watch: {
    // 流程数据变化时更新流程图表
    diagramLayout(nValue, oValue) {
      if (nValue && this.isDrawDiagram == true) {
        this.initDiagram();
      }

      this.isDrawDiagram = true;
    }
  }
};
</script>

<style>
.diagram-wrap,
.diagram-dom svg {
  width: 100%;
  height: 100%;
  min-height: 350px;
}

.diagram-dom {
  width: calc(100% - 300px);
  display: inline-block;
}

.diagram-info {
  position: absolute;
  width: 500px;
  background-color: #ffffff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.diagram-cur-info {
  width: 340px;
  position: absolute;
  margin-top: 40px;
  right: 10px;
  display: inline-block;
  margin-right: 20px;
}

.diagram-all-info {
  width: 340px;
  position: absolute !important;
  margin-top: 320px;
  right: 10px;
  display: inline-block;
  margin-right: 20px;
}

.diagram-all-info.not-cur-info {
  margin-top: 50px;
}

.dlg-matter-diagram .diagram-all-info {
  height: calc(100% - 410px);
}

.diagram-activity-info {
  margin-bottom: 5px;
}

.diagram-all-title {
  border-bottom: 0 !important;
}

.diagram-legend {
  width: 340px;
  position: absolute;
  right: 10px;
  display: inline-block;
  line-height: 30px;
  margin-bottom: 5px;
  margin-right: 20px;
}

.diagram-legend-color {
  width: 30px;
  height: 30px;
  display: inline-block;
  margin: 0 5px;
  vertical-align: middle;
  border: solid 1px #b8c5ce;
}
</style>