<template>
  <div class="reply-info-wrap row-border">
    <h5 v-if="replyInfos.length>0" class="reply-title">回复信息</h5>
    <div class="reply-info" v-for="(item,index) in replyInfos" :key="index">
      <el-row type="flex" justify="space-around">
        <el-col class="column-title" :span="4">回复人</el-col>
        <el-col :span="8">{{item.replyUserName}}</el-col>
        <el-col class="column-title" :span="4">回复时间</el-col>
        <el-col :span="8">{{item.replyTime}}</el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col class="column-title" :span="4">回复内容
        </el-col>
        <el-col :span="20">{{item.replyContent}}</el-col>
      </el-row>
      <el-row v-if="getMediaList(item.medias).length>0" type="flex" justify="space-around">
        <el-col class="column-title" :span="4">附件信息</el-col>
        <el-col :span="20">
          <div v-for="(subitem,index) in getMediaList(item.medias)" :key="index" @click="handleMediaPreview(item)" class="media-object-wrap">
            <img v-if="subitem && isImage(subitem)" :src="getFileUrl[subitem]" alt="">
            <div v-if="subitem && isVideo(subitem)" class="cel-video">
              <span class="col-video-play" :style="backgroundDiv"></span>
              <img class="col-object" :src="imgPlayBack">
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import service from "./service/matter_service.js";

export default {
  props: {
    pressId: {
      type: String,
      default: ""
    },
    // 设置回复信息显示类型【PressMe--只能看到自己的回复、All--所有的回复都可以看到】
    replyType: {
      type: String,
      String: "All"
    }
  },
  mounted() {},
  data() {
    return {
      replyInfos: [],
      imgPlayBack: require("../../assets/images/gallery/backplay.jpg"),
      backgroundDiv: {
        backgroundImage:
          "url(" + require("../../assets/images/gallery/play.png") + ")",
        backgroundSize: "32px"
      }
    };
  },
  mounted() {
    this.getPressReplyInfo();

    // 响应刷新督办信息
    this.$bus.$on("triRefleshPress", () => {
      this.getPressReplyInfo();
    });
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
    getMediaList(medias) {
      return _.compact(medias.split(","));
    },
    getFileUrl(url) {
      return constants.READ_FILE_URL + "/" + url;
    },
    // 显示案卷附件详情
    handleMediaPreview(url) {
      // 当前选中文件索引
      let fileIndex = _.indexOf(this.item.medias, url);

      this.$root.$children[0].$refs["vGallery"].fileUrls = this.fileUrls;
      this.$root.$children[0].$refs["vGallery"].index = fileIndex;
      this.$root.$children[0].$refs["vGallery"].visible = true;
    },
    // 获取案件督办回复信息
    getPressReplyInfo() {
      let that = this;
      service.getPressReplyInfo({
        pressId: this.pressId,
        successFunc: data => {
          that.replyInfos = data;
          // 过滤非当前登录用户的回复
          if (that.replyType == "PressMe") {
            that.replyInfos = _.filter(data, item => {
              return item.replyUserId == lscache.get("userId");
            });
          }
        }
      });
    }
  },
  watch: {
    pressId: function(nValue, oValue) {
      if (nValue) {
        this.getPressReplyInfo();
      }
    }
  }
};
</script>

<style>
.reply-info-wrap {
  width: 100%;
  height: 100%;

  padding-left: 20px;
  padding-right: 20px;
}

.reply-info {
  width: calc(100% - 40px);
  margin-bottom: 5px;
}

.reply-title {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>