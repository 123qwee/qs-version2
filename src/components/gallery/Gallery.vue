<template>
  <el-dialog custom-class="dialog-gallery" :title="title" :visible.sync="visible" fullscreen @close="handleClose">
    <el-carousel :autoplay="false" @change="handleChangeCard" :initial-index="index" indicator-position="outside" :height="height">
      <el-carousel-item v-for="(item,index) in fileUrls" :key="index">
        <div class="carousel-img-wrap" :style="{lineHeight:height}">
          <img v-if="isImage(item)" :src="item" alt="">
          <!-- <video :id="'video'+index" v-show="isPlay" controls="controls" preload="none" class="cel-video-object lg-html5">
            <source :src="item" type="video/mp4"> 你的浏览器不支持HTML5视频。
          </video> -->
          <div :id="'video'+index" class="video-wrap" v-show="isPlay">
            <video tabindex="-1"></video>
          </div>
          <div v-if="isVideo(item)" class="cel-video">
            <span @click="handlePlay(item,index)" class="cel-video-play" :style="backgroundDiv"></span>
            <img class="cel-object" :src="imgPlayBack">
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </el-dialog>
</template>

<script>
import Chimee from "chimee";
import ChimeePluginControlbar from "chimee-plugin-controlbar";
import ChimeePluginCenterState from "chimee-plugin-center-state";

export default {
  data() {
    return {
      height: 0, // 当前走马灯组件默认高度
      title: "", // 当前弹出组件标题
      visible: false, // 当前弹出组件是否可见
      fileUrls: [], // 当前走马灯加载附件路径列表
      index: 0, // 当前走马灯组件默认展示索引页
      // 视频及音频文件背景图
      imgPlayBack: require("../../assets/images/gallery/backplay.jpg"),
      // 播放图片
      backgroundDiv: {
        backgroundImage:
          "url(" + require("../../assets/images/gallery/play.png") + ")"
      },
      isPlay: false
    };
  },
  mounted() {
    // 响应页面大小修改后，修改图片显示高度
    this.$bus.$on("triScreenResize", value => {
      this.height = document.body.clientHeight - 110 + "px";
    });

    // 计算图片展示高度
    this.height = document.body.clientHeight - 110 + "px";

    // 安装插件
    Chimee.install(ChimeePluginControlbar);
    Chimee.install(ChimeePluginCenterState);
  },
  methods: {
    handleChangeCard() {
      this.isPlay = false;
    },
    // 文件类型是否为图片
    isImage(url) {
      return utilsOper.isImageType(url);
    },
    // 文件类型是否为视频和音频
    isVideo(url) {
      if (this.isPlay == true) {
        return false;
      }

      return utilsOper.isVideoType(url) || utilsOper.isAudioType(url);
    },
    // 播放视频和音频
    handlePlay(url, index) {
      this.isPlay = true;
      // this.$el.querySelector("#video" + index).play();
      this.$nextTick(function() {
        const chimee = new Chimee({
          wrapper: "#video" + index,
          src: url,
          controls: true,
          autoplay: true,
          // 使用插件
          plugin: [ChimeePluginControlbar.name, ChimeePluginCenterState.name]
        });
      });
    },
    // 关闭弹出框，清空文件列表
    handleClose() {
      this.fileUrls = [];
      this.isPlay = false;
    }
  }
};
</script>

<style>
.dialog-gallery {
  background-color: rgba(0, 0, 0, 0.8);
  overflow: hidden !important;
}
.carousel-img-wrap {
  height: 100%;
  text-align: center;
  cursor: pointer;
}

.cel-video {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.cel-video-play {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1080;
  cursor: pointer;

  height: 64px;
  width: 64px;
  margin-left: -32px;
  margin-top: -32px;
}

.cel-video-object {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-wrap {
  height: 100%;
}
</style>