<template>
    <div v-bar class="matter-info-wrap">
        <div>
            <h4>案卷基本信息</h4>
            <vMatterBaseInfo style="height:220px;" ref="vMatterBaseInfo" :taskNum="taskNum" :mediaList="[]"></vMatterBaseInfo>
            <el-row type="flex" justify="space-around" style="margin:10px 0;">
                <el-col :span="12" class="uk-text-center">处置前图片</el-col>
                <el-col :span="12" class="uk-text-center">处置后图片</el-col>
            </el-row>
            <el-row type="flex" justify="space-around">
                <el-col :span="12">
                    <el-carousel :autoplay="false" :height="carHeight">
                        <el-carousel-item v-for="(item,index) in dealBeforeMedias" :key="index">
                            <div class="carousel-img-wrap csel-img-wrap" @click="handleMediaPreview('before',item)">
                                <img v-if="isImage(item)" :src="item" alt="">
                                <div v-if="isVideo(item)" class="cel-video">
                                    <span class="cel-video-play" :style="backgroundDiv"></span>
                                    <img class="cel-object" :src="imgPlayBack">
                                </div>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
                <el-col :span="12">
                    <el-carousel :autoplay="false" :height="carHeight">
                        <el-carousel-item v-for="(item,index) in dealAfterMedias" :key="index">
                            <div class="carousel-img-wrap csel-img-wrap" @click="handleMediaPreview('after',item)">
                                <img v-if="isImage(item)" :src="item" alt="">
                                <div v-if="isVideo(item)" class="cel-video">
                                    <span class="cel-video-play" :style="backgroundDiv"></span>
                                    <img class="cel-object" :src="imgPlayBack">
                                </div>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import vMatterBaseInfo from "./MatterBaseInfo.vue";

import service from "./service/matter_service.js";
export default {
  components: {
    vMatterBaseInfo
  },
  props: {
    // 案卷编号
    taskNum: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      carHeight: "300px",
      dealBeforeMedias: [], // 处置前图片
      dealAfterMedias: [], // 处置后图片
      imgPlayBack: require("../../assets/images/gallery/backplay.jpg"),
      backgroundDiv: {
        backgroundImage:
          "url(" + require("../../assets/images/gallery/play.png") + ")"
      },
      imgNo: require("../../assets/images/gallery/暂无图片.png")
    };
  },
  mounted() {
    this.getMatterTransAndMedias();
    // this.carHeight =
    //   utilsOper.getStyleValue(this.$parent.$parent.$el, "height") -
    //   72 -
    //   304 +
    //   "px";
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
    // 显示附件详情
    handleMediaPreview(type, url) {
      // 如果当前为暂无图片时，无法点击打开大图
      if (url.indexOf("base64") > 0) {
        return;
      }

      const medias =
        type == "before" ? this.dealBeforeMedias : this.dealAfterMedias;

      // 当前选中文件索引
      let fileIndex = _.indexOf(medias, url);

      this.$root.$children[0].$refs["vGallery"].fileUrls = medias;
      this.$root.$children[0].$refs["vGallery"].index = fileIndex;
      this.$root.$children[0].$refs["vGallery"].visible = true;
    },
    getMatterTransAndMedias() {
      let that = this;
      // 获取案卷流程信息和流程附件信息
      service.getMatterTransAndMedias({
        taskNum: this.taskNum,
        successFunc: data => {
          that.matterTransInfo = data;

          // 设置处置前照片
          let beforeMedias = [];
          let beforeTran = _.filter(that.matterTransInfo, item => {
            return item.tranType == 1;
          });
          if (beforeTran) {
            _.map(beforeTran, item => {
              _.map(item.mediaList, url => {
                beforeMedias.push(constants.READ_FILE_URL + "/" + url);
              });
            });
            that.dealBeforeMedias = beforeMedias;
          } else {
            that.dealBeforeMedias = [];
          }

          // 设置处置后照片
          let afterMedias = [];
          let afterTran = _.filter(that.matterTransInfo, item => {
            return item.tranType == 4;
          });

          if (afterTran) {
            _.map(afterTran, item => {
              _.map(item.mediaList, url => {
                afterMedias.push(constants.READ_FILE_URL + "/" + url);
              });
            });
            that.dealAfterMedias = afterMedias;
          } else {
            that.dealAfterMedias = [];
          }
        }
      });
    }
  },
  watch: {
    taskNum(nValue, oValue) {
      let that = this;

      if (this.taskNum == "") {
        return;
      }

      this.getMatterTransAndMedias();
    },
    dealBeforeMedias(nValue, oValue) {
      if (nValue.length == 0) {
        this.dealBeforeMedias.push(this.imgNo);
      }
    },
    dealAfterMedias(nValue, oValue) {
      if (nValue.length == 0) {
        this.dealAfterMedias.push(this.imgNo);
      }
    }
  }
};
</script>

<style>

</style>