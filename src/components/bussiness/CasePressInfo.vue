<template>
   <div class="matter-info-wrap row-border">
     <el-row type="flex" justify="space-around">
      <el-col class="column-title" :span="4">流转步骤</el-col>
      <el-col :span="8">{{pressInfo.tranName}}</el-col>
      <el-col class="column-title" :span="4">督办人</el-col>
      <el-col :span="8">{{pressInfo.pressUserName}}</el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col class="column-title" :span="4">督办时间</el-col>
      <el-col :span="20">{{pressInfo.pressTime}}</el-col>
      <!-- <el-col class="column-title" :span="4">处置期限</el-col>
      <el-col :span="8">{{pressInfo.pressTimeLimit}}</el-col> -->
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col class="column-title" :span="4">督办意见</el-col>
      <el-col :span="20">{{pressInfo.pressContent}}</el-col>
      <div v-if="isExecutableReply" @click="handleMatterPressReply" class="btn-info-reply" title="回复">
        <i class="md-icon material-icons">&#xE15F;</i>
      </div>
    </el-row>
    <!-- <el-row type="flex" justify="space-around">
      <el-col class="column-title" :span="4">备注</el-col>
      <el-col :span="20">{{pressInfo.remark}}</el-col>
    </el-row> -->
    <el-row  v-if="mediaList.length>0" type="flex" justify="space-around">
      <el-col class="column-title" :span="4">附件信息</el-col>
      <el-col :span="20">
        <div v-for="(item,index) in mediaList" :key="index" @click="handleMediaPreview(item)" class="media-object-wrap">
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
    // 督办信息
    pressInfo: {
      type: Object,
      default: {
        tranName: "",
        tranType: "",
        pressUserName: "",
        pressTime: "",
        pressTimeLimit: "",
        pressContent: "",
        remark: "",
        medias: []
      }
    },
    // 案卷当前流程编号
    tranTaskNum: {
      type: String,
      default: ""
    },
    isCanReply: {
      type: Boolean,
      default: true
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
      return _.map(this.mediaList, (item, index) => {
        return constants.READ_FILE_URL + "/" + item;
      });
    },
    mediaList() {
      return _.compact(this.pressInfo.medias.split(","));
    },
    isExecutableReply() {
      if (this.isCanReply == false) {
        return false;
      } else if (this.tranTaskNum != this.pressInfo.tranTaskNum) {
        return false;
      } else {
        return true;
      }
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
      let fileIndex = _.indexOf(this.mediaList, url);

      this.$root.$children[0].$refs["vGallery"].fileUrls = this.fileUrls;
      this.$root.$children[0].$refs["vGallery"].index = fileIndex;
      this.$root.$children[0].$refs["vGallery"].visible = true;
    },
    // 督办回复
    handleMatterPressReply() {
      this.$bus.$emit("triPressReply", this.pressInfo.id);
    }
  }
};
</script>

<style>
.matter-info-wrap {
  width: 100%;
  height: 100%;
}

.btn-info-reply {
  position: absolute;
  width: 30px;
  height: 30px;
  line-height: 30px;
  right: 10px;
  top: 2px;
  background-color: #58b7ff;
  color: #fff;

  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
}

.btn-info-reply:hover {
  color: #20a0ff;
  background-color: #d3dce6;
}

.btn-info-reply i {
  font-size: 20px;
  vertical-align: middle;
}
</style>
