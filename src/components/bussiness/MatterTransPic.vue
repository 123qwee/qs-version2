<template>
    <div class="pic_all_result" style="height:100%;width:100%">
        <div class="pic_result">
            <div class="uk-text-center" style="font-size:25px">
                案件处置前
            </div>
            <div class="pic-show-center">
                <div v-if="caseInfoPic.length==0" class="child_pic">
                    <img :src="NON_URL" style="max-height:100%;" >
                </div>
                <div v-for="(pic,num) in caseInfoPic" :key="num" @click="handleMediaPic(pic)" class="child_pic">
                    <img v-if="isImage(pic)" :src="filePic[num]" alt="" style="max-height:100%">
                    <div v-if="isVideo(pic)" style="max-height:100%" >
                        <span class="col-video-show" :style="backgroundDiv"></span>
                        <img :src="imgPlayBack">
                    </div>
                </div>
            </div>
        </div>
        <div class="pic_result">
            <div class="uk-text-center" style="font-size:25px">
                案件处置后
            </div>
            <div class="pic-show-center">
                <div v-if="transInfoPic.length==0" class="child_pic">
                    <img :src="NON_URL" style="max-height:100%">
                </div>
                <div v-for="(pic,num) in transInfoPic" :key="num" @click="handleMediaPreview(pic)" class="child_pic">
                    <img v-if="isImage(pic)" :src="fileTrans[num]" alt="" style="max-height:100%">
                    <div v-if="isVideo(pic)" style="max-height:100%">
                        <span  class="col-video-show" :style="backgroundDiv"></span>
                        <img :src="imgPlayBack">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import service from "./service/matter_service.js";
export default {
  components: {},
  props: {
    // 案卷编号
    taskNum: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      // 存储流程信息
      transInfo: [],
      //案卷图片
      caseInfoPic: [],
      //处置图片
      transInfoPic: [],
      //存储图片信息
      mediaList: [],
      imgPlayBack: require("../../assets/images/gallery/backplay.jpg"),
      backgroundDiv: {
        backgroundImage:
          "url(" + require("../../assets/images/gallery/play.png") + ")",
        backgroundSize: "32px"
      },
      //图片不存在
      NON_URL: require("../../assets/images/gallery/non_pic.png")
    };
  },
  mounted() {
    // 获取流程信息
    if (this.taskNum) {
      this.getTransInfo(this.taskNum);
    }
  },
  computed: {
    filePic() {
      return _.map(this.caseInfoPic, (item, index) => {
        return constants.READ_FILE_URL + "/" + item;
      });
    },
    fileTrans() {
      return _.map(this.transInfoPic, (item, index) => {
        return constants.READ_FILE_URL + "/" + item;
      });
    },
    fileUrls() {
      return _.map(this.mediaList, (item, index) => {
        return constants.READ_FILE_URL + "/" + item;
      });
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
          that.caseInfoPic = data[0].mediaList.slice(0, 3);
          that.mediaList = _.map(data, info => {
            return info.mediaList;
          });
          let endPic = [];
          _.map(that.mediaList, picList => {
            if (picList.length > 0) {
              endPic.push(picList);
            }
          });
          if (endPic.length > 1) {
            that.transInfoPic = endPic[endPic.length - 1].slice(0,3);
          } else {
            that.transInfoPic = [];
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
      let fileIndex = _.indexOf(this.transInfoPic, url);
      this.$root.$children[0].$refs["vGallery"].fileUrls = this.fileTrans;
      this.$root.$children[0].$refs["vGallery"].index = fileIndex;
      this.$root.$children[0].$refs["vGallery"].visible = true;
    },
    // 显示案卷附件详情
    handleMediaPic(url) {
      // 当前选中文件索引
      let fileIndex = _.indexOf(this.caseInfoPic, url);
      this.$root.$children[0].$refs["vGallery"].fileUrls = this.filePic;
      this.$root.$children[0].$refs["vGallery"].index = fileIndex;
      this.$root.$children[0].$refs["vGallery"].visible = true;
    }
  },
  watch: {
    // 监听案卷编号变化
    taskNum: function(nValue, oValue) {
      if (nValue != "") {
        this.getTransInfo(nValue);
      }
    }
  }
};
</script>

<style>
.pic-show-center {
  height: 85%;
  width: 100%;
}
.child_pic {
  width: 30%;
  height: 100%;
  padding: 10px;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
}
.pic_result {
  height: 50%;
  padding-left: 20px;
  margin: auto 20px;
}
.col-video-show {
  position: absolute;
  z-index: 1080;
  cursor: pointer;
  height: 32px;
  width: 32px;
  margin-left: 95px;
  margin-top: 80px;
}
</style>
