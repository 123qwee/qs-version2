<template>
   <div class="matter-info-wrap row-border">
     <el-row type="flex" justify="space-around">
      <el-col class="column-title" :span="3">流转步骤</el-col>
      <el-col :span="9">{{processInfo.name}}</el-col>
      <el-col class="column-title" :span="3">处理人</el-col>
      <el-col :span="9">{{processInfo.dealUserName}}</el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col class="column-title" :span="3">所属部门</el-col>
      <el-col :span="9">{{processInfo.dealDeptName}}</el-col>
      <el-col class="column-title" :span="3">所属角色</el-col>
      <el-col :span="9">{{processInfo.dealRoleName}}</el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col class="column-title" :span="3">开始时间</el-col>
      <el-col :span="9">{{processInfo.startTime}}</el-col>
      <el-col class="column-title" :span="3">结束时间</el-col>
      <el-col :span="9">{{processInfo.endTime}}</el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col class="column-title" :span="3">处理意见</el-col>
      <el-col :span="21">{{processInfo.dealContent}}</el-col>
    </el-row>
    <el-row  v-if="processInfo.mediaList.length>0" type="flex" justify="space-around">
      <el-col class="column-title" :span="3">附件信息</el-col>
      <el-col :span="21">
        <div v-for="(item,index) in processInfo.mediaList" :key="index" @click="handleMediaPreview(item)" class="media-object-wrap">
          <img v-if="isImage(item)" :src="fileUrls[index]" alt="">
          <div v-if="isVideo(item)" class="cel-video">
            <span class="col-video-play" :style="backgroundDiv"></span>
            <img class="col-object" :src="imgPlayBack">
          </div>
        </div>
      </el-col>
    </el-row>
   </div>
</template>

<script>
export default {
  props: {
    processInfo: {
      type: Object,
      default: {
        dealDeptName: "", // 处理部门
        dealUserName: "", // 处理人
        startTime: "", // 流转时间
        endTime: "", // 处理时间
        mediaList: []
      }
    }
  },
  data() {
    return {
      imgPlayBack: require("../../assets/images/gallery/backplay.jpg"),
      backgroundDiv: {
        backgroundImage:
          "url(" + require("../../assets/images/gallery/play.png") + ")",
        backgroundSize: "32px"
      }
    };
  },
  computed: {
    fileUrls() {
      return _.map(this.processInfo.mediaList, (item, index) => {
        return constants.READ_FILE_URL + "/" + item;
      });
    }
  },
  methods: {
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
      let fileIndex = _.indexOf(this.processInfo.mediaList, url);

      this.$root.$children[0].$refs["vGallery"].fileUrls = this.fileUrls;
      this.$root.$children[0].$refs["vGallery"].index = fileIndex;
      this.$root.$children[0].$refs["vGallery"].visible = true;
    }
  }
};
</script>

<style>
.matter-info-wrap {
  width: 100%;
  height: 100%;
}
</style>
