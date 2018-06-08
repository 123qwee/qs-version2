<template>
  <div>
    <!-- 主界面布局 -->
    <vMain ref="main" :layers="olconfig" :mapname="mapname"></vMain>
    <!-- 地图组件 -->
    <vMap ref="map" :layers="olconfig" :maps='mapname' v-on:afterinit="init"></vMap>
    <vUnitInfo v-if="visible = true"></vUnitInfo>
  </div>
</template>

<script>
import { layerRestObj } from "@/components/map/src/utils/layerRestObj";
import { CONFIG } from "./config/olconfig";
import vMap from "@/components/map/MapComponent.vue";
import vMain from "./main/main.vue";
import { EventService } from "./service/event.service";
import vUnitInfo from "@/components/map/UnitInfo.vue";
import { VistualEmit } from "./main/vistual.emit";
import elementResizeEvent from "element-resize-event";
export default {
  components: {
    vMap,
    vMain,
    vUnitInfo
  },
  data() {
    return {
      olconfig: CONFIG,
      // 设置地图加载要绑定的全局名称
      mapname: "mapol"
    };
  },

  /**
   * 完成了 data 数据的初始化，el没有
   */
  created() {
    this.eventService = new EventService();
  },

  /**
   * 组件加载完成后
   */
  mounted() {
    elementResizeEvent(this.$el, () => {
      let maps = window[this.mapname];
      if (maps) {
        maps.olcusium.updateSize();
      }
    });
  },
  methods: {
    init() {
      // 地图加载完成后，赋值到全局变量，避免vue频繁脏检测导致性能问题
      // 该方法发送地图加载完毕的状态，相应的子组件应该设置方法来接收该状态
      VistualEmit.emit("mapinit", "mapinit");
    }
  }
};
</script>
<style>
.change {
  position: absolute;
  top: 0px;
}
</style>

