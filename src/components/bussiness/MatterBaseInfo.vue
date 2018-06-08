<template>
  <div class="matter-baseinfo-wrap row-border">
    <el-row type="flex" justify="space-around">
      <el-col class="column-title" :span="3">事件名称</el-col>
      <el-col :span="5">{{matterInfo.matterName}}</el-col>
      <el-col class="column-title" :span="3">事件规模</el-col>
      <el-col :span="5">{{matterLevel}}</el-col>
      <el-col class="column-title" :span="3">发生时间</el-col>
      <el-col :span="5">{{matterInfo.happendTime}}</el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col class="column-title" :span="3">案卷描述</el-col>
      <el-col :span="21">{{matterInfo.matterDesc}}</el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col class="column-title" :span="3">地址描述</el-col>
      <el-col :span="21">{{matterInfo.addressDesc}}</el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col class="column-title" :span="3">涉及人数</el-col>
      <el-col :span="9">{{matterInfo.expand1}}</el-col>
      <el-col class="column-title" :span="3">涉及单位</el-col>
      <el-col :span="9">{{matterInfo.expand2}}</el-col>
    </el-row>
    <el-row>
      <el-col class="column-title" :span="3">事件来源</el-col>
      <el-col :span="9">{{matterInfo.sourceName}}</el-col>
      <el-col class="column-title" :span="3">事件类别</el-col>
      <el-col :span="9">{{"【"+matterInfo.classFirstName+ "】--【"+ matterInfo.classSecondName+"】"}}</el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col class="column-title" :span="3">上报人</el-col>
      <el-col :span="3">{{reportName}}</el-col>
      <el-col class="column-title" :span="3">上报时间</el-col>
      <el-col :span="5">{{matterInfo.reportTime}}</el-col>
      <el-col class="column-title" :span="3">联系电话</el-col>
      <el-col :span="7">{{matterInfo.reportPhone}}</el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col class="column-title" :span="3">所在区域</el-col>
      <el-col :span="21">{{reportRegion}}</el-col>
    </el-row>
    <el-row  v-if="mediaList.length>0" type="flex" justify="space-around">
      <el-col class="column-title" :span="3">附件信息</el-col>
      <el-col :span="21">
        <div v-for="(item,index) in mediaList" :key="index" @click="handleMediaPreview(item)" class="media-object-wrap">
          <img v-if="isImage(item)" :src="fileUrls[index]" alt="">
          <div v-if="isVideo(item)" class="cel-video">
            <span class="col-video-play" :style="backgroundDiv"></span>
            <img class="col-object" :src="imgPlayBack">
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="matterSource=='公众上报'" type="flex" justify="space-around">
      <el-col class="column-title" :span="3">举报人</el-col>
      <el-col :span="9">{{matterInfo.informantPeople}}</el-col>
      <el-col class="column-title" :span="3">联系方式</el-col>
      <el-col :span="9">{{matterInfo.informantPhone}}</el-col>
    </el-row>
    <el-row v-if="matterSource=='公众上报'" type="flex" justify="space-around">
      <el-col class="column-title" :span="3">联系地址</el-col>
      <el-col :span="21">{{matterInfo.informantAddress}}</el-col>
    </el-row>
  </div>
</template>

<script>
import service from "./service/matter_service.js";

export default {
  data() {
    return {
      matterInfo: {}, // 案卷详情
      imgPlayBack: require("../../assets/images/gallery/backplay.jpg"),
      backgroundDiv: {
        backgroundImage:
          "url(" + require("../../assets/images/gallery/play.png") + ")",
        backgroundSize: "32px"
      }
    };
  },
  props: {
    // 案卷编号
    taskNum: {
      type: String,
      default: ""
    },
    // 案卷上报附件
    mediaList: {
      type: Array,
      default: []
    }
  },
  mounted() {
    if (this.taskNum) {
      this.getCaseInfo(this.taskNum);
    }
  },
  computed: {
    // 上报人名称
    reportName: function() {
      let reportName = this.matterInfo.reportName;
      // 1---公众上报
      // if (this.matterInfo.sourceId == 1) {
      //   reportName = this.matterInfo.informantPeople;
      // }

      return reportName;
    },
    // 所在区域
    reportRegion() {
      if (this.matterInfo.unitCode) {
        return (
          "【" +
          this.matterInfo.regionName +
          "】- 【" +
          this.matterInfo.streetName +
          "】-【" +
          (this.matterInfo.tcommunityName == null
            ? "社区"
            : this.matterInfo.tcommunityName) +
          "】-【" +
          this.matterInfo.unitName +
          this.matterInfo.unitCode +
          "】"
        );
      } else {
        return "";
      }
    },
    matterLevel() {
      if (this.matterInfo.matterLevel == 1) {
        return "普通";
      } else if (this.matterInfo.matterLevel == 2) {
        return "严重";
      } else if (this.matterInfo.matterLevel == 3) {
        return "重大";
      }
    },
    matterSource() {
      if (this.matterInfo) {
        return this.matterInfo.sourceName;
      }
    },
    fileUrls() {
      return _.map(this.mediaList, (item, index) => {
        return constants.READ_FILE_URL + "/" + item;
      });
    }
  },
  methods: {
    getCaseInfo(taskNum) {
      let that = this;
      // 根据案卷编号获取案卷详情
      service.getCaseInfo({
        taskNum: taskNum,
        successFunc: data => {
          if (data) {
            that.matterInfo = data;
          }
        }
      });
    },
    // 文件类型是否为图片
    isImage(url) {
      return utilsOper.isImageType(url);
    },
    // 文件类型是否为视频和音频
    isVideo(url) {
      return utilsOper.isVideoType(url) || utilsOper.isAudioType(url);
    },
    // 显示案卷附件详情
    handleMediaPreview(url) {
      // 当前选中文件索引
      let fileIndex = _.indexOf(this.mediaList, url);

      this.$root.$children[0].$refs["vGallery"].fileUrls = this.fileUrls;
      this.$root.$children[0].$refs["vGallery"].index = fileIndex;
      this.$root.$children[0].$refs["vGallery"].visible = true;
    }
  },
  watch: {
    // 监听案卷编号变化
    taskNum: function(nValue, oValue) {
      if (nValue != "") {
        this.getCaseInfo(nValue);
      }
    }
  }
};
</script>

<style>
.matter-baseinfo-wrap {
  width: 100%;
  height: 100%;
}
</style>
