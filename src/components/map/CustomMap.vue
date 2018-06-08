<template>
  <div id="mapWrap">
    <vMap ref="map" :layers="olconfig" maps="customMap"></vMap>
    <div class="map-toolbar-wrap" :style="{width:width+'px',top:top+'px'}">
      <div class="map-dropdown">
        <el-popover v-model="mapGrid" visible-arrow="false" placement="bottom" trigger="click">
          <span slot="reference" class="map-dropdown-btn">
            <img :src="imgGrid" alt="网格">
            <span>网格</span>
          </span>
          <ul class="uk-nav uk-nav-dropdown">
            <li class="popover-item">
              <el-checkbox name="基础图层-网格" v-model="isVisibleUnit">一级网格</el-checkbox>
            </li>
            <li class="popover-item">
              <el-checkbox name="基础图层-社区" v-model="isVisibleCommunity">二级网格</el-checkbox>
            </li>
            <li class="popover-item">
              <el-checkbox name="基础图层-街道办" v-model="isVisibleStreet">三级网格</el-checkbox>
            </li>
            <!-- <li class="popover-item">
              <el-checkbox name="基础图层-区界" v-model="isVisibleRegion">区界</el-checkbox>
            </li> -->
          </ul>
        </el-popover>
      </div>
      <div class="map-tools">
        <el-popover v-model="mapTool" visible-arrow="false" placement="bottom" trigger="click">
          <span slot="reference" class="map-tools-btn">
            <img :src="imgTool" alt="工具"> 工具
          </span>
          <ul class="uk-nav uk-nav-dropdown">
            <li class="popover-item" @click="handlePan" @mouseover="handleToolOver('isPanHover')" @mouseout="handleToolOut('isPanHover')">
              <img :src="isPanHover?imgPanHover:imgPan" alt="">
              <span>平移</span>
            </li>
            <li class="popover-item" @click="handleClear" @mouseover="handleToolOver('isClearHover')" @mouseout="handleToolOut('isClearHover')">
              <img :src="isClearHover?imgClearHover:imgClear" alt="">
              <span>清除</span>
            </li>
            <li class="popover-item" @click="handleZoomIn" @mouseover="handleToolOver('isZoomInHover')" @mouseout="handleToolOut('isZoomInHover')">
              <img :src="isZoomInHover?imgZoomInHover:imgZoomIn" alt="">
              <span>放大</span>
            </li>
            <li class="popover-item" @click="handleZoomOut" @mouseover="handleToolOver('isZoomOutHover')" @mouseout="handleToolOut('isZoomOutHover')">
              <img :src="isZoomOutHover?imgZoomOutHover:imgZoomOut" alt="">
              <span>缩小</span>
            </li>
            <li class="popover-item" @click="handleFullExtent" @mouseover="handleToolOver('isFullHover')" @mouseout="handleToolOut('isFullHover')">
              <img :src="isFullHover?imgFullHover:imgFull" alt="">
              <span>全图</span>
            </li>
            <li class="popover-item" @click="handleMeasureLength" @mouseover="handleToolOver('isLengthHover')" @mouseout="handleToolOut('isLengthHover')">
              <img :src="isLengthHover?imgLengthHover:imgLength" alt="">
              <span>测距</span>
            </li>
            <li class="popover-item" @click="handleMeasureArea" @mouseover="handleToolOver('isAreaHover')" @mouseout="handleToolOut('isAreaHover')">
              <img :src="isAreaHover?imgAreaHover:imgArea" alt="">
              <span>测面积</span>
            </li>
          </ul>
        </el-popover>
      </div>
    </div>
    <div class="map-switch-wrap">
      <div class="map-oper map-oper-full" @click="handleFullExtent" :style="{left:(width - 40)+'px'}" title="全图">
        <img :src="imgOperFull" alt="">
      </div>
      <div class="map-oper map-oper-zoomin" @click="handleZoomIn" :style="{left:(width - 40)+'px'}" title="放大">
        <img :src="imgOperZoomIn" alt="">
      </div>
      <div class="map-oper map-oper-zoomout" @click="handleZoomOut" :style="{left:(width - 40)+'px'}" title="缩小">
        <img :src="imgOperZoomOut" alt="">
      </div>
      <div class="map-type">

      </div>
    </div>
    <div v-if="isShowDraw" class="map-draw-wrap">
      <div class="map-draw map-draw-polygon" title="绘制多边形" @click="handelDraw('Polygon')" :style="{left:left+'px',top:'60px'}">
        <img :src="imgOperFull" alt="">
      </div>
      <div class="map-draw map-draw-circle" title="绘制圆形" @click="handelDraw('Circle')" :style="{left:left+'px',top:'60px'}">
        <img :src="imgOperFull" alt="">
      </div>
      <div class="map-draw map-draw-rectangle" title="绘制矩形" @click="handelDraw('Rectangle')" :style="{left:left+'px',top:'60px'}">
        <img :src="imgOperFull" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import vMap from "./MapComponent.vue";

import { CONFIG as olconfig } from "./config/olconfig.js";

import elementResizeEvent from "element-resize-event";

export default {
  components: {
    vMap
  },
  props: {
    top: {
      type: String,
      default: "0"
    },
    showUnit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      width: 450,
      olconfig: olconfig,
      mapTool: false,
      mapApi: null,
      /** 地图工具栏图标 */
      imgTool: require("./images/content_forms_tools.png"),
      // 平移图标
      isPanHover: false,
      imgPan: require("./images/map_tool_pan_default.png"),
      imgPanHover: require("./images/map_tool_pan_choose.png"),
      // 放大图标
      isZoomInHover: false,
      imgZoomIn: require("./images/map_tool_zoomin_default.png"),
      imgZoomInHover: require("./images/map_tool_zoomin_choose.png"),
      // 缩小图标
      isZoomOutHover: false,
      imgZoomOut: require("./images/map_tool_zoomout_default.png"),
      imgZoomOutHover: require("./images/map_tool_zoomout_choose.png"),
      // 全图图标
      isFullHover: false,
      imgFull: require("./images/map_tool_full_default.png"),
      imgFullHover: require("./images/map_tool_full_choose.png"),
      // 测距图标
      isLengthHover: false,
      imgLength: require("./images/map_tool_ranging_default.png"),
      imgLengthHover: require("./images/map_tool_ranging_choose.png"),
      // 测面积图标
      isAreaHover: false,
      imgArea: require("./images/map_tool_area_default.png"),
      imgAreaHover: require("./images/map_tool_area_choose.png"),
      // 清除图标
      isClearHover: false,
      imgClear: require("./images/map_tool_area_default.png"),
      imgClearHover: require("./images/map_tool_area_choose.png"),
      mapGrid: false,
      imgGrid: require("./images/content_map_case_grid.png"),
      mapComponent: false,
      imgComponent: require("./images/content_map_case_near.png"),
      imgOperZoomIn: require("./images/content_map_zoomin.png"),
      imgOperZoomOut: require("./images/content_map_zoomout.png"),
      imgOperFull: require("./images/content_map_full.png"),
      // 是否绘图工具可用
      isShowDraw: false,
      // 单元网格图层是否可见
      layerConfig: null,
      isVisibleUnit: false,
      isVisibleCommunity: false,
      isVisibleStreet: false,
      isVisibleRegion: false,
      // 判断当前地图是否处于绘图工具操作状态
      isMapDrawing: false
    };
  },
  mounted() {
    let that = this;
    // this.mapApi = this.$refs["map"].mapApi;

    // 设置工具栏宽度
    this.width = utilsOper.getStyleValue(this.$el, "width");
    elementResizeEvent(this.$el, function() {
      that.width = utilsOper.getStyleValue(that.$el, "width");
    });

    this.$bus.$on("triMapDrawing", value => {
      that.isMapDrawing = value;
    });

    this.layerConfig = _.cloneDeep(this.olconfig.Layers);
    // 设置默认网格图层可见
    this.isVisibleUnit = true;
  },
  methods: {
    // 平移
    handlePan() {
      this.isMapDrawing = false;
      // this.$refs["map"].mapApi.setStateToPan();
      this.mapTool = false;
    },
    // 清楚
    handleClear() {
      this.isMapDrawing = false;
      window.customMap.meature.deactiveMeasure();
      this.mapTool = false;
    },
    // 全图
    handleFullExtent() {
      window.customMap.operation.ol.view.animate({
        center: [112.18, 35.69],
        zoom: 14,
        duration: 1000
      });
      this.mapTool = false;
    },
    // 放大一级
    handleZoomIn() {
      window.customMap.operation.zoomIn();
      this.mapTool = false;
    },
    // 缩小一级
    handleZoomOut() {
      window.customMap.operation.zoomOut();
      this.mapTool = false;
    },
    // 测距
    handleMeasureLength() {
      this.isMapDrawing = true;
      window.customMap.meature.activeMeasureLength();
      this.mapTool = false;
    },
    // 侧面积
    handleMeasureArea() {
      this.isMapDrawing = true;
      window.customMap.meature.activeMeasureArea();
      this.mapTool = false;
    },
    // 鼠标移入工具高亮
    handleToolOver(name) {
      this[name] = true;
    },
    // 鼠标移出工具取消高亮
    handleToolOut(name) {
      this[name] = false;
    },
    // 激活绘图工具
    handelDraw(type) {
      this.isMapDrawing = true;
      this.$refs["map"].mapApi.deactiveDraw();
      this.$refs["map"].mapApi.activeDraw({
        type,
        endFunc: geo => {}
      });
    }
  },
  watch: {
    // 监听网格图层可见性变化
    isVisibleUnit(nValue, oValue) {
      this.layerConfig.grid1.show = nValue;

      window.customMap.operation.setLayersVisible(
        _.cloneDeep(this.layerConfig)
      );
    },
    // 监听社区图层可见性变化
    isVisibleCommunity(nValue, oValue) {
      this.layerConfig.grid2.show = nValue;

      window.customMap.operation.setLayersVisible(
        _.cloneDeep(this.layerConfig)
      );
    },
    // 监听街道办图层可见性变化
    isVisibleStreet(nValue, oValue) {
      this.layerConfig.grid3.show = nValue;

      window.customMap.operation.setLayersVisible(
        _.cloneDeep(this.layerConfig)
      );
    },
    // 监听道路名办图层可见性变化
    isVisibleStreetName(nValue, oValue) {
      this.layerConfig.street.show = nValue;

      window.customMap.operation.setLayersVisible(
        _.cloneDeep(this.layerConfig)
      );
    },
    // 监听区界图层可见性变化
    isVisibleRegion(nValue, oValue) {
      // this.$refs["map"].map.setLayerVisibility("基础图层-区界", nValue);
    }
  }
};
</script>

<style scoped>
@import url("./styles/custom_map.css");
</style>
